import { apiClient } from "@/api/client"
import { MUKOFOT } from "@/constants/apiEndpoint"
import type { GetbyIdResponse } from "./mukofot"
import { EditResearchResponse } from "../research/research.type"

export const MukofotService={
  getById(id:number){
    return apiClient.get<GetbyIdResponse>(`${MUKOFOT.GETBYID}/${id}`)
  },
  delete(id:number){
    return apiClient.delete<EditResearchResponse>(`${MUKOFOT.DELETE}/${id}`)
  }
}