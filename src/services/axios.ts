import { navigate } from "@/utils/navigation";
import axios from "axios";
import { toast } from "sonner";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
})

http.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
        toast.error(error?.response?.data?.error);
        console.log(error?.response?.data?.error);
        navigate("/admin");
        return Promise.reject(error);
    }
    return Promise.reject(error)
})
