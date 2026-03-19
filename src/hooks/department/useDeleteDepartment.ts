import { departmentService } from "@/features/departments/department.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteCollage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			return departmentService.delete(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["departments"] });
			toast.success("Department muvaffaqiyatli o'chirildi");
		},
		onError: (error: { message: string }) => {
			toast.error(error.message || "Departmentni o'chirishda xatolik");
		},
	});
}