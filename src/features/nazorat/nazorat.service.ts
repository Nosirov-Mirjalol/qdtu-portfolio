import { apiClient } from "@/api/client"
import { NAZORAT } from "@/constants/apiEndpoint"
import type { GetbyIdResponse } from "./nazorat.type"
import { EditResearchResponse } from "../research/research.type"

export const NazoratService={
  getById(id:number){
    return apiClient.get<GetbyIdResponse>(`${NAZORAT.GETBYID}/${id}`)
  },
  delete(id:number){
    return apiClient.delete<EditResearchResponse>(`${NAZORAT.DELETE}/${id}`)
  }
}