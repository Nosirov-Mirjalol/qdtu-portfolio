import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { useCreateNashr } from "@/hooks/teacher/useCreateNashr";
import { useEditNashr } from "@/hooks/teacher/useEditNashr";
import { fileService } from "@/features/file/file.service";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type NashrFormData = {
	name: string;
	description: string;
	year: string;
	institution: string;
	type: "ARTICLE" | "BOOK" | "PROCEEDING" | "OTHERS" | "";
	author: "COAUTHOR" | "FIRST_AUTHOR" | "BOTH_AUTHOR" | "";
	degree: "NATIONAL" | "INTERNATIONAL" | "";
	volume: string;
	popular: boolean;
	pdf: File | null;
};

type NashrModalProps = {
	userId: number;
};

export function NashrModal({ userId }: NashrModalProps) {
	const isOpen = useModalIsOpen();
	const editData = useModalEditData();
	const { close } = useModalActions();
	const { mutateAsync: createNashr, isPending: isCreating } = useCreateNashr();
	const { mutateAsync: editNashr, isPending: isEditing } = useEditNashr();

	const visible = isOpen && editData?._type === "nashr";
	const isEdit = visible && !!editData?.id;
	const isPending = isCreating || isEditing;

	const { register, handleSubmit, control, reset } = useForm<NashrFormData>({
		defaultValues: {
			name: "",
			description: "",
			year: "",
			institution: "",
			type: "",
			author: "",
			degree: "",
			volume: "",
			popular: false,
			pdf: null,
		},
	});

	useEffect(() => {
		if (visible && isEdit) {
			let typeValue: NashrFormData["type"] = "";
			if (editData.type === "MAQOLA" || editData.type === "ARTICLE") typeValue = "ARTICLE";
			else if (editData.type === "KITOB" || editData.type === "BOOK") typeValue = "BOOK";
			else if (editData.type === "TADQIQOT" || editData.type === "PROCEEDING") typeValue = "PROCEEDING";
			else if (editData.type === "BOSHQA" || editData.type === "OTHERS") typeValue = "OTHERS";

			let authorValue: NashrFormData["author"] = "";
			if (editData.authorship === "HAMMUALLIF" || editData.authorship === "COAUTHOR") authorValue = "COAUTHOR";
			else if (editData.authorship === "MUALLIF" || editData.authorship === "FIRST_AUTHOR") authorValue = "FIRST_AUTHOR";
			else if (editData.authorship === "BOSHQA" || editData.authorship === "BOTH_AUTHOR") authorValue = "BOTH_AUTHOR";

			let degreeValue: NashrFormData["degree"] = "";
			if (editData.degree === "XALQARO" || editData.degree === "INTERNATIONAL") degreeValue = "INTERNATIONAL";
			else if (editData.degree === "MAHALLIY" || editData.degree === "NATIONAL") degreeValue = "NATIONAL";

			reset({
				name: editData.name ?? "",
				description: editData.description ?? "",
				year: String(editData.year ?? ""),
				institution: editData.organization ?? "",
				type: typeValue,
				author: authorValue,
				degree: degreeValue,
				volume: editData.volume ?? "",
				popular: editData.popular ?? false,
				pdf: null,
			});
		} else if (visible && !isEdit) {
			reset({
				name: "",
				description: "",
				year: "",
				institution: "",
				type: "",
				author: "",
				degree: "",
				volume: "",
				popular: false,
				pdf: null,
			});
		}
	}, [visible, isEdit, editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = async (data: NashrFormData) => {
		let fileUrl = "";
		if (data.pdf) {
			const uploaded = await fileService.uploadPdf(data.pdf);
			fileUrl = uploaded.url;
		}

		if (isEdit) {
			await editNashr({
				id: editData.id,
				name: data.name,
				description: data.description,
				year: Number(data.year),
				institution: data.institution,
				type: data.type as "ARTICLE" | "BOOK" | "PROCEEDING" | "OTHERS",
				author: data.author as "COAUTHOR" | "FIRST_AUTHOR" | "BOTH_AUTHOR",
				degree: data.degree as "NATIONAL" | "INTERNATIONAL",
				volume: data.volume,
				popular: data.popular,
				fileUrl: fileUrl || editData.fileUrl || "",
				userId,
			});
		} else {
			await createNashr({
				name: data.name,
				description: data.description,
				year: Number(data.year),
				institution: data.institution,
				type: data.type as "ARTICLE" | "BOOK" | "PROCEEDING" | "OTHERS",
				author: data.author as "COAUTHOR" | "FIRST_AUTHOR" | "BOTH_AUTHOR",
				degree: data.degree as "NATIONAL" | "INTERNATIONAL",
				volume: data.volume,
				popular: data.popular,
				fileUrl,
				userId,
			});
		}

		handleClose();
	};

	return (
		<Modal open={visible} onClose={handleClose} title={isEdit ? "Nashrni tahrirlash" : "Nashr qo'shish"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="nashr-name">Nashr nomi</Label>
					<Input id="nashr-name" placeholder="Nashr nomini kiriting..." {...register("name")} />
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="nashr-desc">Qisqa tavsif</Label>
					<Textarea
						id="nashr-desc"
						placeholder="Nashr haqida qisqacha..."
						className="min-h-[80px] resize-none"
						{...register("description")}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="nashr-year">Yil</Label>
						<Input id="nashr-year" type="number" placeholder="2024" {...register("year")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="nashr-org">Tashkilot</Label>
						<Input id="nashr-org" placeholder="Tashkilot nomi..." {...register("institution")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label>Nashr turi</Label>
						<Controller
							name="type"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ARTICLE">Maqola</SelectItem>
										<SelectItem value="BOOK">Kitob</SelectItem>
										<SelectItem value="PROCEEDING">Tadqiqot</SelectItem>
										<SelectItem value="OTHERS">Boshqa</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>Mualliflik</Label>
						<Controller
							name="author"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="FIRST_AUTHOR">Muallif</SelectItem>
										<SelectItem value="COAUTHOR">Hammuallif</SelectItem>
										<SelectItem value="BOTH_AUTHOR">Boshqa</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>Daraja</Label>
						<Controller
							name="degree"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="INTERNATIONAL">Xalqaro</SelectItem>
										<SelectItem value="NATIONAL">Mahalliy</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="nashr-volume">Volume</Label>
						<Input id="nashr-volume" placeholder="Vol. 12..." {...register("volume")} />
					</div>
					<div className="flex flex-col gap-2 col-span-2">
						<Label>Popularlik</Label>
						<Controller
							name="popular"
							control={control}
							render={({ field }) => (
								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										id="nashr-popular"
										checked={field.value}
										onChange={(e) => field.onChange(e.target.checked)}
										className="w-4 h-4 cursor-pointer"
									/>
									<Label htmlFor="nashr-popular" className="cursor-pointer">
										Popular
									</Label>
								</div>
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