import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { HOME_CMS_SLUG, normalizeCmsSlug } from "./utils";
import type { CmsPageWithSections, CmsPageRow, CmsSectionRow } from "./types";
import { siteSettingsSchema, type SiteSettings } from "./schemas/site-settings.schema";

/**
 * Busca as seções de uma página.
 */
async function fetchPageSections(supabase: any, pageId: string, isAdmin = false): Promise<CmsSectionRow[]> {
  const query = supabase
    .from("page_sections")
    .select("*")
    .eq("page_id", pageId)
    .order("sort_order", { ascending: true });

  const { data, error } = isAdmin
    ? await query
    : await query.eq("status", "published").eq("visibility", "visible");

  if (error || !data) {
    return [];
  }

  return data as CmsSectionRow[];
}

/**
 * Busca uma página e suas seções pelo slug.
 * Suporta modo público (createClient) ou admin/preview (createAdminClient).
 */
export async function getPageBySlug(
  slug: string, 
  options: { preview?: boolean; isAdmin?: boolean } = {}
): Promise<CmsPageWithSections | null> {
  noStore();
  const normalizedSlug = normalizeCmsSlug(slug);
  const useAdmin = options.preview || options.isAdmin;
  const supabase = useAdmin ? createAdminClient() : await createClient();
  
  const query = supabase
    .from("pages")
    .select("*")
    .eq("slug", normalizedSlug);

  const { data: page, error } = useAdmin
    ? await query.maybeSingle()
    : await query.eq("status", "published").maybeSingle();

  if (error || !page) {
    return null;
  }

  const sections = await fetchPageSections(supabase, page.id, useAdmin);

  return {
    page: page as CmsPageRow,
    sections,
  };
}

/**
 * Busca a página Home (slug padrão).
 */
export async function getHomePage(preview = false) {
  return getPageBySlug(HOME_CMS_SLUG, { preview });
}

/**
 * Lista todas as páginas (apenas admin).
 */
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

/**
 * Busca as configurações globais do site com fallback.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  noStore();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admin_configs")
    .select("value")
    .eq("key", "site_settings")
    .maybeSingle();

  const fallback: SiteSettings = {
    company: {
      name: "RECOM",
      fullName: "RECOM Comercio de Ferramentas LTDA",
      subtitle: "Distribuidor de ferramentas de corte",
      since: "1990",
    },
    contact: {
      phone: "+55 (19) 3256-4235",
      email: "vendas@recom-carbide.com.br",
      whatsapp: "551932564235",
      address: "R. Carolina Florence, 1077 - Vila Nova, Campinas - SP",
      cep: "13073-225",
    },
    links: {
      linkedin: "https://linkedin.com/company/recom-metal-duro",
    },
    seo: {
      defaultTitle: "RECOM | Metal Duro e Ferramentas de Corte",
      defaultDescription: "Especialista em processos de usinagem industrial.",
      titleTemplate: "%s | RECOM",
    },
  };

  if (error || !data || !data.value) {
    return fallback;
  }

  const parsed = siteSettingsSchema.safeParse(data.value);
  return parsed.success ? parsed.data : fallback;
}
