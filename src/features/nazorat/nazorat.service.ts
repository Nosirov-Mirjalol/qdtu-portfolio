import { apiClient } from "@/api/client"
import { NAZORAT } from "@/constants/apiEndpoint"
import type { GetbyIdResponse } from "./nazorat.type"

export const NazoratService={
  getById(id:number){
    return apiClient.get<GetbyIdResponse>(`${NAZORAT.GETBYID}/${id}`)
  },
}