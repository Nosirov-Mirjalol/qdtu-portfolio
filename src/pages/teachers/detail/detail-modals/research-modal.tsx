import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { useCreateResearch } from "@/hooks/teacher/useCreateResearch";
import { useEditResearch } from "@/hooks/teacher/useEditResearch";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { fileService } from "@/features/file/file.service";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type ResearchFormData = {
	name: string;
	description: string;
	year: string;
	organization: string;
	membershipType: "MILLIY" | "XALQARO" | "";
	status: "JARAYONDA" | "TUGALLANGAN" | "";
	pdf: File | null;
};

type ResearchModalProps = {
	userId: number;
};

export function ResearchModal({ userId }: ResearchModalProps) {
	const isOpen = useModalIsOpen();
	const editData = useModalEditData();
	const { close } = useModalActions();
	const { mutateAsync: createResearch, isPending: isCreating } = useCreateResearch();
	const { mutateAsync: editResearch, isPending: isEditing } = useEditResearch();

	const visible = isOpen && (editData?._type === "research" || editData === "research");
	const isEdit = visible && !!editData?.id;
	const isPending = isCreating || isEditing;

	const { register, handleSubmit, control, reset } = useForm<ResearchFormData>({
		defaultValues: {
			name: "",
			description: "",
			year: "",
			organization: "",
			membershipType: "",
			status: "",
			pdf: null,
		},
	});

	useEffect(() => {
		if (visible && isEdit) {
			reset({
				name: editData.name ?? "",
				description: editData.description ?? "",
				year: String(editData.year ?? ""),
				organization: editData.univerName ?? "",
				membershipType: editData.memberEnum ?? "",
				status: editData.finished ? "TUGALLANGAN" : "JARAYONDA",
				pdf: null,
			});
		} else if (visible && !isEdit) {
			reset({ name: "", description: "", year: "", organization: "", membershipType: "", status: "", pdf: null });
		}
	}, [visible, isEdit, editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = async (data: ResearchFormData) => {
		let fileUrl = "";
		if (data.pdf) {
			const uploaded = await fileService.uploadPdf(data.pdf);
			fileUrl = uploaded.url;
		}

		if (isEdit) {
			await editResearch({
				id: editData.id,
				name: data.name,
				description: data.description,
				year: Number(data.year),
				fileUrl: fileUrl || editData.fileUrl || "",
				userId,
				univerName: data.organization,
				member: true,
				finished: data.status === "TUGALLANGAN",
				memberEnum: data.membershipType as "MILLIY" | "XALQARO",
			});
		} else {
			await createResearch({
				name: data.name,
				description: data.description,
				year: Number(data.year),
				fileUrl,
				userId,
				organization: data.organization,
				membershipType: data.membershipType as "MILLIY" | "XALQARO",
				status: data.status as "JARAYONDA" | "TUGALLANGAN",
			});
		}

		handleClose();
	};

	return (
		<Modal open={visible} onClose={handleClose} title={isEdit ? "Tadqiqotni tahrirlash" : "Tadqiqot qo'shish"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="r-name">Tadqiqot nomi</Label>
					<Input id="r-name" placeholder="Tadqiqot nomini kiriting..." {...register("name")} />
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="r-desc">Qisqa tavsif</Label>
					<Textarea
						id="r-desc"
						placeholder="Tadqiqot haqida qisqacha..."
						className="min-h-[80px] resize-none"
						{...register("description")}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="r-year">Yil</Label>
						<Input id="r-year" type="number" placeholder="2024" {...register("year")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="r-org">Universitet / Tashkilot</Label>
						<Input id="r-org" placeholder="Tashkilot nomi..." {...register("organization")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label>A'zolik turi</Label>
						<Controller
							name="membershipType"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="MILLIY">MILLIY</SelectItem>
										<SelectItem value="XALQARO">XALQARO</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>Holati</Label>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="JARAYONDA">JARAYONDA</SelectItem>
										<SelectItem value="TUGALLANGAN">TUGALLANGAN</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<Label>
						PDF yuklash <span className="text-muted-foreground font-normal">(ixtiyoriy)</span>
					</Label>
					<Controller
						name="pdf"
						control={control}
						render={({ field }) => (
							<FileInput type="document" accept=".pdf" value={field.value} onChange={field.onChange} />
						)}
					/>
				</div>
				<div className="flex items-center justify-end gap-2 pt-1">
					<Button type="button" variant="outline" onClick={handleClose}>
						Bekor qilish
					</Button>
					<Button type="submit" disabled={isPending}>
						{isPending ? "Saqlanmoqda..." : "Saqlash"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}