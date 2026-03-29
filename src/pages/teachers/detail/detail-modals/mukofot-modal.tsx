import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type MukofotFormData = {
	name: string;
	description: string;
	year: string;
	organization: string;
	level: "XALQARO" | "MAHALLIY" | "";
	type: "DIPLOM" | "SERTIFIKAT" | "MEDAL" | "BOSHQA" | "";
	pdf: File | null;
};

export function MukofotModal() {
	const isOpen = useModalIsOpen();
	const editData = useModalEditData();
	const { close } = useModalActions();

	const visible = isOpen && editData?._type === "mukofot";
	const isEdit = visible && !!editData?.id;

	const { register, handleSubmit, control, reset } = useForm<MukofotFormData>({
		defaultValues: {
			name: "",
			description: "",
			year: "",
			organization: "",
			level: "",
			type: "",
			pdf: null,
		},
	});

	useEffect(() => {
		if (visible && isEdit) {
			reset({
				name: editData.name ?? "",
				description: editData.description ?? "",
				year: editData.year ?? "",
				organization: editData.organization ?? "",
				level: editData.level ?? "",
				type: editData.type ?? "",
				pdf: null,
			});
		} else if (visible && !isEdit) {
			reset({
				name: "",
				description: "",
				year: "",
				organization: "",
				level: "",
				type: "",
				pdf: null,
			});
		}
	}, [visible, isEdit, editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = (_data: MukofotFormData) => {
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
						<Label htmlFor="mukofot-org">Tashkilot</Label>
						<Input id="mukofot-org" placeholder="Tashkilot nomi..." {...register("organization")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label>Daraja</Label>
						<Controller
							name="level"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="XALQARO">Xalqaro</SelectItem>
										<SelectItem value="MAHALLIY">Mahalliy</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>Mukofot turi</Label>
						<Controller
							name="type"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="DIPLOM">Diplom</SelectItem>
										<SelectItem value="SERTIFIKAT">Sertifikat</SelectItem>
										<SelectItem value="MEDAL">Medal</SelectItem>
										<SelectItem value="BOSHQA">Boshqa</SelectItem>
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
					<Button type="submit">Saqlash</Button>
				</div>
			</form>
		</Modal>
	);
}