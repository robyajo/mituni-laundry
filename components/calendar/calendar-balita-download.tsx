"use client";

import * as React from "react";
import { Check, ChevronDownIcon, X, Download, Loader2 } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner"; // atau notification library lain
import { useSession } from "next-auth/react"; // sesuaikan dengan auth library

const getMonthName = (monthIndex: number): string => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return months[monthIndex];
};

const CalendarBalitaDownload = React.forwardRef(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      API_URL = process.env.NEXT_PUBLIC_API_URL, // tambahkan API_URL prop
      enableExport = true, // tambahkan flag untuk enable/disable export
    }: {
      value?: string;
      onChange?: (value: string) => void;
      label?: string;
      placeholder?: string;
      API_URL?: string;
      enableExport?: boolean;
    },
    ref: React.ForwardedRef<{ reset: () => void }>
  ) => {
    const [range, setRange] = React.useState<DateRange | undefined>(undefined);
    const [open, setOpen] = React.useState(false);

    // Export states
    const [isExporting, setIsExporting] = React.useState(false);
    const [exportFileUrl, setExportFileUrl] = React.useState<string | null>(
      null
    );
    const [exportError, setExportError] = React.useState<string | null>(null);

    const { data: session } = useSession();

    // Initialize range from filters if available
    React.useEffect(() => {
      if (value) {
        const [start, end] = value.split(",");
        if (start && end && start !== "undefined" && end !== "undefined") {
          setRange({
            from: new Date(start),
            to: new Date(end),
          });
        } else {
          setRange(undefined);
        }
      } else {
        // Reset range when filters are cleared
        setRange(undefined);
      }
    }, [value]);

    // Expose reset function via ref
    React.useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          setRange(undefined);
          setExportFileUrl(null);
          setExportError(null);
          if (onChange) {
            onChange("");
          }
        },
      }),
      [onChange]
    );

    const handleResetCalendar = React.useCallback(() => {
      setRange(undefined);
      setExportFileUrl(null);
      setExportError(null);
      if (onChange) {
        onChange("");
      }
    }, [onChange]);

    // Export function
    const handleExport = async (fromDate: string, toDate: string) => {
      if (!enableExport || !API_URL) return;

      try {
        setIsExporting(true);
        setExportError(null);

        if (!session?.accessToken) {
          throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }

        const url = `${API_URL}/api/${session?.user?.role}/exportBalita?date_range=${fromDate},${toDate}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.file_url) {
          setExportFileUrl(data.file_url);
          toast.success("Export berhasil! File siap didownload.");

          // Optional: Auto download
          // window.open(data.file_url, '_blank');
        } else {
          throw new Error("Export gagal, tidak ada URL file");
        }
      } catch (error) {
        console.error("Export error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Export gagal";
        setExportError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsExporting(false);
      }
    };

    const handleApplyFilter = () => {
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      if (range?.from) {
        const fromDate = formatDate(range.from);
        const toDate = range.to ? formatDate(range.to) : fromDate;

        // Update filters saja
        onChange?.(`${fromDate},${toDate}`);

        setOpen(false);
      }
    };

    const handleExportClick = async () => {
      if (!range?.from) return;

      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const fromDate = formatDate(range.from);
      const toDate = range.to ? formatDate(range.to) : fromDate;

      await handleExport(fromDate, toDate);
    };

    const handleDownload = () => {
      if (exportFileUrl) {
        window.open(exportFileUrl, "_blank");
        toast.success("File sedang didownload...");
      }
    };

    return (
      <div className="flex flex-col gap-3">
        {label && <Label htmlFor="dates">{label}</Label>}

        <div className="flex gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="dates"
                className="flex-1 justify-between font-normal"
              >
                {range?.from && range?.to
                  ? range.from.getTime() === range.to.getTime()
                    ? `${range.from.getDate()} ${getMonthName(
                        range.from.getMonth()
                      )} ${range.from.getFullYear()}`
                    : `${range.from.getDate()} ${getMonthName(
                        range.from.getMonth()
                      )} ${range.from.getFullYear()} - 
           ${range.to.getDate()} ${getMonthName(
                        range.to.getMonth()
                      )} ${range.to.getFullYear()}`
                  : range?.from
                  ? `${range.from.getDate()} ${getMonthName(
                      range.from.getMonth()
                    )} ${range.from.getFullYear()}`
                  : range?.to
                  ? `${range.to.getDate()} ${getMonthName(
                      range.to.getMonth()
                    )} ${range.to.getFullYear()}`
                  : ` ${placeholder}`}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mx-4" align="start">
              <div className="flex justify-between items-center p-2 border-b gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetCalendar}
                  className="h-8 px-2 text-xs"
                  disabled={!range?.from && !range?.to}
                >
                  <X className="h-4 w-4 mr-1" />
                  Reset
                </Button>
                {range?.from && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleApplyFilter}
                      className="h-8 px-2 text-xs"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Terapkan
                    </Button>

                    {enableExport && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportClick}
                        className="h-8 px-2 text-xs"
                        disabled={isExporting}
                      >
                        {isExporting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            Export...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div className="p-2">
                <Calendar
                  mode="range"
                  selected={range}
                  captionLayout="dropdown"
                  fromYear={2019}
                  onSelect={(selectedRange) => {
                    setRange(selectedRange);
                    // Reset export state when range changes
                    setExportFileUrl(null);
                    setExportError(null);
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>

          {/* Download button - hanya muncul jika ada file URL */}
          {/* {enableExport && exportFileUrl && (
            <Button
              variant="success"
              size="default"
              onClick={handleDownload}
              className="px-3"
              title="Download file export"
            >
              <Download className="h-4 w-4" />
            </Button>
          )} */}
        </div>

        {/* Export status */}
        {enableExport && exportError && (
          <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
            Error: {exportError}
          </div>
        )}

        {enableExport && exportFileUrl && !exportError && (
          <div className="text-green-600 text-sm bg-green-50 p-2 rounded flex items-center justify-between gap-2">
            <span>✓ Export berhasil! File siap didownload.</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="h-6 px-2 text-xs"
            >
              <Download className="h-2 w-2 mr-1" />
              Download
            </Button>
          </div>
        )}
      </div>
    );
  }
);

CalendarBalitaDownload.displayName = "CalendarBalitaDownload";

export default CalendarBalitaDownload;
