import { apiClient } from "@/api/client";
import { TEACHER } from "@/constants/apiEndpoint";
import type { GetTeacherSearchResponse, SearchParams } from "./teacher.type";

export const TeacherService = {
  getAll(params?:SearchParams) {
    return apiClient.get<GetTeacherSearchResponse>(TEACHER.SEARCH,{params});
  },
};
