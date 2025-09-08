import { editVoucher } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchVoucher = (id: number | string) => {
    return useQuery({
        queryKey: ['voucher', id],
        queryFn: () => editVoucher(id!),
        enabled: !!id,
    });
}