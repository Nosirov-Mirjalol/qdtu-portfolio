import { PositionService } from "@/features/positiion/position.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeletePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => PositionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      toast.success("Lavozim muvaffaqiyatli o'chirildi");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Lavozimni o'chirishda xatolik");
    },
  });
}