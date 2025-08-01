"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useActiveOutlet } from "@/store/useOutletStore";
import { useRouter } from "next/navigation";

export function OutletSwitcher() {
  const { isMobile } = useSidebar();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;
  const apiUrl = `${API_URL}/api/branches`;
  const { data: session } = useSession();
  const router = useRouter();
  // Get active outlet and setter from the store
  const { outlet_id_active, setActiveOutlet } = useActiveOutlet();

  // Fetch outlets data
  const { data: apiResponse } = useQuery<any>({
    queryKey: ["outlets"],
    queryFn: async () => {
      const response = await axios.get(apiUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-mituni-key": `${MITUNI_API_KEY}`,
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      // Set first outlet as active if none is set
      if (response.data?.data?.length > 0 && !outlet_id_active) {
        setActiveOutlet(response.data.data[0].id.toString());
      }

      return response.data;
    },
    enabled: !!session?.accessToken,
  });

  // Find the currently active outlet
  const activeOutlet =
    apiResponse?.data?.find(
      (outlet: any) => outlet.id.toString() === outlet_id_active
    ) || apiResponse?.data?.[0];

  // Handle outlet change
  const handleOutletChange = (outlet: any) => {
    setActiveOutlet(outlet.id.toString());
    router.push("/dashboard");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {session?.data?.user?.role === "owner" ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Image
                      src="/assets/logo.png"
                      alt="Logo"
                      width={20}
                      height={20}
                      className="size-6 rounded-lg object-contain"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {activeOutlet?.name_brand || "Select Outlet"}
                    </span>
                    <span className="truncate text-xs">
                      {activeOutlet?.address || ""}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="start"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-muted-foreground text-xs">
                  Outlet
                </DropdownMenuLabel>
                {apiResponse?.data.map((outlet: any, index: any) => (
                  <DropdownMenuItem
                    key={outlet.id}
                    onClick={() => handleOutletChange(outlet)}
                    className="gap-2 p-2"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-md border">
                      {outlet.id.toString() === outlet_id_active && (
                        <span className="h-4 w-4 text-primary">✓</span>
                      )}
                    </div>
                    <span className="truncate">{outlet.name_brand}</span>
                    {outlet.id.toString() === outlet_id_active && (
                      <DropdownMenuShortcut>✓</DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <Plus className="size-4" />
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Add Outlet
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
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
          </>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
