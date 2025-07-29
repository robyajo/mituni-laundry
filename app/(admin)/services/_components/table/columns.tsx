"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { formatCurrencyIDR } from "@/utils/formatCurrency";
export const CellComponent = ({ row }: any) => {
  return (
    <>
      <div className="flex float-right px-4 ">
        {/* <TooltipAction label='Edit'>
          <Button variant="secondary" size="icon" className="h-8 w-8 p-0 text-end" onClick={handleOpen}><Edit /> </Button>
        </TooltipAction> */}

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

// Mendefinisikan kolom-kolom tabel
export const columns: ColumnDef<any>[] = [
  {
    id: "no_urut",
    header: "No",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "icon_url",
    header: "Icon",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Image
          width={32}
          height={32}
          src={row.original.icon_url}
          alt={row.original.name}
          className="w-8 h-8 object-contain rounded"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nama Layanan" />;
    },
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => {
      // Format ke Rupiah Indonesia pakai util
      // import { formatCurrencyIDR } from "@/utils/formatCurrency";
      // (pastikan path sesuai alias/struktur project Anda)
      //
      // Jika error import, pastikan tsconfig.json sudah ada path alias @/ ke ./
      //
      // Untuk sementara, import manual:
      // import { formatCurrencyIDR } from "../../../../utils/formatCurrency";
      //
      // Jika sudah setup alias:
      // import { formatCurrencyIDR } from "@/utils/formatCurrency";
      //
      // Gunakan:
      // return formatCurrencyIDR(row.original.price);
      return formatCurrencyIDR(row.original.price);
    },
  },

  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      return row.original.description;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellComponent row={row} />,
  },
];
