import { useQuery } from "@tanstack/react-query";
import { PositionService } from "@/features/position/position.service";

export function usePosition() {
	return useQuery({
		queryKey: ["positions"],
		queryFn: () => PositionService.getAll(),
	});
}
