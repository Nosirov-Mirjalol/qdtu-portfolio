import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { PositionService } from "@/features/position/position.service";
import type { IApiResponse } from "@/features/position/position.type";

export function useStatsPosition() {
	return useQuery<AxiosResponse<IApiResponse>>({
		queryKey: ["positions-stats"],
		queryFn: () => PositionService.getStatistik(),
	});
}
