// utils/formatCurrency.ts

/**
 * Format a number or string to Indonesian Rupiah currency (Rp) with 2 decimals.
 * @param value Number or numeric string to format
 * @returns Formatted string, e.g. 'Rp65.000,00'
 */
export function formatCurrencyIDR(value: number | string | undefined | null): string {
  if (value === undefined || value === null || value === "") return "-";
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "-";
  return num.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
