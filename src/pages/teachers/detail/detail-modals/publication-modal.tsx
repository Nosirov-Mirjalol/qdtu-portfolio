import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { useCreateNazorat } from "@/hooks/teacher/useCreateNazorat";
import { useEditNazorat } from "@/hooks/teacher/useEditNazorat";
import { fileService } from "@/features/file/file.service";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type PublicationFormData = {
	name: string;
	description: string;
	researcherName: string;
	univerName: string;
	year: string;
	level: string;
	memberEnum: "MILLIY" | "XALQARO" | "";
	finished: "true" | "false" | "";
	pdf: File | null;
};

type PublicationModalProps = {
	userId: number;
};

export function PublicationModal({ userId }: PublicationModalProps) {
	const isOpen = useModalIsOpen();
	const editData = useModalEditData();
	const { close } = useModalActions();
	const { mutateAsync: createNazorat, isPending: isCreating } = useCreateNazorat();
	const { mutateAsync: editNazorat, isPending: isEditing } = useEditNazorat();

	const visible = isOpen && (editData?._type === "nazorat" || editData === "nazorat");
	const isEdit = visible && !!editData?.id;
	const isPending = isCreating || isEditing;

	const { register, handleSubmit, control, reset } = useForm<PublicationFormData>({
		defaultValues: {
			name: "",
			description: "",
			researcherName: "",
			univerName: "",
			year: "",
			level: "",
			memberEnum: "",
			finished: "",
			pdf: null,
		},
	});

	useEffect(() => {
		if (visible && isEdit) {
			reset({
				name: editData.name ?? "",
				description: editData.description ?? "",
				researcherName: editData.researcherName ?? "",
				univerName: editData.univerName ?? "",
				year: String(editData.year ?? ""),
				level: editData.level ?? "",
				memberEnum: editData.memberEnum ?? "",
				finished: editData.finished ? "true" : "false",
				pdf: null,
			});
		} else if (visible && !isEdit) {
			reset({ name: "", description: "", researcherName: "", univerName: "", year: "", level: "", memberEnum: "", finished: "", pdf: null });
		}
	}, [visible, isEdit, editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = async (data: PublicationFormData) => {
		let fileUrl = "";
		if (data.pdf) {
			const uploaded = await fileService.uploadPdf(data.pdf);
			fileUrl = uploaded.url;
		}

		if (isEdit) {
			await editNazorat({
				id: editData.id,
				name: data.name,
				description: data.description,
				year: Number(data.year),
				fileUrl: fileUrl || editData.fileUrl || "",
				userId,
				researcherName: data.researcherName,
				univerName: data.univerName,
				level: data.level,
				memberEnum: data.memberEnum as "MILLIY" | "XALQARO",
				finished: data.finished === "true",
			});
		} else {
			await createNazorat({
				name: data.name,
				description: data.description,
				year: Number(data.year),
				fileUrl,
				userId,
				researcherName: data.researcherName,
				univerName: data.univerName,
				level: data.level,
				memberEnum: data.memberEnum as "MILLIY" | "XALQARO",
				finished: data.finished === "true",
			});
		}

		handleClose();
	};

	return (
		<Modal open={visible} onClose={handleClose} title={isEdit ? "Nazoratni tahrirlash" : "Nazorat qo'shish"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="n-name">Nazorat nomi</Label>
					<Input id="n-name" placeholder="Nazorat nomini kiriting..." {...register("name")} />
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="n-desc">Tavsif</Label>
					<Textarea
						id="n-desc"
						placeholder="Nazorat haqida qisqacha..."
						className="min-h-[80px] resize-none"
						{...register("description")}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="n-researcher">Tadqiqotchi</Label>
						<Input id="n-researcher" placeholder="F.I.Sh..." {...register("researcherName")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="n-university">Universitet</Label>
						<Input id="n-university" placeholder="Tashkilot nomi..." {...register("univerName")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="n-year">Yil</Label>
						<Input id="n-year" type="number" placeholder="2024" {...register("year")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="n-level">Daraja</Label>
						<Input id="n-level" placeholder="Daraja..." {...register("level")} />
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
							name="finished"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="false">Jarayonda</SelectItem>
										<SelectItem value="true">Tugallangan</SelectItem>
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