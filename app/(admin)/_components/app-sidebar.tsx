"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MainMenu } from "./main-menu";
import { MainLayanan } from "./main-layanan";
import { MainTransaksi } from "./main-transaksi";
import { MainSetting } from "./main-setting";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Outlet 1",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Outlet 2",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Outlet 3",
      logo: Command,
      plan: "Free",
    },
  ],

  mainMenu: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="h-auto justify-start gap-2 px-2 py-1.5"
            >
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={24}
                height={24}
                className="size-8 rounded-lg object-contain"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h1 className="font-bold text-teal-600 dark:text-teal-400">
                  Mituni Laundry
                </h1>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
        <TeamSwitcher teams={data.teams} />
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <MainMenu />
        <MainLayanan />
        <MainTransaksi />
        <MainSetting />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
