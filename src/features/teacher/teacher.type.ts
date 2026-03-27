export interface Teachers {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  biography: string;
  input: string;
  age: number;
  gender: boolean;
  orcId: string;
  scopusId: string;
  scienceId: string;
  researcherId: string;
  imageUrl: string;
  fileUrl: string;
  profession: string;
}
export interface Teacher {
  id: number;
  fullName: string;
  lavozim: string;
  email: string | null;
  age: number;
  gender: boolean;
  profession: string | null;
  imgUrl: string;
  input: string | null;
  phoneNumber: string;
  departmentName: string;
}
export interface SearchParams{
  name:string;
  college:string;
  lavozim:string;
  page:number;
  size:number
}
// GET: Teacher by ID
export interface GetTeacherIdResponse {
  success: boolean;
  message: string;
  data: Teachers;
}

// GET: Teacher Search
export interface TeacherSearchData {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: Teacher[];
}

export interface GetTeacherSearchResponse {
  success: boolean;
  message: string;
  data: TeacherSearchData;
}

// POST: Create Teacher
export interface CreateTeacherRequest {
  fullName: string;
  phoneNumber: string;
  imgUrl: string;
  fileUrl: string;
  lavozmId: number;
  gender: boolean;
  password: string;
  departmentId: number;
}

export interface CreateTeacherResponse {
  success: boolean;
  message: string;
  data: string;
}

// PUT: Edit Teacher (short fields)

export interface EditTeacherDTO {
  fullName: string;
  phoneNumber: string;
  imgUrl: string | null;
  fileUrl: string;
  lavozmId: number;
  gender: boolean;
  password: string;
  departmentId: number;
}

export interface EditTeacherResponse {
  success: boolean;
  message: string;
  data: string;
}

// PUT: Update Teacher (full fields)

export interface UpdateTeacherDTO {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  biography: string;
  input: string;
  age: number;
  orcId: string;
  scopusId: string;
  scienceId: string;
  researcherId: string;
  gender: boolean;
  imageUrl: string;
  fileUrl: string;
  profession: string;
  lavozmId: number;
  departmentId: number;
}

export interface UpdateTeacherResponse {
  success: boolean;
  message: string;
  data: string;
}

// DELETE: Teacher

export interface DeleteTeacherResponse {
  success: boolean;
  message: string;
  data: string;
}