import { getDashboardData } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export const useDashboardData = () => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData
    })
}