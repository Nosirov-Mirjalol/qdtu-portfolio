import { apiClient } from "@/api/client";
import { NASHR } from "@/constants/apiEndpoint";
import type { GetbyIdResponse } from "./publication.type";
import { EditResearchResponse } from "../research/research.type";

export const publicationService = {
	getById(id: number) {
		return apiClient.get<GetbyIdResponse>(`${NASHR.GETBYID}/${id}`);
	},
	delete(id: number) {
		return apiClient.delete<EditResearchResponse>(`${NASHR.DELETE}/${id}`);
	},
};
