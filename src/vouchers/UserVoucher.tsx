import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/context/AuthContext"
import { http } from "@/services/axios"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, UserMinus } from "lucide-react"
import {  useState } from "react"
import { toast } from "sonner"
import { useQueries } from "@tanstack/react-query"
import Loader from "@/components/Loader"
import type { ActiveUser } from "@/type/User"
const UserVoucher = ({ id, isExpired }: { id: string | number, isExpired: boolean }) => {
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])
    const [open, setOpen] = useState(false)
    const { isAuthenticated } = useAuth()

    const fetchUserVouchers = async() => {
        const response = await http.get(`/voucher-user/${id}`)
        setSelectedUsers(response?.data?.users)
        return response.data.users
    }

    const fetchUsers = async(): Promise<ActiveUser[]> => {
        const response = await http.get('/users')
        return response.data.users
    }

    const UserQueries = useQueries({
        queries: [
            {
                queryKey: ['users'],
                queryFn: fetchUsers,
                enabled: isAuthenticated
            },{
                queryKey: ['voucher-user'],
                queryFn: fetchUserVouchers,
                enabled: isAuthenticated
            }
        ]
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await http.post(`${import.meta.env.VITE_API_BASE_URL}/issue-voucher`, {
                user_id: selectedUsers,
                voucher_id: id
            });
            if (response.status === 201) {
                toast.success("Vouchers issued successfully");
                setOpen(false);
            }
            console.log("Response:", response);
        } catch (err) {
            console.error("Error submitting data:", err);
        }
    }

    const handleCheck = (event: boolean, id: number) => {
        if (!event) {
            setSelectedUsers(selectedUsers.filter((item) => item != id))
        } else {
            setSelectedUsers(prev => ([
                ...prev,
                id
            ]))
        }
    }

    if (UserQueries[0].isPending) {
        return <Loader />
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    {isExpired ? <Button disabled variant="outline"><UserMinus /></Button> : <Button variant="outline"><User /></Button>}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Vouchers</DialogTitle>
                        <DialogDescription>
                            Add active vouchers here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            {UserQueries[0]?.data?.length == 0 && <p>No Users</p>}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">User</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Select the User</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {UserQueries[0]?.data?.map((user) => {
                                        return <DropdownMenuCheckboxItem key={user.id}
                                            checked={selectedUsers.includes(user?.id)}
                                            onCheckedChange={(e) => handleCheck(e, user.id)}
                                        >
                                            {user.name}
                                        </DropdownMenuCheckboxItem>
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog >
    )
}

export default UserVoucher
