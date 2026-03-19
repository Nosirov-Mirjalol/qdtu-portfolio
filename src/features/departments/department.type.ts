export interface CreateDepartmentDTO {
	name: string;
	imgUrl: string;
}
export interface Department {
	id: number;
	name: string;
	imgUrl: string;
}
export interface DepartmentListResponse {
	success: boolean;
	message: string;
	data: Department[];
}

export interface DepartmentCreateResponse {
	success: boolean;
	message: string;
	data: Department;
}