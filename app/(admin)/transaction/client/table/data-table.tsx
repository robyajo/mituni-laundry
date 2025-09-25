"use client";

import React, { Suspense, useEffect, useMemo, useState, useRef } from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Search, XIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { DataTablePagination } from "./data-table-pagination";
import { TableHeaderFilters } from "./table-header-filters";
import SkeletonTable from "./skeleton-table";
import { DataTableToolbar } from "./data-table-toolbar";
import CalendarBalitaDownload from "@/components/calendar/calendar-balita-download";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchNik?: string;
  labelNik?: string;
  labelSearch?: string;
  token?: string;
  urlFilter?: string;
  isLoading?: boolean;
  stickyColumns?: string[];
  refetchData: () => void;
  onEdit?: (data: TData) => void;
  onFilter?: (filters: {
    nik: string;
    no_kk: string;
    nama_anak: string;
    id_kec: number;
    id_kel: number;
    id_posyandu: number;
    id_puskesmas: number;
    date_range: string;
    id_admin: number;
    jumlah: string;
    jenis_kelamin: string;
    nama_orang_tua: string;
    nik_orang_tua: string;
    alamat: string;
    rt: string;
    rw: string;
    jaminan_kesehatan: string;
    verif_tpg: string;
  }) => void;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  totalItems: number;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export function DataTable<TData, TValue>({
  columns,
  data,
  onEdit,
  onFilter,
  pageCount,
  pageIndex,
  pageSize,
  onPaginationChange,
  totalItems,
  isLoading,
  stickyColumns = [],
  refetchData,
}: DataTableProps<TData, TValue>) {
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const calendarRef = useRef<{ reset: () => void }>(null);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // Parse date range string into DateRange object
  const parseDateRange = (dateStr?: string) => {
    if (!dateStr) return undefined;
    const [start, end] = dateStr.split(",");
    if (!start) return undefined;

    // Parse date in local timezone without timezone conversion
    const parseDate = (dateString: string) => {
      // Parse the date string in YYYY-MM-DD format
      const [year, month, day] = dateString.split("-").map(Number);
      // Create date in local timezone (month is 0-indexed in JavaScript)
      return new Date(year, month - 1, day, 12, 0, 0); // Set to noon to avoid timezone issues
    };

    const from = parseDate(start);
    const to = end ? parseDate(end) : parseDate(start);

    return isNaN(from.getTime()) ? undefined : { from, to };
  };

  // Format date for display
  const formatDateRange = (dateRange?: { from?: Date; to?: Date }) => {
    // Skip formatting during SSR
    if (typeof window === "undefined") return "";
    if (!dateRange?.from) return "";

    // Format date in Indonesian locale (no timezone conversion)
    const format = (date: Date) => {
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    };

    const from = format(dateRange.from);
    const to = dateRange.to ? format(dateRange.to) : null;

    // If both dates are the same, return only the 'from' date
    if (to && from === to) {
      return from;
    }

    return to ? `${from} - ${to}` : from;
  };

  const [dateRange, setDateRange] = useState<
    { from?: Date; to?: Date } | undefined
  >();
  const [displayDate, setDisplayDate] = useState("");

  // Initialize date range after mount to prevent hydration mismatch

  // Update display date after mount
  useEffect(() => {
    setDisplayDate(dateRange ? formatDateRange(dateRange) : "");
  }, [dateRange]);
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";
  const { data: session } = useSession();

  // Store previous filter values to detect changes
  const prevFiltersRef = useRef({});

  // Reset all filters including table filters
  const handleResetFilters = () => {
    // Reset all table filters
    table.getAllColumns().forEach((column) => {
      if (column.getCanFilter()) {
        column.setFilterValue(undefined);
      }
    });

    // Reset calendar
    if (calendarRef.current) {
      calendarRef.current.reset();
    }
    refetchData();
    // Reset pagination to first page
    onPaginationChange({
      pageIndex: 0,
      pageSize: table.getState().pagination.pageSize,
    });
  };
  // Enhanced columns with onEdit capability
  const enhancedColumns = useMemo(() => {
    return columns.map((column) => {
      if (column.id === "actions" && onEdit) {
        const originalCell = column.cell as any;
        return {
          ...column,
          cell: (props: any) => {
            const enhancedProps = {
              ...props,
              onEdit,
            };
            return typeof originalCell === "function"
              ? originalCell(enhancedProps)
              : originalCell;
          },
        } as ColumnDef<TData, TValue>;
      }
      return column;
    });
  }, [columns, onEdit]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    pageCount,
    manualPagination: true,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      onPaginationChange(newPagination);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // Add these to ensure proper pagination state updates
    getPaginationRowModel: getPaginationRowModel(),
    onStateChange: (updater: any) => {
      // This ensures the table updates when the pagination state changes
      if (updater.pagination) {
        onPaginationChange(updater.pagination);
      }
    },
  });

  // Update table state when pagination props change
  useEffect(() => {
    table.setPageIndex(pageIndex);
    table.setPageSize(pageSize);
  }, [pageIndex, pageSize, table]);
  const getStickyLeft = (headerId: string) => {
    if (!table || typeof window === "undefined") return 0; // Return 0 during SSR

    const index = stickyColumns.indexOf(headerId);
    if (index === -1) return 0;

    // Rest of your existing getStickyLeft implementation
    for (const headerGroup of table.getHeaderGroups()) {
      const column = headerGroup.headers.find((h) => h.id === headerId);
      if (column) {
        return stickyColumns.slice(0, index).reduce((total, id) => {
          const prevColumn = headerGroup.headers.find((h) => h.id === id);
          return total + (prevColumn?.getSize() || 0);
        }, 0);
      }
    }
    return 0;
  };
  return (
    <>
      <div
        className="group w-full relative"
        data-collapsible={isCollapsed ? "icon" : "default"}
      >
        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          {/* Action Buttons */}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="w-full sm:w-auto">
            {hasActiveFilters && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetFilters}
                className="w-full sm:w-auto"
              >
                <XIcon className="mr-1" />
                Reset Filter
              </Button>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <DataTableToolbar table={table} data={data} columns={columns} />
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="w-full sm:w-auto">
                {session?.user?.role === "tpg" ? (
                  <>
                    {/* <CalendarBalitaVerif
                      ref={calendarRef}
                      onChange={(value: string) => {
                        if (value) {
                          const newDateRange = parseDateRange(value);
                          setDateRange(newDateRange);
                          setDisplayDate(formatDateRange(newDateRange));
                          setFilters({ date_range: value });
                        } else {
                          setDateRange(undefined);
                          setDisplayDate("");
                          setFilters({ date_range: "" });
                        }
                      }}
                      placeholder="Pilih Tanggal Input"
                      value={
                        dateRange
                          ? `${dateRange.from?.toISOString().split("T")[0]}${
                              dateRange.to
                                ? "," + dateRange.to.toISOString().split("T")[0]
                                : ""
                            }`
                          : ""
                      }
                    /> */}

                    <CalendarBalitaDownload
                      ref={calendarRef}
                      onChange={(value: string) => {
                        if (value) {
                          const newDateRange = parseDateRange(value);
                          setDateRange(newDateRange);
                          setDisplayDate(formatDateRange(newDateRange));
                        } else {
                          setDateRange(undefined);
                          setDisplayDate("");
                        }
                      }}
                      placeholder="Pilih Tanggal Input"
                      value={
                        dateRange
                          ? `${dateRange.from?.toISOString().split("T")[0]}${
                              dateRange.to
                                ? "," + dateRange.to.toISOString().split("T")[0]
                                : ""
                            }`
                          : ""
                      }
                    />
                  </>
                ) : (
                  <>
                    <CalendarBalitaDownload
                      ref={calendarRef}
                      onChange={(value: string) => {
                        if (value) {
                          const newDateRange = parseDateRange(value);
                          setDateRange(newDateRange);
                          setDisplayDate(formatDateRange(newDateRange));
                        } else {
                          setDateRange(undefined);
                          setDisplayDate("");
                        }
                      }}
                      placeholder="Pilih Tanggal Input"
                      value={
                        dateRange
                          ? `${dateRange.from?.toISOString().split("T")[0]}${
                              dateRange.to
                                ? "," + dateRange.to.toISOString().split("T")[0]
                                : ""
                            }`
                          : ""
                      }
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-auto max-h-[700px] rounded-lg">
          <table className="w-full table-fixed text-sm border border-gray-200 dark:border-gray-700">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr className="sticky top-0 z-20 ">
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      "px-3 py-2 text-left font-medium text-muted-foreground border border-gray-200 dark:border-gray-700",
                      "md:sticky",
                      "bg-accent",
                      stickyColumns.includes(header.id as string) && [
                        "md:left-0", // Only apply left positioning on medium screens and up
                        "z-20 min-w-[160px] md:min-w-[200px] text-xs md:text-sm font-medium text-muted-foreground",
                        "border border-gray-200 dark:border-gray-700",
                        "bg-accent",
                      ]
                    )}
                    style={{
                      width: header.getSize(),
                      ...(stickyColumns.includes(header.id as string) &&
                        isClient && {
                          left:
                            window.innerWidth >= 768
                              ? getStickyLeft(header.id)
                              : undefined,
                        }),
                    }}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </th>
                ))}
              </tr>
              {/* <tr className="sticky top-[41px] z-20">
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <th
                    key={`filter-${header.id}`}
                    className={cn(
                      "px-3 py-2",
                      stickyColumns.includes(header.id as string) && [
                        "md:sticky md:left-0 z-20 border-r ",
                      ]
                    )}
                    style={{
                      width: header.getSize(),
                      ...(stickyColumns.includes(header.id as string) &&
                        isClient && {
                          left:
                            window.innerWidth >= 768
                              ? getStickyLeft(header.id)
                              : undefined,
                        }),
                    }}
                  >
                    {header.column.getCanFilter() && (
                      <TableHeaderFilters
                        header={header}
                        title={String(
                          (
                            header.column.columnDef.meta as
                              | { title?: string }
                              | undefined
                          )?.title || ""
                        )}
                        isSearchable={true}
                      />
                    )}
                  </th>
                ))}
              </tr> */}
            </thead>

            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-muted/50 transition-colors whitespace-nowrap border border-gray-200 dark:border-gray-700 ${
                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={cn(
                          "px-2 py-1 border border-gray-200 dark:border-gray-700",
                          stickyColumns.includes(cell.column.id as string) && [
                            "md:sticky md:left-0 z-10",
                            "bg-muted/90",
                            "border-gray-300 dark:border-gray-700",
                          ]
                        )}
                        style={{
                          width: cell.column.getSize(),
                          ...(stickyColumns.includes(
                            cell.column.id as string
                          ) && {
                            left:
                              typeof window !== "undefined" &&
                              window.innerWidth >= 768
                                ? getStickyLeft(cell.column.id)
                                : undefined,
                          }),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : isLoading ? (
                <SkeletonTable columns={columns} rows={10} />
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-12 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center">
                      <Search className="h-12 w-12 mb-4 opacity-50" />
                      <p className="text-lg font-medium">
                        Tidak ada data yang ditemukan
                      </p>
                      <p className="text-sm">Coba ubah filter pencarian Anda</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-1">
          <DataTablePagination
            table={table}
            pageCount={pageCount}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalItems={totalItems}
            onPaginationChange={onPaginationChange}
          />
        </div>
      </div>
    </>
  );
}
