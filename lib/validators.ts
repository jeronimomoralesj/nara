import { z } from "zod";

/** Individual donor registration. */
export const donorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Cuéntanos tu nombre")
    .max(120),
  email: z.string().trim().toLowerCase().email("Correo no válido"),
  phone: z
    .string()
    .trim()
    .min(7, "Número no válido")
    .max(40),
  amount: z.coerce
    .number()
    .min(1000, "El monto mínimo es $1.000 COP"),
  method: z.enum(["nequi", "daviplata", "otro"]).default("nequi"),
  message: z.string().trim().max(600).optional().or(z.literal("")),
});

export type DonorInput = z.infer<typeof donorSchema>;

/** PYME / company alliance lead. */
export const companyLeadSchema = z.object({
  company: z.string().trim().min(2, "Nombre de la empresa").max(160),
  contact: z.string().trim().min(2, "Nombre del contacto").max(120),
  email: z.string().trim().toLowerCase().email("Correo no válido"),
  phone: z.string().trim().min(7, "Celular no válido").max(40),
  sector: z.string().trim().min(2, "Selecciona un sector").max(80),
});

export type CompanyLeadInput = z.infer<typeof companyLeadSchema>;
