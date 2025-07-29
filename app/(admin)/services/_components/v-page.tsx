"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { HeadingAdmin } from "../../_components/patrials/heading-admin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormServices from "./form/form-services";

// Pastikan variabel ENV sudah di-setup di .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;

export default function ViewPageServices() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    unit: "",
    price: "",
    icon: null,
  });
  const [editingService, setEditingService] = React.useState(false);
  const [editingServiceId, setEditingServiceId] = React.useState(null);
  const [editingServiceData, setEditingServiceData] = React.useState(null);
  const { data: session } = useSession();
  const apiUrl = `${API_URL}/api/services`;
  const {
    data: apiResponse,
    isLoading: loadingInfo,
    error: errorInfo,
    isFetching: isFetchingInfo,
    refetch: refetchInfo,
  } = useQuery<any>({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axios.post(
        apiUrl,
        {
          branch_id: session?.data?.outlet_id_active,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-mituni-key": `${MITUNI_API_KEY}`,
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!session?.accessToken && !!session?.data?.outlet_id_active,
  });

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Layanan" : "Tambah Layanan Baru"}
            </DialogTitle>
            <DialogDescription>
              Isi informasi layanan laundry yang akan ditambahkan
            </DialogDescription>
          </DialogHeader>
          <FormServices />
        </DialogContent>
      </Dialog>

      <div className="space-y-6 lg:space-y-4">
        <div className="flex items-start justify-between">
          <HeadingAdmin
            title={`Layana`}
            description="Data layan yang telah dibuat."
          />
          <Button variant="default" onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {editingService ? "Edit Layanan" : "Tambah Layanan Baru"}
          </Button>
        </div>
        {errorInfo ? (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Oops! Terjadi Error!</AlertTitle>
            <AlertDescription>
              <p>
                {typeof errorInfo === "string"
                  ? errorInfo
                  : errorInfo &&
                    typeof errorInfo === "object" &&
                    "response" in errorInfo &&
                    errorInfo.response &&
                    (errorInfo.response as any).data?.message
                  ? (errorInfo as any).response.data?.message
                  : errorInfo?.message || "Gagal memuat data dari API."}
              </p>
            </AlertDescription>
          </Alert>
        ) : (
          <DataTable
            searchKey="name"
            columns={columns}
            data={apiResponse?.data ?? []}
            isLoading={loadingInfo}
          />
        )}
      </div>
    </>
  );
}
