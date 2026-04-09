import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { TeacherService } from "@/features/teacher/teacher.service";
import type { GetTeacherByIdResponse } from "@/features/teacher/teacher.type";

export function useTeacherId(id: number | null) {
	return useQuery<AxiosResponse<GetTeacherByIdResponse>>({
		queryKey: ["teacher", id],
		queryFn: () => TeacherService.getById(id!),
		enabled: !!id,
	});
}
