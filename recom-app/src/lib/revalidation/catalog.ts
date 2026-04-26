import { revalidatePath } from "next/cache";

export function revalidateSupplierCatalog(slug?: string) {
  revalidatePath("/");
  revalidatePath("/fornecedores");
  revalidatePath("/admin/fornecedores");

  if (slug) {
    revalidatePath(`/fornecedores/${slug}`);
  }
}

export function revalidateProcessCatalog(slug?: string) {
  revalidatePath("/");
  revalidatePath("/processos");
  revalidatePath("/admin/processos");

  if (slug) {
    revalidatePath(`/processos/${slug}`);
  }
}

export function revalidatePromotionCatalog(slug?: string) {
  revalidatePath("/");
  revalidatePath("/promocoes");
  revalidatePath("/admin/promocoes");

  if (slug) {
    revalidatePath(`/promocoes/${slug}`);
  }
}
