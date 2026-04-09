import { useQuery } from "@tanstack/react-query";
import { departmentService } from "@/features/departments/department.service";
import type { DepartmentListResponse } from "@/features/departments/department.type";
import type { AxiosResponse } from "axios";

export function useDepartment() {
	return useQuery<AxiosResponse<DepartmentListResponse>>({
		queryKey: ["departments"],
		queryFn: () => departmentService.getAll(),
	});
}
