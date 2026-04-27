import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeCmsSlug } from "@/cms/utils";
import type { CmsPageRow, CmsPageWithSections, CmsSectionRow } from "@/cms/types";

async function fetchPageSections(supabase: ReturnType<typeof createAdminClient>, pageId: string): Promise<CmsSectionRow[]> {
  const { data, error } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_id", pageId)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as CmsSectionRow[];
}

async function fetchAdminPageWithSections(pageFilter: {
  by: "id" | "slug";
  value: string;
}): Promise<CmsPageWithSections | null> {
  noStore();

  const supabase = createAdminClient();
  const query = supabase.from("pages").select("*");

  const { data: page, error } =
    pageFilter.by === "id"
      ? await query.eq("id", pageFilter.value).maybeSingle()
      : await query.eq("slug", normalizeCmsSlug(pageFilter.value)).maybeSingle();

  if (error || !page) {
    return null;
  }

  const sections = await fetchPageSections(supabase, page.id);

  return {
    page: page as CmsPageRow,
    sections,
  };
}

export async function listCmsPages(): Promise<CmsPageRow[]> {
  noStore();

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("pages").select("*").order("updated_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as CmsPageRow[];
}

export async function getAdminCmsPageById(id: string): Promise<CmsPageWithSections | null> {
  return fetchAdminPageWithSections({ by: "id", value: id });
}

export async function getAdminCmsPageBySlug(slug: string): Promise<CmsPageWithSections | null> {
  return fetchAdminPageWithSections({ by: "slug", value: slug });
}
