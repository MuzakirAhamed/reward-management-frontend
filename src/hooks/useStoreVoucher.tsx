import { storeVoucher } from "@/services/api"
import type { VoucherStore } from "@/type/Voucher"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useStoreVoucher = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data: VoucherStore) => storeVoucher(data),
        onSuccess: () => {
            toast.success("Voucher Created Successfully")
            console.log("Voucher created successfully")
            navigate('/vouchers')
        },
        onError: (error) => {
            let message = "Error creating voucher"

            if (error instanceof AxiosError) {
                // Backend validation errors (Laravel style)
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
            } else if (error instanceof Error) {
                message = error.message
            }

            toast.error(message)
            console.error("Error creating voucher:", error)
        }
    })
}