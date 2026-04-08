import { TeacherService } from "@/features/teacher/teacher.service";
import { useQuery } from "@tanstack/react-query";

export function useTeacherId(id: number) {
	return useQuery({
		queryKey: ["teacher"],
		queryFn: () => TeacherService.getById(id),
		enabled: !!id,
	});
}
