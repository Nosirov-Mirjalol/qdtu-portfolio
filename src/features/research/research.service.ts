import { apiClient } from "@/api/client"
import { RESEARCH } from "@/constants/apiEndpoint"
import { EditResearchParams, EditResearchResponse, GetByIdResponse } from "./research.type"

export const ResearchService={
  getById(id:number){
    return apiClient.get<GetByIdResponse>(`${RESEARCH.GETBYID}/${id}`)
  },
  edit(id:number,params:EditResearchParams){
    return apiClient.put<EditResearchResponse>(`${RESEARCH.GETBYID}/${id}`,params)
  }
}