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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaServices } from "../schema/schema-services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { SchemaServices } from "../schema/schema-services";
import FileUploadWithPreview from "@/app/(admin)/_components/file-upload-with-preview";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServicesUnitData } from "../resource-api";

interface FormServicesProps {
  refetch: () => void;
  initialData?: Partial<SchemaServices>;
  id?: string | number | null;
  onSuccess?: () => void;
}

export default function FormServices({
  refetch,
  initialData,
  id,
  onSuccess,
}: FormServicesProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<any>("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;
  const { data: session } = useSession();

  const form = useForm<SchemaServices>({
    resolver: zodResolver(schemaServices),
    defaultValues: {
      name: "",
      unit: "",
      price: 0,
      description: "",
      icon: "",
    },
  });

  // Reset form and set icon preview when initialData changes (for edit mode)
  React.useEffect(() => {
    if (initialData) {
      console.log("Initial data received:", initialData); // Debug log

      // Format the data properly for the form
      const formattedData = {
        name: initialData.name || "",
        unit: initialData.unit || "", // unit is already a string from API
        price: initialData.price ? Number(initialData.price) : 0, // Convert string price to number
        description: initialData.description || "",
        icon: initialData.icon || "",
      };

      console.log("Formatted data for form:", formattedData); // Debug log

      form.reset(formattedData);

      if (initialData.icon_url) {
        setIconPreview(initialData.icon_url);
      }
    }
  }, [initialData, form]);

  const { data: apiResponseUnit } = useServicesUnitData();
  console.log("apiResponseUnit", apiResponseUnit?.data);
  console.log("initialData", initialData?.unit);

  const onSubmit = async (data: SchemaServices) => {
    setIsLoading(true);
    setError(null);

    try {
      let result;
      const payload = {
        branch_id: session?.data?.outlet_id_active,
        name_service: data.name,
        unit: data.unit,
        price: data.price,
        description: data.description,
        icon: data.icon,
        ...(id && { id: id }), // Only add id if it exists (for update)
      };

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-mituni-key": `${MITUNI_API_KEY}`,
          Authorization: `Bearer ${session?.accessToken}`,
        },
      };

      if (id) {
        // Update
        result = await axios.post(
          `${API_URL}/api/services/update`,
          payload,
          config
        );
      } else {
        // Create - remove id from payload
        const { id: _, ...createPayload } = payload;
        result = await axios.post(
          `${API_URL}/api/services/store`,
          createPayload,
          config
        );
      }

      // Check if request was successful
      if (result?.data?.success === false) {
        // Handle API validation errors
        let apiError =
          result.data.errors || result.data.message || "Validasi gagal";

        if (typeof apiError === "object") {
          // If errors is an object (e.g., Laravel validation errors)
          apiError = Object.values(apiError).flat().join(", ");
        }

        setError(apiError);
        toast.error("Gagal", {
          description: apiError,
        });
      } else {
        // Success
        const successMessage = id
          ? "Data layanan berhasil diupdate"
          : "Data layanan berhasil disimpan";

        toast.success("Berhasil", {
          description: successMessage,
        });

        // Reset form only on successful creation
        if (!id) {
          form.reset();
          setIconFile(null);
          setIconPreview("");
        }

        refetch();
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);

      let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";

      // Handle different types of errors
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (typeof errors === "object") {
          errorMessage = Object.values(errors).flat().join(", ");
        } else {
          errorMessage = errors;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast.error("Gagal", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Terjadi kesalahan</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Nama Layanan <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama layanan"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      Unit <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => {
                          console.log("Unit selected:", value); // Debug log
                          field.onChange(value);
                        }}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {apiResponseUnit?.data?.map(
                            (item: { id: number; name: string }) => {
                              console.log("Unit option:", item.id, item.name); // Debug log
                              return (
                                <SelectItem
                                  key={item.id}
                                  value={String(item.id)}
                                >
                                  {item.name}
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      Harga <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukkan harga"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <textarea
                    className="border rounded p-2 w-full min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Deskripsi layanan (opsional)"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Icon upload */}
          <FormItem className="space-y-2">
            <FormLabel>Icon Layanan</FormLabel>
            <FormControl>
              <FileUploadWithPreview
                value={iconFile}
                previewUrl={iconPreview}
                onChange={(file, url) => {
                  setIconFile(file);
                  setIconPreview(url);
                  form.setValue("icon", file ? file.name : "");
                }}
                accept="image/*"
                disabled={isLoading}
                placeholder="Upload Icon"
                width={64}
                height={64}
              />
            </FormControl>
          </FormItem>
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
