/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/app-sidebar.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 2:21:46 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import { Calendar, LayoutDashboard, Inbox, CircleAlert, Settings, UsersRound, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import axiosInstance from "@/lib/axiosHelper"
import { useState } from "react"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Service Groups",
    url: "/service-groups",
    icon: Inbox,
  },
  {
    title: "Services",
    url: "/services",
    icon: Calendar,
  },
  {
    title: "Incidents",
    url: "/incidents",
    icon: CircleAlert,
  },
  {
    title: "User Management",
    url: "/user-managment",
    icon: UsersRound,
  },
  {
    title: "Live Dashboard",
    url: "/customer",
    icon: UsersRound,
  },
]

export function AppSidebar() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await axiosInstance.post('/user/logout');
      localStorage.removeItem('token');
      navigate('/login')
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel><h1 style={{fontSize: '20px', color: 'red'}}>XYZ Organization</h1></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}> 
                      <item.icon />
                      {item.title}
                    </Link>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} disabled={loading}>
              <LogOut/>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
