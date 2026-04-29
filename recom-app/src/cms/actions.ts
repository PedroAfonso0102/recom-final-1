"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/utils";
import { siteSettingsSchema, type SiteSettings } from "./schemas/site-settings.schema";
import { revalidatePath } from "next/cache";
import { createAuditLog } from "@/lib/audit";
import type { Json } from "@/lib/database.types";

const SITE_SETTINGS_KEY = "site_settings";

function asSocialLinks(value: Json): SiteSettings["links"] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { instagram: "", linkedin: "", facebook: "" };
  }

  return {
    instagram: typeof value.instagram === "string" ? value.instagram : "",
    linkedin: typeof value.linkedin === "string" ? value.linkedin : "",
    facebook: typeof value.facebook === "string" ? value.facebook : "",
  };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = createAdminClient();
  
  // Try site_settings table first (new schema)
  const { data: siteSettingsRow } = await supabase
    .from("site_settings")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (siteSettingsRow) {
    const row = siteSettingsRow;
    // Map database columns to Zod schema
    const mapped: SiteSettings = {
      company: {
        name: row.company_name || "RECOM",
        fullName: row.company_full_name || row.company_name,
        subtitle: row.company_subtitle || "Distribuidor de ferramentas de corte",
        since: row.company_since || "1990",
        cnpj: row.company_cnpj,
        description: row.company_description || "Distribuidor B2B de ferramentas de corte, catálogos oficiais e orientação comercial para usinagem.",
        shortName: row.company_short_name || row.company_name,
      },
      contact: {
        phone: row.phone || "+55 (19) 3256-4235",
        email: row.email || "vendas@recom-carbide.com.br",
        whatsapp: row.whatsapp || "",
        address: row.address || "R. Carolina Florence, 1077 - Vila Nova, Campinas - SP",
        cep: row.cep || "13000-000",
      },
      links: asSocialLinks(row.social_links),
      seo: {
        defaultTitle: row.default_seo_title || "RECOM | Metal Duro e Ferramentas de Corte",
        defaultDescription: row.default_seo_description || "Distribuidor B2B de ferramentas de corte, catálogos oficiais e orientação comercial para usinagem.",
        titleTemplate: row.title_template || "%s | RECOM",
        keywords: row.seo_keywords || "",
      },
    };

    const parsed = siteSettingsSchema.safeParse(mapped);
    if (parsed.success) return parsed.data;
    console.error("Schema validation failed for site settings:", parsed.error);
  }

  // Fallback to legacy admin_configs (JSON value)
  const { data, error } = await supabase
    .from("admin_configs")
    .select("value")
    .eq("key", SITE_SETTINGS_KEY)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const parsed = siteSettingsSchema.safeParse(data.value);
  return parsed.success ? parsed.data : null;
}

export async function updateSiteSettings(settings: SiteSettings) {
  try {
    const auth = await requireAdmin();
    const supabase = createAdminClient();

    // 1. Update legacy admin_configs for backward compatibility
    const legacyData = {
      company_name: settings.company.name,
      company_short_name: settings.company.shortName,
      company_description: settings.company.description,
      contact_email: settings.contact.email,
      contact_phone: settings.contact.phone,
      contact_address: settings.contact.address,
      social_instagram: settings.links.instagram,
      social_linkedin: settings.links.linkedin,
      social_youtube: settings.links.facebook, // Mapping facebook to youtube legacy or just use links
      seo_title_default: settings.seo.defaultTitle,
      seo_description_default: settings.seo.defaultDescription,
      seo_keywords_default: settings.seo.keywords,
      updated_at: new Date().toISOString(),
    };

    await supabase
      .from("admin_configs")
      .upsert(
        {
          key: SITE_SETTINGS_KEY,
          value: settings as unknown as Json,
          ...legacyData,
        },
        { onConflict: "key" }
      );

    // 2. Update new site_settings table
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    const siteSettingsData = {
      company_name: settings.company.name,
      company_short_name: settings.company.shortName,
      company_full_name: settings.company.fullName,
      company_description: settings.company.description,
      company_subtitle: settings.company.subtitle,
      company_since: settings.company.since,
      company_cnpj: settings.company.cnpj,
      email: settings.contact.email,
      phone: settings.contact.phone,
      whatsapp: settings.contact.whatsapp,
      address: settings.contact.address,
      cep: settings.contact.cep,
      social_links: settings.links,
      default_seo_title: settings.seo.defaultTitle,
      default_seo_description: settings.seo.defaultDescription,
      seo_keywords: settings.seo.keywords,
      title_template: settings.seo.titleTemplate,
      updated_at: new Date().toISOString(),
    };

    const { error: newError } = await supabase
      .from("site_settings")
      .upsert(
        existing ? { id: existing.id, ...siteSettingsData } : siteSettingsData,
        { onConflict: 'id' }
      );

    if (newError) {
      console.error("Error updating site_settings:", newError);
      return { ok: false, formError: newError.message };
    }

    // 3. Log audit entry
    try {
      await createAuditLog({
        action: "update_site_settings",
        entity_type: "site_settings",
        entity_id: existing?.id || "global",
        user_id: auth.id,
        details: {
          new_settings: settings as unknown as Json,
        },
      });
    } catch (auditError) {
      console.error("Failed to create audit log:", auditError);
    }

    revalidatePath("/admin/configuracoes");
    revalidatePath("/", "layout");
    return { ok: true, message: "Configurações atualizadas com sucesso." };
  } catch (error: unknown) {
    console.error("Critical error in updateSiteSettings:", error);
    return { ok: false, formError: error instanceof Error ? error.message : "Erro interno no servidor" };
  }
}
