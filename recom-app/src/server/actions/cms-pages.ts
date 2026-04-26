"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAuth } from "@/lib/auth/utils";
import { revalidateCmsPaths } from "@/lib/revalidation/cms";
import { getComponentDefinition } from "@/cms/component-registry";
import { cmsCreatePageSchema, cmsUpdatePageSchema } from "@/cms/schemas/page.schema";
import { cmsCreateSectionSchema, cmsPublishPageSchema, cmsReorderSectionsSchema, cmsUpdateSectionSchema } from "@/cms/schemas/section.schema";
import type { ActionResult, CmsPageRow, CmsSectionRow } from "@/cms/types";

function toFieldErrors(error: z.ZodError) {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    fieldErrors[key] = fieldErrors[key] ?? [];
    fieldErrors[key].push(issue.message);
  }

  return fieldErrors;
}

function optionalText(value: string | null | undefined) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeSectionProps(componentType: string, props: Record<string, unknown>) {
  const definition = getComponentDefinition(componentType);

  if (!definition) {
    return {
      ok: false as const,
      error: `Bloco não registrado: ${componentType}`,
    };
  }

  const parsed = definition.schema.safeParse(props);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.flatten(),
    };
  }

  return {
    ok: true as const,
    data: parsed.data,
  };
}

async function getPageSections(supabase: ReturnType<typeof createAdminClient>, pageId: string) {
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

export async function createPage(input: unknown): Promise<ActionResult<CmsPageRow>> {
  const auth = await requireAuth();
  const parsed = cmsCreatePageSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = createAdminClient();
  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    description: optionalText(parsed.data.description),
    status: parsed.data.status,
    seo_title: optionalText(parsed.data.seoTitle),
    seo_description: optionalText(parsed.data.seoDescription),
    og_image_url: optionalText(parsed.data.ogImageUrl),
    created_by: auth.id,
    updated_by: auth.id,
  };

  const { data, error } = await supabase.from("pages").insert(payload).select("*").single();

  if (error || !data) {
    return { ok: false, formError: error?.message ?? "Não foi possível criar a página." };
  }

  revalidateCmsPaths(data.slug, data.id);
  return { ok: true, data: data as CmsPageRow, message: "Página criada." };
}

export async function updatePage(input: unknown): Promise<ActionResult<CmsPageRow>> {
  const auth = await requireAuth();
  const parsed = cmsUpdatePageSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = createAdminClient();
  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    description: optionalText(parsed.data.description),
    status: parsed.data.status,
    seo_title: optionalText(parsed.data.seoTitle),
    seo_description: optionalText(parsed.data.seoDescription),
    og_image_url: optionalText(parsed.data.ogImageUrl),
    updated_by: auth.id,
  };

  const { data, error } = await supabase
    .from("pages")
    .update(payload)
    .eq("id", parsed.data.id)
    .select("*")
    .single();

  if (error || !data) {
    return { ok: false, formError: error?.message ?? "Não foi possível atualizar a página." };
  }

  revalidateCmsPaths(data.slug, data.id);
  return { ok: true, data: data as CmsPageRow, message: "Página atualizada." };
}

export async function createSection(input: unknown): Promise<ActionResult<CmsSectionRow>> {
  const auth = await requireAuth();
  const parsed = cmsCreateSectionSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const definition = normalizeSectionProps(parsed.data.componentType, parsed.data.props as Record<string, unknown>);

  if (!definition.ok) {
    if (typeof definition.error !== "string") {
      return { ok: false, fieldErrors: definition.error.fieldErrors as Record<string, string[]> };
    }

    return { ok: false, formError: definition.error };
  }

  const supabase = createAdminClient();
  const payload = {
    page_id: parsed.data.pageId,
    component_type: parsed.data.componentType,
    props: definition.data,
    sort_order: parsed.data.sortOrder,
    status: parsed.data.status,
    visibility: parsed.data.visibility,
    anchor_id: optionalText(parsed.data.anchorId),
    created_by: auth.id,
    updated_by: auth.id,
  };

  const { data, error } = await supabase.from("page_sections").insert(payload).select("*").single();

  if (error || !data) {
    return { ok: false, formError: error?.message ?? "Não foi possível criar a seção." };
  }

  const page = await supabase.from("pages").select("slug").eq("id", parsed.data.pageId).maybeSingle();
  if (page.data?.slug) {
    revalidateCmsPaths(page.data.slug, parsed.data.pageId);
  }

  return { ok: true, data: data as CmsSectionRow, message: "Seção criada." };
}

