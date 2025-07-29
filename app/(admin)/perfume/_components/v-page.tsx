"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import type { SchemaPerfume } from "./schema/schema-perfume";
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
import FormServices from "./form/form-perfume";

// Pastikan variabel ENV sudah di-setup di .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;

export default function ViewPagePerfume() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    unit: "",
    price: "",
    icon: null,
  });
  const [editingService, setEditingService] = React.useState(false);
  const [editingServiceId, setEditingServiceId] = React.useState<
    string | number | null
  >(null);
  const [editingServiceData, setEditingServiceData] = React.useState<
    Partial<SchemaPerfume> | undefined
  >(undefined);
  const { data: session } = useSession();
  const apiUrl = `${API_URL}/api/perfume`;
  const {
    data: apiResponse,
    isLoading: loadingInfo,
    error: errorInfo,
    isFetching: isFetchingInfo,
    refetch: refetchInfo,
  } = useQuery<any>({
    queryKey: ["perfume"],
    queryFn: async () => {
      const response = await axios.post(
        apiUrl,
        {
          branch_id: session?.data?.outlet_id_active,
          search: "",
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

  // Handler untuk membuka dialog edit
  const handleEdit = async (row: any) => {
    setEditingService(true);
    const id = row.original.id ?? null;
    console.log("id", id);
    setEditingServiceId(id);

    // fetch detail dari API
    if (id) {
      try {
        const detailRes = await axios.post(
          `${API_URL}/api/perfume`, // Pastikan endpoint ini benar
          {
            branch_id: session?.data?.outlet_id_active,
            search: id, // Gunakan id, bukan search
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

        const detail = detailRes.data?.data;
        console.log("detail response:", detail);

        // Set data dengan benar
        if (detail) {
          setEditingServiceData({
            name_perfume: detail.name_perfume ?? "",
            // tambahkan field lain jika ada
          });
        } else {
          // Jika tidak ada detail, gunakan data dari row
          setEditingServiceData({
            name_perfume: row.original.name_perfume ?? "",
          });
        }
      } catch (err) {
        console.error("Error fetching detail:", err);
        // Fallback ke data dari row jika API gagal
        setEditingServiceData({
          name_perfume: row.original.name_perfume ?? "",
        });
      }
    } else {
      // Jika tidak ada ID, gunakan data dari row
      setEditingServiceData({
        name_perfume: row.original.name_perfume ?? "",
      });
    }

    // Buka dialog setelah data siap
    setIsDialogOpen(true);
  };

  // Handler untuk buka tambah baru
  const handleAdd = () => {
    setEditingService(false);
    setEditingServiceId(null);
    setEditingServiceData(undefined);
    setIsDialogOpen(true);
  };

  // Inject handler ke kolom tabel
  const columnsWithActions = columns.map((col) => {
    if (col.id === "actions") {
      return {
        ...col,
        cell: ({ row }: any) => {
          const CellComponent = require("./table/columns").CellComponent;
          return (
            <CellComponent
              row={row}
              onEdit={() => handleEdit(row)}
              // onDelete={() => ...}
            />
          );
        },
      };
    }
    return col;
  });
  console.log("columnsWithActions", columnsWithActions);
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Perfume" : "Tambah Perfume Baru"}
            </DialogTitle>
            <DialogDescription>
              Isi informasi layanan laundry yang akan ditambahkan
            </DialogDescription>
          </DialogHeader>
          <FormServices
            refetch={refetchInfo}
            initialData={editingServiceData}
            id={editingServiceId}
            onSuccess={() => {
              setIsDialogOpen(false);
              setEditingService(false);
              setEditingServiceId(null);
              setEditingServiceData(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-6 lg:space-y-4">
        <div className="flex items-start justify-between">
          <HeadingAdmin
            title={`Perfume`}
            description="Data layan yang telah dibuat."
          />
          <Button variant="default" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            {editingService ? "Edit Perfume" : "Tambah Perfume Baru"}
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
            searchKey="name_perfume"
            labelSearch="Nama Parfum"
            columns={columnsWithActions}
            data={apiResponse?.data ?? []}
            isLoading={loadingInfo}
          />
        )}
      </div>
    </>
  );
}
