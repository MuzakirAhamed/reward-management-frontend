import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const SignIn = () => {
  const [user, setUser] = useState({
    userEmail: "",
    userPassword: "",
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user.userEmail.trim() || !user.userPassword.trim()) {
      setErrors({
        email: !user.userEmail ? "The email field is required" : "",
        password: !user.userPassword ? "The password field is required" : "",
      })
      return
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email: user.userEmail,
          password: user.userPassword,
        },
        { withCredentials: true }
      )

      if (response.data.status === 200) {
        toast.success("User logged in successfully")
        navigate("/vouchers")
        setIsAuthenticated(true)
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setErrors({
            email: "",
            password: "Invalid email or password",
          })
          toast.error("Invalid email or password")
        } else {
          const apiErrors = err.response?.data?.errors
          if (apiErrors) {
            setErrors({
              email: apiErrors.email?.[0] || "",
              password: apiErrors.password?.[0] || "",
            })
          }
        }
      } else {
        console.error((err as Error)?.message)
        toast.error("Something went wrong, please try again")
      }
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="font-bold text-2xl text-center">
            Login to your Account
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="userEmail"
                  placeholder="m@example.com"
                  value={user.userEmail}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="userPassword"
                  value={user.userPassword}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-6">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <CardDescription className="mt-3">For admin credentials use admin@example.com/admin123</CardDescription>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SignIn
