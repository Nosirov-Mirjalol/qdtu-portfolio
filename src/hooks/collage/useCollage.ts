import { collageService } from "@/features/collage/collage.service";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export function useCollage() {
	return useQuery<AxiosResponse<any>>({
		queryKey: ["collages"],
		queryFn: () => collageService.getAll(),
	});
}
