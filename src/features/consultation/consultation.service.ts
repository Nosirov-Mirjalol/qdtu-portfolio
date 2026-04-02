import { apiClient } from "@/api/client"
import { MASLAHAT } from "@/constants/apiEndpoint"
import type { GetbyIdResponse } from "./consultation.type" 

export const MaslahatService={
  getById(id:number){
    return apiClient.get<GetbyIdResponse>(`${MASLAHAT.GETBYID}/${id}`)
  },
}