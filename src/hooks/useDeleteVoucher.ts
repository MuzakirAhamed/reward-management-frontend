import { deleteVoucher } from "@/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDeleteVoucher = () => {
    const queryClient = useQueryClient();
return useMutation({
    mutationFn: (id: string | number) =>deleteVoucher(id),
    onSuccess: () => {
        console.log("Voucher deleted successfully")
        toast.success("Voucher deleted successfully")
        queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    },
    onError: (error) => {
        console.error("Error deleting voucher:", error)
        toast.error("Error deleting voucher")
    }
})    
}