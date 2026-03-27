import { apiClient } from "@/api/client";
import { TEACHER } from "@/constants/apiEndpoint";
import type { DeleteTeacherResponse, GetTeacherSearchResponse, SearchParams } from "./teacher.type";

export const TeacherService = {
  getAll(params?:SearchParams) {
    return apiClient.get<GetTeacherSearchResponse>(TEACHER.SEARCH,{params});
  },
  delete(id:number){
    return apiClient.delete<DeleteTeacherResponse>(`${TEACHER.DELETE}/${id}`)
  }
};
