import { useQuery } from "@tanstack/react-query"
import { getVouchers } from "@/services/api"
export const useFetchVouchers = () => {
    return useQuery({
        queryKey: ['vouchers'],
        queryFn: getVouchers
    })
}