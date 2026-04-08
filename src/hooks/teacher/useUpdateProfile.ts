import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fileService } from "@/features/file/file.service";
import { TeacherService } from "@/features/teacher/teacher.service";
import type { EditTeacherRequest } from "@/features/teacher/teacher.type";

interface EditTeacherInput {
	id: number;
	fullName: string;
	phoneNumber: string;
	email: string;
	biography: string;
	input: string;
	age: number;
	orcId: string;
	scopusId: string;
	scienceId: string;
	researcherId: string;
	gender: boolean;
	imageUri: File | null;
	fileUrl: string;
	profession: string;
	lavozmId: number;
	departmentId: number;
	password?: string;
}

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: EditTeacherInput) => {
			const imageUri = input.imageUri ? await fileService.uploadImage(input.imageUri) : "";

			const payload: EditTeacherRequest = {
				id: input.id,
				fullName: input.fullName,
				phoneNumber: input.phoneNumber,
				email: input.email,
				biography: input.biography,
				input: input.input,
				age: input.age,
				orcId: input.orcId,
				scopusId: input.scopusId,
				scienceId: input.scienceId,
				researcherId: input.researcherId,
				gender: input.gender,
				imageUri: imageUri,
				fileUrl: input.fileUrl,
				profession: input.profession,
				lavozmId: input.lavozmId,
				departmentId: input.departmentId,
				password: input.password ?? "",
			};

			return TeacherService.updateProfile(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teachers"] });
			toast.success("O'qituvchi muvaffaqiyatli tahrirlandi");
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "O'qituvchini tahrirlashda xatolik");
		},
	});
}