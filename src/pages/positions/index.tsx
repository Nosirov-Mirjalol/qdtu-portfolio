import { Briefcase, Pencil, Trash2, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { Modal } from "@/components/modal/modal";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import type { Position } from "@/features/position/position.type";
import { useCreatePosition } from "@/hooks/position/useCreatePosition";
import { useDeletePosition } from "@/hooks/position/useDeletePosition";
import { useUpdatePosition } from "@/hooks/position/useEditPosition";
import { usePosition } from "@/hooks/position/usePosition";
import { useStatsPosition } from "@/hooks/position/useStatsPosition";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

type PositionFormValues = {
	name: string;
};

type StatsItem = {
	name: string;
	totalEmployees: number;
};

type StatsData = {
	total: number;
	data: StatsItem[];
};

export default function Positions() {
	const [search, setSearch] = useState("");
	const isOpen = useModalIsOpen();
	const { close, open } = useModalActions();
	const editData = useModalEditData() as Position | null;
	const isEdit = !!editData;

	const { data: positionResponse, refetch } = usePosition();
	const { data: statsResponse } = useStatsPosition() as { data: { data: StatsData } | undefined };

	const { mutate: createPosition, isPending: isCreating } = useCreatePosition();
	const { mutate: updatePosition, isPending: isUpdating } = useUpdatePosition();
	const { mutate: deletePosition } = useDeletePosition();
	const isPending = isCreating || isUpdating;

	const stats = statsResponse?.data;
	const statsList = useMemo(() => stats?.data ?? [], [stats]);

	const totalEmployees = useMemo(
		() => statsList.reduce((sum, item) => sum + (item.totalEmployees || 0), 0),
		[statsList],
	);

	const positions: Position[] = useMemo(() => {
		const raw = positionResponse?.data ?? [];
		return raw.map((p) => ({
			...p,
			totalEmployees: statsList.find((s) => s.name === p.name)?.totalEmployees ?? 0,
		}));
	}, [positionResponse, statsList]);

	const filtered = useMemo(
		() => positions.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
		[positions, search],
	);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PositionFormValues>({
		defaultValues: { name: "" },
	});

	function handleClose() {
		reset({ name: "" });
		close();
	}

	useEffect(() => {
		if (editData) {
			reset({ name: editData.name });
		} else {
			reset({ name: "" });
		}
	}, [editData, reset]);

	const onSubmit = (values: PositionFormValues) => {
		const options = {
			onSuccess: () => {
				handleClose();
				refetch();
			},
		};

		if (isEdit && editData) {
			updatePosition({ id: editData.id, data: { name: values.name } }, options);
		} else {
			createPosition(values.name, options);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{stats && (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<Card className="overflow-hidden border-none shadow-sm">
						<CardContent className="flex items-center gap-4 px-5 py-4">
							<div className="flex items-center justify-center size-10 rounded-full bg-blue-50 dark:bg-blue-950/50">
								<Briefcase className="size-5 text-blue-600 dark:text-blue-400" />
							</div>
							<div className="flex flex-col">
								<span className="text-[12px] text-muted-foreground font-medium">Jami lavozimlar</span>
								<span className="text-[22px] font-bold leading-tight">{filtered.length}</span>
							</div>
						</CardContent>
					</Card>

					<Card className="overflow-hidden border-none shadow-sm">
						<CardContent className="flex items-center gap-4 px-5 py-4">
							<div className="flex items-center justify-center size-10 rounded-full bg-green-50 dark:bg-green-950/50">
								<Users className="size-5 text-green-600 dark:text-green-400" />
							</div>
							<div className="flex flex-col">
								<span className="text-[12px] text-muted-foreground font-medium">Jami xodimlar</span>
								<span className="text-[22px] font-bold leading-tight">{totalEmployees}</span>
							</div>
						</CardContent>
					</Card>
				</div>
			)}

			<TableToolbar
				countLabel="Lavozimlar soni"
				count={filtered.length}
				searchValue={search}
				onSearchChange={setSearch}
				onAdd={() => open()}
				addLabel="Lavozim qo'shish"
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{filtered.length ? (
					filtered.map((position) => (
						<Card key={position.id} className="group hover:border-primary/50 transition-colors shadow-sm">
							<CardContent className="flex flex-col gap-5 px-5 py-5">
								<div className="flex flex-col gap-1">
									<span className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
										{position.name}
									</span>
									<span className="text-[12px] text-muted-foreground">
										{position.totalEmployees} ta xodim biriktirilgan
									</span>
								</div>

								<div className="flex items-center gap-2">
									<Button
										variant="secondary"
										size="sm"
										onClick={() => open(position)}
										className="flex-1 h-8 text-[12px] font-semibold gap-1.5"
									>
										<Pencil className="size-3" />
										Tahrirlash
									</Button>

									<ConfirmPopover onConfirm={() => deletePosition(position.id)}>
										<Button
											variant="ghost"
											size="sm"
											className="h-8 text-[12px] font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50 gap-1.5"
										>
											<Trash2 className="size-3" />
											O'chirish
										</Button>
									</ConfirmPopover>
								</div>
							</CardContent>
						</Card>
					))
				) : (
					<div className="col-span-full flex flex-col items-center justify-center py-20 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-xl border border-dashed">
						<p className="text-muted-foreground text-[14px]">Ma'lumot topilmadi.</p>
					</div>
				)}
			</div>

			<Modal open={isOpen} onClose={handleClose} title={isEdit ? "Lavozimni tahrirlash" : "Lavozim qo'shish"}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
					<div className="space-y-2">
						<Label htmlFor="position-name" className="text-sm font-medium">
							Lavozim nomi
						</Label>
						<Input
							id="position-name"
							placeholder="Masalan: Frontend Developer"
							className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
							{...register("name", { required: "Lavozim nomi kiritilishi shart" })}
						/>
						{errors.name && <p className="text-[12px] text-red-500 font-medium">{errors.name.message}</p>}
					</div>

					<div className="flex justify-end gap-3 pt-2">
						<Button type="button" variant="ghost" onClick={handleClose} disabled={isPending}>
							Bekor qilish
						</Button>
						<Button type="submit" disabled={isPending} className="min-w-[100px]">
							{isPending ? "Yuklanmoqda..." : isEdit ? "Saqlash" : "Qo'shish"}
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}