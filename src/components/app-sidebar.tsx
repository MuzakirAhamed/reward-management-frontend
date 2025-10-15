import { Home, LogOut, Ticket } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { http } from "@/services/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Vouchers",
    url: "/vouchers",
    icon: Ticket,
  },
  {
    title: "Voucher Tracking",
    url: "/voucher-tracking",
    icon: Ticket,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const handleLogout = async () => {
    try {
      const response = await http.post("/logout");
      if (response?.data?.status == 200) {
        toast.success(response?.data?.message);
        navigate("/admin");
        setIsAuthenticated(false);
      }
      console.log(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        toast.error(err?.response?.data?.error || "Login failed");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarHeader className="font-semibold text-2xl">
          Reward management
        </SidebarHeader>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mx-6 my-3">
        <Button onClick={handleLogout} variant="outline">
          Logout <LogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
