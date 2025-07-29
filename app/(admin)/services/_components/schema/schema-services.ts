import { z } from "zod";

const requiredString = z.string().trim().min(1, "Harus diisi");
const requiredNumber = z.number().min(1, "Harus diisi");

export const schemaServices = z.object({
  name: requiredString,
  unit: requiredString,
  price: requiredNumber,
  description: requiredString,
  icon: requiredString,
});
export type SchemaServices = z.infer<typeof schemaServices>;