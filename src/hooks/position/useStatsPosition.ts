import { PositionService } from "@/features/positiion/position.service";
import { useQuery } from "@tanstack/react-query";

export function useStatsPosition() {
	return useQuery({
		queryKey: ["positions"],
		queryFn: () => PositionService.getStatistik(),
	});
}
