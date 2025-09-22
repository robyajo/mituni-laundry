"use client";
import React, { useState } from "react";
import { DataTable } from "./table/data-table";

import { HeadingAdmin } from "../../_components/patrials/heading-admin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTransactionData } from "./resource-api";
import { columns } from "./table/columns";

type Customer = {
  id: string | number;
  name: string;
  gender: string;
  phone_number: string;
  email: string;
  address: string;
  [key: string]: any; // For any additional properties
};

export default function ViewPageTransaction() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0, // 0-based index
    pageSize: 10, // Default page size
  });
  const {
    data: apiResponse,
    isLoading: loadingInfo,
    error: errorInfo,
    refetch: refetchInfo,
  } = useTransactionData(pagination.pageIndex + 1, pagination.pageSize);
  // console.log("apiResponse", apiResponse);
  // Handle API response with no data - don't treat as error
  const apiData = (apiResponse as unknown as any)?.data;
  const isNoDataFound =
    apiResponse?.success === false &&
    apiResponse?.message === "Tidak ada data balita ditemukan.";

  // If no data found, return empty array but keep the table visible
  const userData: any[] = isNoDataFound ? [] : apiData?.data || [];
  const pageCount = apiData?.last_page || 1;
  const totalItems = isNoDataFound ? 0 : apiData?.total || 0;
  const handleAdd = () => {
    setCurrentCustomer(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setCurrentCustomer(null);
    refetchInfo();
  };

  return (
    <>
      <div className="space-y-6 lg:space-y-4">
        <div className="flex items-start justify-between">
          <HeadingAdmin
            title="Transaksi"
            description="Data transaksi yang telah dibuat."
          />
        </div>
        {errorInfo ? (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
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
            searchKey="customer_name"
            labelSearch="Nama Pelanggan"
            columns={columns}
            refetchData={refetchInfo}
            data={userData}
            isLoading={loadingInfo}
            stickyColumns={["customer_name"]}
            pageCount={pageCount}
            pageIndex={pagination.pageIndex}
            pageSize={pagination.pageSize}
            onPaginationChange={setPagination}
            totalItems={totalItems}
          />
        )}
      </div>
    </>
  );
}
