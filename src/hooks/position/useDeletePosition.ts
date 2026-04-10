import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PositionService } from "@/features/position/position.service";

export function useDeletePosition() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			const res = await PositionService.delete(id);
			if (res?.success === false) {
				throw res;
			}
			return res;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["positions"] });
			toast.success("Lavozim muvaffaqiyatli o'chirildi");
		},
		onError: (error: any) => {
			if (error?.message === "O'chirish mumkinmas") {
				toast.warning("Bu lavozimda xodimlar bor!");
				return;
			}

			toast.error(error?.message || "Lavozimni o'chirishda xatolik");
		},
	});
}
