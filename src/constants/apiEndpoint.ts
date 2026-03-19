const API_ENDPOINTS = {
	LOGIN: "/auth/login",
	USER: {
		USER_ME: "/user",
	},
	FILE: {
		IMAGE: "/api/v1/files",
		PDF: "/api/v1/files/pdf",
	},
	COLLAGE: {
		GETALL: "/college",
		CREATE: "college",
		DELETE:"/college",
		UPDATE:'/college'
	},
	DEPARTMENT:{
		GETALL: "/department",
		CREATE: "/department",
		DELETE:"/department",
		UPDATE:'/department',
		PAGE:"/department/page",
		LIST:"/department/list"
	}
};

export const { LOGIN, USER, FILE, COLLAGE,DEPARTMENT } = API_ENDPOINTS;
