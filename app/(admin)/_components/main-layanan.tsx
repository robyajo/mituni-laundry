"use client";

import {
  Archive,
  ChevronRight,
  Layers,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { CollapsibleMenu } from "./collapsible-menu";

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
                  pathname === "/services/items"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/services/items">
                  <Layers />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Layanan
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Layanan</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/services/cucian"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/services/cucian">
                  <Shirt />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Cucian
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Cucian</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/services/rak"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/services/rak">
                  <Archive />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Rak
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Rak</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/services/perfume"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/services/perfume">
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

        <CollapsibleMenu
          item={{
            title: "Pelanggan",
            url: "/services/customer",
            icon: Users,
            isActive: pathname === "/services/customer",
            items: [
              {
                title: "List Pelanggan",
                url: "/services/customer",
              },
              {
                title: "Tambah Pelanggan",
                url: "/services/customer/tambah",
              },
            ],
          }}
        />
        <CollapsibleMenu
          item={{
            title: "Outlet",
            url: "/services/outlet",
            icon: Store,
            isActive: pathname === "/services/outlet",
            items: [
              {
                title: "List Outlet",
                url: "/services/outlet",
              },
              {
                title: "Tambah Outlet",
                url: "/services/outlet/tambah",
              },
            ],
          }}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
}
