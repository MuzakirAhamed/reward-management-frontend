import { http } from "@/services/axios"
import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
    isAuthenticated: boolean,
    setIsAuthenticated:  React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const getAuthStatus = async () => {
        try {
            const response = await http.get('/me')
            setIsAuthenticated(response?.data?.isAuthenticated)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAuthStatus()
    }, [])
    return <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsAuthenticated }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("Something wrong with context")
    }
    return context
}

