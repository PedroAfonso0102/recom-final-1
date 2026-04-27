"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAuth } from "@/lib/auth/utils";
import { siteSettingsSchema, type SiteSettings } from "../schemas/site-settings.schema";
import { revalidatePath } from "next/cache";

const SITE_SETTINGS_KEY = "site_settings";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("admin_configs")
    .select("value")
    .eq("key", SITE_SETTINGS_KEY)
    .single();

  if (error || !data) {
    return null;
  }

  const parsed = siteSettingsSchema.safeParse(data.value);
  return parsed.success ? parsed.data : null;
}

export async function updateSiteSettings(input: unknown) {
  const auth = await requireAuth();
  const parsed = siteSettingsSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("admin_configs")
    .upsert({
      key: SITE_SETTINGS_KEY,
      value: parsed.data,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' });

  if (error) {
    return { ok: false, formError: error.message };
  }

  revalidatePath("/", "layout");
  return { ok: true, message: "Configurações atualizadas com sucesso." };
}
