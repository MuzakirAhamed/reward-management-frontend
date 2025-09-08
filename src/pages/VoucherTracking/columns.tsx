import type { VoucherTrack } from "@/type/Voucher"
import type { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<VoucherTrack>[] = [
    {
        header: 'S.No',
        cell: ({ row }) => {
            return row.index + 1
        },
    },
    {
        id: "voucherName",
        accessorKey: 'voucher.name',
        header: 'Voucher Name'
    },
    {
        accessorKey: 'voucher.code',
        header: 'Voucher Code'
    },
    {
        id: "userEmail",
        accessorKey: 'user.email',
        header: 'User Email'
    }, {
        accessorKey: 'created_at',
        header: 'Issue Date',
        cell: ({ row }) => {
            const date = new Date(row.original.created_at);
            return date.toLocaleDateString();
        }
    }, {
        header: 'Status',
        accessorKey: 'voucher.expiry_date',
        cell: ({ row }) => {
            const expiryDate = new Date(row.original.voucher.expiry_date);
            const currentDate = new Date();
            return expiryDate >= currentDate ? "Active" : "Expired";
        }
    }
]