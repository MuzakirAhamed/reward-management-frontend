import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TicketPercent, User } from "lucide-react"
import { useDashboardData } from "@/hooks/useDashboardData"
import Loader from "@/components/Loader"
const Dashboard = () => {
    const { data, isPending, isError, error } = useDashboardData()

    if (isPending) {
        return <Loader />
    }
    if (isError) {
        return <p>{error?.message}</p>
    }
    return (
        <div className="">
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-3">
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total Vouchers Created</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {data?.voucherData?.total || 0}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                {<TicketPercent />}
                                +12.5%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending up this month <TicketPercent className="size-4" />
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Active Vouchers</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {data?.voucherData?.active}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                <TicketPercent />
                                -20%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Down 20% this period <TicketPercent className="size-4" />
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Issued</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {data?.voucherData?.issued}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                <User />
                                +12.5%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Strong user retention <User />
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard
