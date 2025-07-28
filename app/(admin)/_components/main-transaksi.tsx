"use client";

import { ScanLine, ScanText } from "lucide-react";

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

export function MainTransaksi() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
        Transaksi
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/transaksi"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/item-cucian">
                  <ScanText />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Transaksi
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Transaksi</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
