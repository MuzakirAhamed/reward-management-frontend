import { getVoucherTracks } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export const useFechVoucherTracks = () => {
    return useQuery({
        queryKey: ['voucher-tracks'],
        queryFn: getVoucherTracks
    })
}