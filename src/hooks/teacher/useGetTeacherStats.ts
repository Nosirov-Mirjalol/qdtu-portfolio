import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { TeacherService } from "@/features/teacher/teacher.service";
import type { TeacherStatsResponse } from "@/features/teacher/teacher.type";

export function useGetTeacherStats(userId: number | undefined) {
	return useQuery<AxiosResponse<TeacherStatsResponse>>({
		queryKey: ["teacher-stats", userId],
		queryFn: () => TeacherService.getStats(userId!),
		enabled: !!userId,
	});
}