export async function updateSection(input: unknown): Promise<ActionResult<CmsSectionRow>> {
  const auth = await requireAuth();
  const parsed = cmsUpdateSectionSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const definition = normalizeSectionProps(parsed.data.componentType, parsed.data.props as Record<string, unknown>);

  if (!definition.ok) {
    if (typeof definition.error !== "string") {
      return { ok: false, fieldErrors: definition.error.fieldErrors as Record<string, string[]> };
    }

    return { ok: false, formError: definition.error };
  }

  const supabase = createAdminClient();
  const payload = {
    page_id: parsed.data.pageId,
    component_type: parsed.data.componentType,
    props: definition.data,
    sort_order: parsed.data.sortOrder,
    status: parsed.data.status,
    visibility: parsed.data.visibility,
    anchor_id: optionalText(parsed.data.anchorId),
    updated_by: auth.id,
  };

  const { data, error } = await supabase
    .from("page_sections")
    .update(payload)
    .eq("id", parsed.data.id)
    .select("*")
    .single();

  if (error || !data) {
    return { ok: false, formError: error?.message ?? "Não foi possível atualizar a seção." };
  }

  const page = await supabase.from("pages").select("slug").eq("id", parsed.data.pageId).maybeSingle();
  if (page.data?.slug) {
    revalidateCmsPaths(page.data.slug, parsed.data.pageId);
  }

  return { ok: true, data: data as CmsSectionRow, message: "Seção atualizada." };
}

export async function reorderSections(input: unknown): Promise<ActionResult<true>> {
  await requireAuth();
  const parsed = cmsReorderSectionsSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = createAdminClient();

  for (let index = 0; index < parsed.data.orderedSectionIds.length; index += 1) {
    const sectionId = parsed.data.orderedSectionIds[index];
    const { error } = await supabase
      .from("page_sections")
      .update({ sort_order: index })
      .eq("id", sectionId)
      .eq("page_id", parsed.data.pageId);

    if (error) {
      return { ok: false, formError: error.message };
    }
  }

  const page = await supabase.from("pages").select("slug").eq("id", parsed.data.pageId).maybeSingle();
  if (page.data?.slug) {
    revalidateCmsPaths(page.data.slug, parsed.data.pageId);
  }

  return { ok: true, data: true, message: "Seções reordenadas." };
}

export async function publishPage(input: unknown): Promise<ActionResult<true>> {
  const auth = await requireAuth();
  const parsed = cmsPublishPageSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = createAdminClient();
  const { data: page, error: pageError } = await supabase.from("pages").select("*").eq("id", parsed.data.pageId).maybeSingle();

  if (pageError || !page) {
    return { ok: false, formError: pageError?.message ?? "Página não encontrada." };
  }

  const sections = await getPageSections(supabase, page.id);

  if (sections.length === 0) {
    return { ok: false, formError: "Adicione ao menos uma seção antes de publicar." };
  }

  for (const section of sections) {
    const definition = normalizeSectionProps(section.component_type, (section.props ?? {}) as Record<string, unknown>);

    if (!definition.ok) {
      return { ok: false, formError: `A seção ${section.component_type} está inválida e bloqueou a publicação.` };
    }
  }

  const { data: versionRows, error: versionError } = await supabase
    .from("page_versions")
    .select("version_number")
    .eq("page_id", page.id)
    .order("version_number", { ascending: false })
    .limit(1);

  if (versionError) {
    return { ok: false, formError: versionError.message };
  }

  const nextVersion = (versionRows?.[0]?.version_number ?? 0) + 1;
  const snapshot = {
    page,
    sections,
    publishedAt: new Date().toISOString(),
    versionNumber: nextVersion,
  };

  const { error: versionInsertError } = await supabase.from("page_versions").insert({
    page_id: page.id,
    version_number: nextVersion,
    snapshot,
    created_by: auth.id,
  });

  if (versionInsertError) {
    return { ok: false, formError: versionInsertError.message };
  }

  const { error: pageUpdateError } = await supabase
    .from("pages")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
      updated_by: auth.id,
    })
    .eq("id", page.id);

  if (pageUpdateError) {
    return { ok: false, formError: pageUpdateError.message };
  }

  const sectionIds = sections.map((section) => section.id);
  const { error: sectionsUpdateError } = await supabase
    .from("page_sections")
    .update({
      status: "published",
      updated_by: auth.id,
    })
    .in("id", sectionIds);

  if (sectionsUpdateError) {
    return { ok: false, formError: sectionsUpdateError.message };
  }

  revalidateCmsPaths(page.slug, page.id);
  return { ok: true, data: true, message: "Página publicada." };
}
