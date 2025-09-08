import type { VoucherFormValues, VoucherStore } from "@/type/Voucher";
import { http } from "./axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getVouchers = async () => {
    const response = await http.get(`${BASE_URL}/vouchers`);
    return response.data.vouchers;
}

export const storeVoucher = async (data: VoucherStore) => {
    const response = await http.post(`${BASE_URL}/vouchers`, data);
    return response.data;
}

export const editVoucher = async (id: number | string) => {
    const response = await http.get(`${BASE_URL}/vouchers/${id}`);
    return response.data?.voucher;
}

export const updateVoucher = async (id: number | string, data: VoucherFormValues) => {
    const response = await http.put(`${BASE_URL}/vouchers/${id}`, data);
    return response.data;
}

export const deleteVoucher = async (id: number | string) => {
    const response = await http.delete(`${BASE_URL}/vouchers/${id}`);
    return response.data;
}

export const getVoucherTracks = async () => {
    const response = await http.get(`${BASE_URL}/active-vouchers`);
    return response.data?.vouchers;
}

export const getDashboardData = async () => {
    const response = await http.get('/dashboard')
    return response.data
}