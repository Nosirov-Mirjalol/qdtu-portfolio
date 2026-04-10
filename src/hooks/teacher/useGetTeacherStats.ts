import { useQuery } from "@tanstack/react-query";
import { TeacherService } from "@/features/teacher/teacher.service";
import type { TeacherStatsResponse } from "@/features/teacher/teacher.type";

export function useGetTeacherStats(userId: number | undefined) {
  return useQuery<TeacherStatsResponse>({
    queryKey: ["teacher-stats", userId],
    queryFn: () => TeacherService.getStats(userId!),
    enabled: !!userId,
  });
}
