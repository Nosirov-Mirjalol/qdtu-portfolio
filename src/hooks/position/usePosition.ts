import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { PositionService } from "@/features/position/position.service";
import type { IApiResponse } from "@/features/position/position.type";

export function usePosition() {
	return useQuery<AxiosResponse<IApiResponse>>({
		queryKey: ["positions"],
		queryFn: () => PositionService.getAll(),
	});
}
