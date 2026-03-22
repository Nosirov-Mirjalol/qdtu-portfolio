import { PositionService } from "@/features/positiion/position.service";
import { useQuery } from "@tanstack/react-query";

export function useDepartment() {
	return useQuery({
		queryKey: ["positions"],
		queryFn: () => PositionService.getAll(),
	});
}
