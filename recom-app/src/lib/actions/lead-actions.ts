"use server";

import { revalidatePath } from "next/cache";
import { createLead } from "../services/lead-service";

function composeLeadMessage(formData: FormData) {
  const message = (formData.get("message") as string) || "";
  const supplierInterest = (formData.get("supplierInterest") as string) || "";
  const processInterest = (formData.get("processInterest") as string) || "";
  const itemCode = (formData.get("itemCode") as string) || "";

  const contextLines = [
    supplierInterest ? `Fornecedor de interesse: ${supplierInterest}` : "",
    processInterest ? `Processo / aplicação: ${processInterest}` : "",
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
    message: composeLeadMessage(formData),
    sourcePage,
  });

  if (result.success) {
    revalidatePath("/admin/leads");
    return { success: true };
  }

  return { success: false, error: result.error };
}
