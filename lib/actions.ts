"use server";

import { connectDB, isDbConfigured } from "@/lib/db";
import { Donor } from "@/lib/models/Donor";
import { CompanyLead } from "@/lib/models/CompanyLead";
import { Volunteer } from "@/lib/models/Volunteer";
import { donorSchema, companyLeadSchema, volunteerSchema } from "@/lib/validators";
import type { ZodError } from "zod";

export type FormState = {
  ok: boolean;
  message: string;
  /** Persisted to a real database, or echoed back in demo mode. */
  demo?: boolean;
  fieldErrors?: Record<string, string>;
};

/** Turn a ZodError into a flat `{ field: message }` map. */
function fieldErrorsFrom(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !out[key]) out[key] = issue.message;
  }
  return out;
}

/** Register an individual donor (Donors collection). */
export async function registerDonor(
  _prev: FormState | null,
  formData: FormData
): Promise<FormState> {
  const parsed = donorSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    amount: formData.get("amount"),
    method: formData.get("method") ?? "nequi",
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Revisa los campos marcados.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  try {
    const conn = await connectDB();
    if (!conn) {
      return {
        ok: true,
        demo: true,
        message: "¡Gracias! Recibimos tu registro (modo demostración).",
      };
    }
    await Donor.create(parsed.data);
    return {
      ok: true,
      message: "¡Gracias por tu generosidad! Tu registro quedó guardado.",
    };
  } catch (error) {
    console.error("registerDonor error:", error);
    return {
      ok: false,
      message: "Algo salió mal al guardar. Intenta de nuevo en un momento.",
    };
  }
}

/** Register a PYME alliance lead (CompanyLeads collection). */
export async function registerCompany(
  _prev: FormState | null,
  formData: FormData
): Promise<FormState> {
  const parsed = companyLeadSchema.safeParse({
    company: formData.get("company"),
    contact: formData.get("contact"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    sector: formData.get("sector"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Revisa los campos marcados.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  try {
    const conn = await connectDB();
    if (!conn) {
      return {
        ok: true,
        demo: true,
        message:
          "¡Gracias! Tu empresa quedó en la lista (modo demostración). Te contactaremos.",
      };
    }
    await CompanyLead.create(parsed.data);
    return {
      ok: true,
      message: "¡Bienvenidos! Nuestro equipo se pondrá en contacto pronto.",
    };
  } catch (error) {
    console.error("registerCompany error:", error);
    return {
      ok: false,
      message: "Algo salió mal al guardar. Intenta de nuevo en un momento.",
    };
  }
}

/** Register a volunteer who wants to offer their time and skills. */
export async function registerVolunteer(
  _prev: FormState | null,
  formData: FormData
): Promise<FormState> {
  const parsed = volunteerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    skills: formData.get("skills"),
    availability: formData.get("availability"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Revisa los campos marcados.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  try {
    const conn = await connectDB();
    if (!conn) {
      return {
        ok: true,
        demo: true,
        message: "¡Gracias! Recibimos tu mensaje (modo demostración). Te contactaremos pronto.",
      };
    }
    await Volunteer.create(parsed.data);
    return {
      ok: true,
      message: "¡Gracias! Tu oferta de ayuda quedó registrada. Nuestro equipo te contactará pronto.",
    };
  } catch (error) {
    console.error("registerVolunteer error:", error);
    return {
      ok: false,
      message: "Algo salió mal al guardar. Intenta de nuevo en un momento.",
    };
  }
}

export { isDbConfigured };
