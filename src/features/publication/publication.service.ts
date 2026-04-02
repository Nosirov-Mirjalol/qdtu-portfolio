import { apiClient } from "@/api/client"
import { NASHR } from "@/constants/apiEndpoint"
import type { GetbyIdResponse } from "./publication.type"

export const publicationService={
  getById(id:number){
    return apiClient.get<GetbyIdResponse>(`${NASHR.GETBYID}/${id}`)
  },
}