/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/app-sidebar.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 2:21:46 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import { Calendar, LayoutDashboard, Inbox, CircleAlert, Settings, UsersRound } from "lucide-react"

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
import { Link } from "react-router-dom"

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
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "User Management",
    url: "/user-managment",
    icon: UsersRound,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel><h1 style={{fontSize: '20px', color: 'red'}}>Codestax.AI</h1></SidebarGroupLabel>
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
              Logout
      </SidebarFooter>
    </Sidebar>
  )
}
