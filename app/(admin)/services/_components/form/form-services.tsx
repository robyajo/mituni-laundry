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
import { SchemaServices } from "../schema/schema-services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaServices } from "../schema/schema-services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import FileUploadWithPreview from "@/app/(admin)/_components/file-upload-with-preview";
import { useSession } from "next-auth/react";

export default function FormServices() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>("");
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

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
      form.setValue("icon", file.name); // Atur sesuai kebutuhan API
    }
  };

  const onSubmit = async (data: SchemaServices) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await axios.post(
        `${API_URL}/api/services`,
        {
          branch_id: session?.data?.outlet_id_active,
          name: data.name,
          unit: data.unit,
          price: data.price,
          description: data.description,
          icon: iconFile ? iconFile.name : "",
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
      if (result?.data?.error) {
        toast.error(result.data.error);
        setError(result.data.error);
      } else {
        toast.success("Data layanan berhasil disimpan");
        router.push("/dashboard");
        router.refresh();
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
            <div className="col-span-1 ">
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
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih unit" />
                        </SelectTrigger>
                        <SelectContent className="space-y-2">
                          <SelectItem value="per kg">per kg</SelectItem>
                          <SelectItem value="per item">per item</SelectItem>
                          <SelectItem value="per set">per set</SelectItem>
                          <SelectItem value="per meter">per meter</SelectItem>
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
                    className="border rounded p-2 w-full min-h-[60px]"
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
            Simpan
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
