"use client";

import {
  Archive,
  Shirt,
  SoapDispenserDroplet,
  Store,
  Users,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

export function MainLayanan() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
        Layanan
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/layanan/item-cucian"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/item-cucian">
                  <Shirt />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Item Cucian
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Item Cucian</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/layanan/rak-penyimpanan"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/item-cucian">
                  <Archive />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Rak Penyimpanan
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Rak Penyimpanan</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/layanan/parfum"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/item-cucian">
                  <SoapDispenserDroplet />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Parfum
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Parfum</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/layanan/pelanggan"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/item-cucian">
                  <Users />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Pelanggan
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Pelanggan</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/layanan/outlet"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/item-cucian">
                  <Store />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Outlet
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Outlet</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
