import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"
import Loader from "./Loader"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth()
    if (isLoading) {
        return <Loader />
    }
    return isAuthenticated == true ? children : <Navigate to='/admin' />
}

export default ProtectedRoute
