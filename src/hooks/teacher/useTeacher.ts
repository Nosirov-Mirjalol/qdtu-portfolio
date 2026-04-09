import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { TeacherService } from "@/features/teacher/teacher.service";
import type { GetTeacherListResponse } from "@/features/teacher/teacher.type";

export function useTeacher() {
	return useQuery<AxiosResponse<GetTeacherListResponse>>({
		queryKey: ["teachers"],
		queryFn: () => TeacherService.getAll(),
	});
}
