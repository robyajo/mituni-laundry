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

export const CellComponent = ({ row, onEdit }: any) => {
  return (
    <>
      <div className="flex float-right px-4 ">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(row)}>
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
    accessorKey: "name_perfume",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nama Parfum" />;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellComponent row={row} />,
  },
];
