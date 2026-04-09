import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileService } from "@/features/file/file.service";
import { TeacherService } from "@/features/teacher/teacher.service";
import type { ProfileEditRequest, ProfileFormData } from "@/features/teacher/teacher.type";

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: ProfileFormData) => {
			const payload: ProfileEditRequest = {
				id: input.id,
			};

			// imageUri upload
			if (input.imageUri instanceof File) {
				const uploadedUrl = await fileService.uploadImage(input.imageUri);
				if (uploadedUrl) payload.imageUrl = uploadedUrl;
			}

			// fileUrl upload
			if (input.fileUrl instanceof File) {
				const uploadedUrl = await fileService.uploadPdf(input.fileUrl);
				if (uploadedUrl) payload.fileUrl = uploadedUrl;
			} else if (typeof input.fileUrl === "string" && input.fileUrl !== "") {
				payload.fileUrl = input.fileUrl;
			}

			if (input.fullName !== undefined && input.fullName !== "") payload.fullName = input.fullName;
			if (input.phoneNumber !== undefined && input.phoneNumber !== "") payload.phoneNumber = input.phoneNumber;
			if (input.email !== undefined && input.email !== "") payload.email = input.email;
			if (input.biography !== undefined && input.biography !== "") payload.biography = input.biography;
			if (input.input !== undefined && input.input !== "") payload.input = input.input;
			if (input.age !== undefined) payload.age = input.age;
			if (input.orcId !== undefined && input.orcId !== "") payload.orcId = input.orcId;
			if (input.scopusId !== undefined && input.scopusId !== "") payload.scopusId = input.scopusId;
			if (input.scienceId !== undefined && input.scienceId !== "") payload.scienceId = input.scienceId;
			if (input.researcherId !== undefined && input.researcherId !== "") payload.researcherId = input.researcherId;
			if (input.gender !== undefined) payload.gender = input.gender;
			if (input.profession !== undefined && input.profession !== "") payload.profession = input.profession;
			if (input.lavozmId !== undefined) payload.lavozmId = input.lavozmId;
			if (input.departmentId !== undefined) payload.departmentId = input.departmentId;

			return TeacherService.updateProfile(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teachers"] });
			queryClient.invalidateQueries({ queryKey: ["teacher-detail"] });
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			queryClient.invalidateQueries({ queryKey: ["teacher-completion"] });
		},
		onError: (error: any) => {
			console.error("Profile update error:", error);
		},
	});
}
