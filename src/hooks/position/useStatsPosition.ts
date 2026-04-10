import { useQuery } from "@tanstack/react-query";
import { PositionService } from "@/features/position/position.service";
import type { IApiResponse } from "@/features/position/position.type";

export function useStatsPosition() {
	return useQuery<IApiResponse>({
		queryKey: ["positions-stats"],
		queryFn: () => PositionService.getStatistik(),
	});
}
