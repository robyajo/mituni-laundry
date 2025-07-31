"use client";
import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SchemaPerfume } from "../schema/schema-perfume";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaPerfume } from "../schema/schema-perfume";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface FormPerfumeProps {
  refetch: () => void;
  initialData?: Partial<SchemaPerfume>;
  id?: string | number | null;
  onSuccess?: () => void;
}

export default function FormPerfume({
  refetch,
  initialData,
  id,
  onSuccess,
}: FormPerfumeProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;
  const { data: session } = useSession();

  const form = useForm<SchemaPerfume>({
    resolver: zodResolver(schemaPerfume),
    defaultValues: {
      name_perfume: "",
      ...initialData
    },
  });

  // Reset form when initialData changes (for edit mode)
  React.useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: SchemaPerfume) => {
    setIsLoading(true);
    setError(null);
    try {
      let result;
      if (id) {
        // Update
        result = await axios.post(
          `${API_URL}/api/perfume/update`,
          {
            branch_id: session?.data?.outlet_id_active,
            name_perfume: data.name_perfume,
            id: id,
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
      } else {
        // Tambah
        result = await axios.post(
          `${API_URL}/api/perfume/store`,
          {
            branch_id: session?.data?.outlet_id_active,
            name_perfume: data.name_perfume,
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
      }
      if (result?.data?.success === false) {
        // Ambil error detail dari API
        let apiError =
          result.data.errors || result.data.message || "Validasi gagal";
        if (typeof apiError === "object") {
          // Jika errors bentuk object (misal Laravel)
          apiError = Object.values(apiError).flat().join(" ");
        }
        toast.error(apiError);
        setError(apiError);
      } else {
        toast.success(
          id ? "Data parfum berhasil diupdate" : "Data parfum berhasil disimpan"
        );
        refetch();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Terjadi kesalahan.</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name_perfume"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Nama Parfum <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama parfum"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            Simpan
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
