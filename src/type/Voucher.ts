export type Voucher = {
    id: string
    name: string
    code: string
    description: string
    expiry_date: Date
    currency: string
    created_at: Date
}

export type VoucherFormValues = Omit<Voucher, "id" | "created_at">

export type VoucherStore = {
    id: string
    name: string
    code: string
    description: string
    expiry_date: string
    currency: string
    created_at: Date
}

export type VoucherTrack = {
    id: number,
    user_id: number,
    voucher_id: number,
    created_at: Date,
    user: {
        id: number,
        name: string,
        email: string
    },
    voucher: {
        id: number,
        name: string,
        code: string,
        description: string,
        expiry_date: Date,
        currency: string,
    }
}
