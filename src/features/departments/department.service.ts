import { apiClient } from "@/api/client";
import type { DepartmentListResponse, DepartmentCreateResponse, CreateDepartmentDTO, Department } from "./department.type";
import { DEPARTMENT } from "@/constants/apiEndpoint";

export const departmentService = {
	getAll() {
		return apiClient.get<DepartmentListResponse>(DEPARTMENT.GETALL);
	},
	create(data: CreateDepartmentDTO) {
		return apiClient.post<DepartmentCreateResponse>(DEPARTMENT.CREATE, data);
	},
	delete(id: number) {
		return apiClient.delete(`/college/${id}`);
	},
	update(id: number, data: Partial<Department>) {
		return apiClient.put<{ success: boolean; message: string }>(`${DEPARTMENT.UPDATE}/${id}`, data);
	},
};
