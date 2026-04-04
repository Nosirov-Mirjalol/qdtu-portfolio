import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { useCreateMukofot } from "@/hooks/teacher/useCreateMukofot";
import { useEditMukofot } from "@/hooks/teacher/useEditMukofot";
import { fileService } from "@/features/file/file.service";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

enum MemberType {
	MILLIY = "MILLIY",
	XALQARO = "XALQARO",
}

enum AwardType {
	TRENING_VA_AMALIYOT = "Trening_Va_Amaliyot",
	TAHRIRIYAT_KENGASHIGA_AZOLIK = "Tahririyat_Kengashiga_Azolik",
	MAXSUS_KENGASH_AZOLIGI = "Maxsus_Kengash_Azoligi",
	PATENT_DGU = "Patent_Dgu",
	DAVLAT_MUKOFOTI = "Davlat_Mukofoti",
}

type MukofotFormData = {
	name: string;
	description: string;
	year: string;
	awardEnum: AwardType | "";
	memberEnum: MemberType | "";
	pdf: File | null;
};

type MukofotModalProps = {
	userId: number;
};

export function MukofotModal({ userId }: MukofotModalProps) {
	const isOpen = useModalIsOpen();
	const editData = useModalEditData();
	const { close } = useModalActions();
	const { mutateAsync: createMukofot, isPending: isCreating } = useCreateMukofot();
	const { mutateAsync: editMukofot, isPending: isEditing } = useEditMukofot();

	const visible = isOpen && editData?._type === "mukofot";
	const isEdit = visible && !!editData?.id;
	const isPending = isCreating || isEditing;

	const { register, handleSubmit, control, reset } = useForm<MukofotFormData>({
		defaultValues: {
			name: "",
			description: "",
			year: "",
			awardEnum: "",
			memberEnum: "",
			pdf: null,
		},
	});

	useEffect(() => {
		if (visible && isEdit) {
			reset({
				name: editData.name ?? "",
				description: editData.description ?? "",
				year: String(editData.year ?? ""),
				awardEnum: editData.awardEnum ?? "",
				memberEnum: editData.memberEnum ?? "",
				pdf: null,
			});
		} else if (visible && !isEdit) {
			reset({
				name: "",
				description: "",
				year: "",
				awardEnum: "",
				memberEnum: "",
				pdf: null,
			});
		}
	}, [visible, isEdit, editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = async (data: MukofotFormData) => {
		let fileUrl = "";
		if (data.pdf) {
			const uploaded = await fileService.uploadPdf(data.pdf);
			fileUrl = uploaded.url;
		}

		const payload = {
			name: data.name,
			description: data.description,
			year: Number(data.year),
			awardEnum: data.awardEnum as AwardType,
			memberEnum: data.memberEnum as MemberType,
			fileUrl: fileUrl || editData?.fileUrl || "",
			userId,
		};

		if (isEdit) {
			await editMukofot({ id: editData.id, ...payload });
		} else {
			await createMukofot(payload);
		}

		handleClose();
	};

	return (
		<Modal open={visible} onClose={handleClose} title={isEdit ? "Mukofotni tahrirlash" : "Mukofot qo'shish"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="mukofot-name">Mukofot nomi</Label>
					<Input id="mukofot-name" placeholder="Mukofot nomini kiriting..." {...register("name")} />
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="mukofot-desc">Qisqa tavsif</Label>
					<Textarea
						id="mukofot-desc"
						placeholder="Mukofot haqida qisqacha..."
						className="min-h-[80px] resize-none"
						{...register("description")}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="mukofot-year">Yil</Label>
						<Input id="mukofot-year" type="number" placeholder="2024" {...register("year")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label>A'zolik turi</Label>
						<Controller
							name="memberEnum"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={MemberType.MILLIY}>Milliy</SelectItem>
										<SelectItem value={MemberType.XALQARO}>Xalqaro</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2 col-span-2">
						<Label>Mukofot turi</Label>
						<Controller
							name="awardEnum"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={AwardType.TRENING_VA_AMALIYOT}>Trening va Amaliyot</SelectItem>
										<SelectItem value={AwardType.TAHRIRIYAT_KENGASHIGA_AZOLIK}>Tahririyat Kengashiga Azolik</SelectItem>
										<SelectItem value={AwardType.MAXSUS_KENGASH_AZOLIGI}>Maxsus Kengash Azoligi</SelectItem>
										<SelectItem value={AwardType.PATENT_DGU}>Patent DGU</SelectItem>
										<SelectItem value={AwardType.DAVLAT_MUKOFOTI}>Davlat Mukofoti</SelectItem>
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