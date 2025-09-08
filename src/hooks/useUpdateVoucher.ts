import { updateVoucher } from "@/services/api"
import type { VoucherFormValues } from "@/type/Voucher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useUpdateVoucher = (id: string | number) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data: VoucherFormValues) => updateVoucher(id, data),
        onSuccess: () => {
            toast.success("Voucher Updated Successfully")
            queryClient.invalidateQueries({ queryKey: ['voucher',id] });
            navigate("/vouchers");
        },
        onError: (error) => {
            let message = "Error updating voucher"
            if (error instanceof AxiosError) {
                if (error.response?.data?.errors) {
                    const errors = error.response.data.errors
                    // Show first validation error
                    message = Object.values(errors).flat()[0] as string
                }
                // Custom API error message
                else if (error.response?.data?.message) {
                    message = error.response.data.message
                }
                // Axios default message
                else {
                    message = error.message
                }
            } else {
                message = error.message
            }
            toast.error(message)
            console.error("Error updating voucher:", error)
        }
    })
}