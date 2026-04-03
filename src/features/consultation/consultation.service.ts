import { apiClient } from "@/api/client"
import { MASLAHAT } from "@/constants/apiEndpoint"
import type { GetbyIdResponse } from "./consultation.type" 
import { EditResearchResponse } from "../research/research.type"

export const MaslahatService={
  getById(id:number){
    return apiClient.get<GetbyIdResponse>(`${MASLAHAT.GETBYID}/${id}`)
  },
  delete(id:number){
    return apiClient.delete<EditResearchResponse>(`${MASLAHAT.DELETE}/${id}`)
  }
}