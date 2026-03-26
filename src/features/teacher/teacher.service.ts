import { apiClient } from "@/api/client";
import { TEACHER } from "@/constants/apiEndpoint";
import { GetTeacherSearchResponse } from "./teacher.type";

export const TeacherService = {
  getAll() {
    return apiClient.get<GetTeacherSearchResponse>(TEACHER.SEARCH,);
  },
};
