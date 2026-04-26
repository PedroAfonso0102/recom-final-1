import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeCmsSlug } from "@/cms/utils";
import type { CmsPageRow, CmsPageWithSections, CmsSectionRow } from "@/cms/types";

async function fetchPageSections(pageId: string, preview = false): Promise<CmsSectionRow[]> {
  const supabase = preview ? createAdminClient() : await createClient();
  const query = supabase
    .from("page_sections")
    .select("*")
    .eq("page_id", pageId)
    .order("sort_order", { ascending: true });

  const { data, error } = preview
    ? await query
    : await query.eq("status", "published").eq("visibility", "visible");

  if (error || !data) {
    return [];
  }

  return data as CmsSectionRow[];
}

export async function getPublicCmsPageBySlug(slug: string): Promise<CmsPageWithSections | null> {
  noStore();
  const normalizedSlug = normalizeCmsSlug(slug);
  const supabase = await createClient();

  const { data: page, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", normalizedSlug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !page) {
    return null;
  }

  const sections = await fetchPageSections(page.id, false);
  return {
    page: page as CmsPageRow,
    sections,
  };
}

export async function getAdminCmsPageById(id: string): Promise<CmsPageWithSections | null> {
  noStore();
  const supabase = createAdminClient();

  const { data: page, error } = await supabase.from("pages").select("*").eq("id", id).maybeSingle();

  if (error || !page) {
    return null;
  }

  const sections = await fetchPageSections(page.id, true);
  return {
    page: page as CmsPageRow,
    sections,
  };
}

export async function getAdminCmsPageBySlug(slug: string): Promise<CmsPageWithSections | null> {
  noStore();
  const normalizedSlug = normalizeCmsSlug(slug);
  const supabase = createAdminClient();

  const { data: page, error } = await supabase.from("pages").select("*").eq("slug", normalizedSlug).maybeSingle();

  if (error || !page) {
    return null;
  }

  const sections = await fetchPageSections(page.id, true);
  return {
    page: page as CmsPageRow,
    sections,
  };
}

export async function listCmsPages(): Promise<CmsPageRow[]> {
  noStore();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as CmsPageRow[];
}

