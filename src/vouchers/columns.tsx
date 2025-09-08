import { Button } from "@/components/ui/button"
import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pen } from "lucide-react"
import { Link } from "react-router-dom"
import { DeleteModal } from "./DeleteModal"
import UserVoucher from "./UserVoucher"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Voucher = {
    id: string
    name: string
    code: string
    description: string
    expiry_date: string
    currency: string
    created_at: string
}

export const columns: ColumnDef<Voucher>[] = [
    {
        header: "S.No",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >Voucher Name <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
        },
    },
    {
        accessorKey: "expiry_date",
        header: ({ column }) => {
            return <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >Expiry Date <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
        },
        cell: (info) => {
            return new Date(`${info.getValue()}`).toDateString()
        }
    },
    {
        header: "Status",
        cell: ({ row }) => {
            const expiryDate = new Date(row?.original?.expiry_date);
            const currentDate = new Date();
            const isExpired = expiryDate < currentDate;
            return <span className={`px-2 py-1 rounded-full font-semibold text-white text-xs ${isExpired ? 'bg-red-500' : 'bg-green-500'}`}>
                {isExpired ? 'Expired' : 'Active'}
            </span>
        }
    },
    {
        header: "Actions",
        cell: ({ row }) => {
            const expiryDate = new Date(row?.original?.expiry_date);
            const currentDate = new Date();
            const isExpired = expiryDate < currentDate;
            return <div className="flex gap-2">
                <Link to={`edit/${row?.original?.id}`}><Button><Pen /></Button></Link>
                <DeleteModal id={row?.original?.id} />
                <UserVoucher id={row?.original?.id} isExpired={isExpired} />
            </div>
        }
    },
]
