"use client";
import React from "react";
import { useOutletStore } from "@/store/useOutletStore";

export default function ViewPageDashboard() {
  const outletId = useOutletStore((state) => state.outlet_id_active);

  // Debug log
  // React.useEffect(() => {
  //   console.log("Current outletId:", outletId);
  // }, [outletId]);

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Outlet ID: {outletId}</p>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </div>
  );
}
