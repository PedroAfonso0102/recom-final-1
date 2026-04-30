import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { HOME_CMS_SLUG, normalizeCmsSlug } from "./utils";
import type { CmsPageWithSections, CmsPageRow, CmsSectionRow } from "./types";
import { siteSettingsSchema, type SiteSettings } from "./schemas/site-settings.schema";

/**
 * Busca as seções de uma página.
 */
async function fetchPageSections(supabase: unknown, pageId: string, isAdmin = false): Promise<CmsSectionRow[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query = (supabase as any)
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
 * Busca apenas os slugs de páginas publicadas (para sitemap/SEO).
 */
export async function getPublishedPageSlugs(): Promise<{ slug: string }[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pages")
    .select("slug")
    .eq("status", "published");

  if (error || !data) {
    return [];
  }

  return data as { slug: string }[];
}

/**
 * Busca as configurações globais do site com fallback.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  noStore();
  const supabase = await createClient();
  // database.types is regenerated after migrations; keep this compatible before local type generation.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: siteSettingsRow } = await (supabase as any)
    .from("site_settings")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data, error } = await supabase
    .from("admin_configs")
    .select("value")
    .eq("key", "site_settings")
    .maybeSingle();

  const fallback: SiteSettings = {
    company: {
      name: "RECOM",
      shortName: "RECOM",
      fullName: "RECOM Comercio de Ferramentas LTDA",
      subtitle: "Distribuidor de ferramentas de corte",
      description: "Distribuidor B2B de ferramentas de corte, catálogos oficiais e orientação comercial para usinagem.",
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

  if (siteSettingsRow) {
    const row = siteSettingsRow as Record<string, unknown>;
    const parsed = siteSettingsSchema.safeParse({
      company: {
        name: String(row.company_name || fallback.company.name),
        shortName: String(row.company_short_name || fallback.company.shortName),
        fullName: String(row.company_full_name || row.company_name || fallback.company.fullName),
        subtitle: String(row.company_subtitle || fallback.company.subtitle),
        description: String(row.company_description || fallback.company.description),
        since: String(row.company_since || fallback.company.since),
        cnpj: typeof row.company_cnpj === "string" ? row.company_cnpj : null,
      },
      contact: {
        phone: String(row.phone || fallback.contact.phone),
        email: String(row.email || fallback.contact.email),
        whatsapp: String(row.whatsapp || fallback.contact.whatsapp),
        address: String(row.address || fallback.contact.address),
        cep: fallback.contact.cep,
      },
      links: (row.social_links as Record<string, unknown>) || fallback.links,
      seo: {
        defaultTitle: String(row.default_seo_title || fallback.seo.defaultTitle),
        defaultDescription: String(row.default_seo_description || fallback.seo.defaultDescription),
        titleTemplate: String(row.title_template || fallback.seo.titleTemplate),
        keywords: typeof row.seo_keywords === "string" ? row.seo_keywords : "",
      },
      theme: {
        primaryColor: typeof row.theme_primary_color === "string" ? row.theme_primary_color : undefined,
        secondaryColor: typeof row.theme_secondary_color === "string" ? row.theme_secondary_color : undefined,
        backgroundColor: typeof row.theme_background_color === "string" ? row.theme_background_color : undefined,
        textColor: typeof row.theme_text_color === "string" ? row.theme_text_color : undefined,
        buttonColor: typeof row.theme_button_color === "string" ? row.theme_button_color : undefined,
        buttonHoverColor: typeof row.theme_button_hover_color === "string" ? row.theme_button_hover_color : undefined,
        headingFont: typeof row.theme_heading_font === "string" ? row.theme_heading_font : undefined,
        bodyFont: typeof row.theme_body_font === "string" ? row.theme_body_font : undefined,
        fontWeight: typeof row.theme_font_weight === "string" ? row.theme_font_weight : undefined,
        headingSize: typeof row.theme_heading_size === "string" ? row.theme_heading_size : undefined,
        bodySize: typeof row.theme_body_size === "string" ? row.theme_body_size : undefined,
      }
    });

    if (parsed.success) {
      return parsed.data;
    }
  }

  if (error || !data || !data.value) {
    return fallback;
  }

  const parsed = siteSettingsSchema.safeParse(data.value);
  return parsed.success ? parsed.data : fallback;
}
