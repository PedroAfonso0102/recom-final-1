import { revalidatePath } from "next/cache";
import { HOME_CMS_SLUG } from "@/cms/utils";

export function revalidateCmsPaths(slug: string, pageId?: string) {
  const publicPath = slug === HOME_CMS_SLUG ? "/" : `/${slug}`;

  revalidatePath("/");
  revalidatePath(publicPath);
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/new");
  revalidatePath(`/admin/preview/${slug}`);

  if (pageId) {
    revalidatePath(`/admin/pages/${pageId}`);
    revalidatePath(`/admin/pages/${pageId}/sections`);
  }
}

