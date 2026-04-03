import { apiClient } from "@/api/client"
import { MUKOFOT } from "@/constants/apiEndpoint"
import type { GetbyIdResponse } from "./mukofot"

export const MukofotService={
  getById(id:number){
    return apiClient.get<GetbyIdResponse>(`${MUKOFOT.GETBYID}/${id}`)
  },
}