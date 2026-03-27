import { apiClient } from "@/api/client";
import { TEACHER } from "@/constants/apiEndpoint";
import type { EditTeacherResponse, CreateTeacherParam, DeleteTeacherResponse, GetTeacherSearchResponse, SearchParams, Teacher } from "./teacher.type";

export const TeacherService = {
  getAll(params?:SearchParams) {
    return apiClient.get<GetTeacherSearchResponse>(TEACHER.SEARCH,{params});
  },
  delete(id:number){
    return apiClient.delete<DeleteTeacherResponse>(`${TEACHER.DELETE}/${id}`)
  },
  create(params:CreateTeacherParam){
    return apiClient.post(TEACHER.CREATE,params)
  },
  edit(params:Teacher){
    return apiClient.put<EditTeacherResponse>(TEACHER.EDIT,params)
  }
};
