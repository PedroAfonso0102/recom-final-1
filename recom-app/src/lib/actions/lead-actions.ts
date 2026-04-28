"use server";

import { revalidatePath } from "next/cache";
import { createLead } from "../services/lead-service";

function composeLeadMessage(formData: FormData) {
  const message = (formData.get("message") as string) || "";
  const itemCode = (formData.get("itemCode") as string) || "";

  const contextLines = [
    itemCode ? `Código / item desejado: ${itemCode}` : "",
  ].filter(Boolean);

  return [message, ...contextLines].filter(Boolean).join("\n\n");
}

export async function submitContactForm(formData: FormData) {
  const name = String(formData.get("name") || "");
  const company = String(formData.get("company") || "");
  const email = String(formData.get("email") || "");
  const phone = String(formData.get("phone") || "");
  const sourcePage = String(formData.get("sourcePage") || "/sobre");

  const result = await createLead({
    name,
    company,
    email,
    phone,
    supplierInterest: (formData.get("supplierInterest") as string) || undefined,
    processInterest: (formData.get("processInterest") as string) || undefined,
    itemCode: (formData.get("itemCode") as string) || undefined,
    message: composeLeadMessage(formData),
    sourcePage,
    sourceType: (formData.get("sourceType") as "contact" | "supplier" | "process" | "promotion" | "general") || "contact",
  });

  if (result.success) {
    revalidatePath("/admin/leads");
    return { success: true };
  }

  return { success: false, error: result.error };
}
