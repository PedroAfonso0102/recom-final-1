"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/utils";
import { createAuditLog } from "@/lib/audit";
import { revalidateCmsPaths } from "@/lib/revalidation/cms";
import { getComponentDefinition } from "@/cms/component-registry";
import { assertSectionAllowedForPage } from "@/cms/section-governance";
import { cmsCreatePageSchema, cmsUpdatePageSchema } from "@/cms/schemas/page.schema";
import { cmsCreateSectionSchema, cmsPublishPageSchema, cmsReorderSectionsSchema, cmsUpdateSectionSchema } from "@/cms/schemas/section.schema";
import type { ActionResult, CmsPageRow, CmsRevisionRow, CmsSectionRow } from "@/cms/types";

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
      success: false as const,
      formError: `Bloco nÃ£o registrado: ${componentType}`,
    };
  }

  const parsed = definition.schema.safeParse(props);

  if (!parsed.success) {
    return {
      success: false as const,
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  return {
    success: true as const,
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
  const auth = await requireAdmin();
  const parsed = cmsCreatePageSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = createAdminClient();
  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    route_pattern: optionalText(parsed.data.routePattern) || parsed.data.slug,
    page_type: parsed.data.pageType,
    template_key: optionalText(parsed.data.templateKey),
    is_system: parsed.data.isSystem,
    is_dynamic_template: parsed.data.isDynamicTemplate,
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
    return { success: false, formError: error?.message ?? "NÃ£o foi possÃ­vel criar a pÃ¡gina." };
  }

  revalidateCmsPaths(data.slug, data.id);

  // Log action
  await createAuditLog({
    action: "page.created",
    entity_type: "page",
    entity_id: data.id,
    details: { slug: data.slug, title: data.title },
    user_id: auth.id
  });

  return { success: true, data: data as CmsPageRow, message: "PÃ¡gina criada." };
}

export async function updatePage(input: unknown): Promise<ActionResult<CmsPageRow>> {
  const auth = await requireAdmin();
  const parsed = cmsUpdatePageSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = createAdminClient();
  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    route_pattern: optionalText(parsed.data.routePattern) || parsed.data.slug,
    page_type: parsed.data.pageType,
    template_key: optionalText(parsed.data.templateKey),
    is_system: parsed.data.isSystem,
    is_dynamic_template: parsed.data.isDynamicTemplate,
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
    return { success: false, formError: error?.message ?? "NÃ£o foi possÃ­vel atualizar a pÃ¡gina." };
  }

  revalidateCmsPaths(data.slug, data.id);

  // Log action
  await createAuditLog({
    action: "page.updated",
    entity_type: "page",
    entity_id: data.id,
    details: { slug: data.slug, title: data.title },
    user_id: auth.id
  });

  return { success: true, data: data as CmsPageRow, message: "PÃ¡gina atualizada." };
}

export async function createSection(input: unknown): Promise<ActionResult<CmsSectionRow>> {
  const auth = await requireAdmin();
  const parsed = cmsCreateSectionSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const definition = normalizeSectionProps(parsed.data.componentType, parsed.data.props as Record<string, unknown>);

  if (!definition.success) {
    return definition;
  }

  const supabase = createAdminClient();
  const pageResult = await supabase
    .from("pages")
    .select("id, slug, template_key")
    .eq("id", parsed.data.pageId)
    .maybeSingle();

  if (pageResult.error || !pageResult.data) {
    return { success: false, formError: pageResult.error?.message ?? "PÃƒÂ¡gina nÃƒÂ£o encontrada." };
  }

  const governance = assertSectionAllowedForPage({
    page: pageResult.data,
    componentType: parsed.data.componentType,
  });

  if (!governance.success) {
    return { success: false, formError: governance.message };
  }

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
    return { success: false, formError: error?.message ?? "NÃ£o foi possÃ­vel criar a seÃ§Ã£o." };
  }

  if (pageResult.data.slug) {
    revalidateCmsPaths(pageResult.data.slug, parsed.data.pageId);
  }
  await createAuditLog({
    action: "section.created",
    entity_type: "section",
    entity_id: data.id,
    details: { page_id: parsed.data.pageId, component_type: data.component_type },
    user_id: auth.id,
  });



  return { success: true, data: data as CmsSectionRow, message: "Seção criada." };
}

export async function updateSection(input: unknown): Promise<ActionResult<CmsSectionRow>> {
  const auth = await requireAdmin();
  const parsed = cmsUpdateSectionSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const definition = normalizeSectionProps(parsed.data.componentType, parsed.data.props as Record<string, unknown>);

  if (!definition.success) {
    return definition;
  }

  const supabase = createAdminClient();
  const pageResult = await supabase
    .from("pages")
    .select("id, slug, template_key")
    .eq("id", parsed.data.pageId)
    .maybeSingle();

  if (pageResult.error || !pageResult.data) {
    return { success: false, formError: pageResult.error?.message ?? "PÃƒÂ¡gina nÃƒÂ£o encontrada." };
  }

  const governance = assertSectionAllowedForPage({
    page: pageResult.data,
    componentType: parsed.data.componentType,
  });

  if (!governance.success) {
    return { success: false, formError: governance.message };
  }

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
    return { success: false, formError: error?.message ?? "NÃ£o foi possÃ­vel atualizar a seÃ§Ã£o." };
  }

  if (pageResult.data.slug) {
    revalidateCmsPaths(pageResult.data.slug, parsed.data.pageId);
  }

  await createAuditLog({
    action: "section.updated",
    entity_type: "section",
    entity_id: data.id,
    details: { page_id: parsed.data.pageId, component_type: data.component_type },
    user_id: auth.id,
  });



  return { success: true, data: data as CmsSectionRow, message: "Secao atualizada." };
}

export async function reorderSections(input: unknown): Promise<ActionResult<true>> {
  const auth = await requireAdmin();
  const parsed = cmsReorderSectionsSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, fieldErrors: toFieldErrors(parsed.error) };
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
      return { success: false, formError: error.message };
    }
  }

  const page = await supabase.from("pages").select("slug").eq("id", parsed.data.pageId).maybeSingle();
  if (page.data?.slug) {
    revalidateCmsPaths(page.data.slug, parsed.data.pageId);
  }

  await createAuditLog({
    action: "section.reordered",
    entity_type: "page",
    entity_id: parsed.data.pageId,
    details: { section_count: parsed.data.orderedSectionIds.length },
    user_id: auth.id,
  });

  return { success: true, data: true, message: "SeÃ§Ãµes reordenadas." };
}

export async function publishPage(input: unknown): Promise<ActionResult<true>> {
  const auth = await requireAdmin();
  const parsed = cmsPublishPageSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = createAdminClient();
  const { data: page, error: pageError } = await supabase.from("pages").select("*").eq("id", parsed.data.pageId).maybeSingle();

  if (pageError || !page) {
    return { success: false, formError: pageError?.message ?? "PÃ¡gina nÃ£o encontrada." };
  }

  const sections = await getPageSections(supabase, page.id);

  if (sections.length === 0) {
    return { success: false, formError: "Adicione ao menos uma seÃ§Ã£o antes de publicar." };
  }

  for (const section of sections) {
    const governance = assertSectionAllowedForPage({
      page,
      componentType: section.component_type,
    });

    if (!governance.success) {
      return { success: false, formError: governance.message };
    }

    const definition = normalizeSectionProps(section.component_type, (section.props ?? {}) as Record<string, unknown>);

    if (!definition.success) {
      return { success: false, formError: `A seÃ§Ã£o ${section.component_type} estÃ¡ invÃ¡lida e bloqueou a publicaÃ§Ã£o.` };
    }
  }

  const { data: versionRows, error: versionError } = await supabase
    .from("page_versions")
    .select("version_number")
    .eq("page_id", page.id)
    .order("version_number", { ascending: false })
    .limit(1);

  if (versionError) {
    return { success: false, formError: versionError.message };
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
    return { success: false, formError: versionInsertError.message };
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
    return { success: false, formError: pageUpdateError.message };
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
    return { success: false, formError: sectionsUpdateError.message };
  }

  revalidateCmsPaths(page.slug, page.id);

  // Log action
  await createAuditLog({
    action: "page.published",
    entity_type: "page",
    entity_id: page.id,
    details: { slug: page.slug, title: page.title, version: nextVersion },
    user_id: auth.id
  });

  return { success: true, data: true, message: "PÃ¡gina publicada." };
}
export async function archivePage(id: string): Promise<ActionResult<true>> {
  const auth = await requireAdmin();
  const supabase = createAdminClient();

  // Protect system pages from being archived/deleted easily
  const { data: page } = await supabase.from("pages").select("is_system, slug").eq("id", id).single();
  
  if (page?.is_system) {
    return { success: false, formError: "PÃ¡ginas de sistema nÃ£o podem ser arquivadas." };
  }

  const { error } = await supabase
    .from("pages")
    .update({ 
      status: "archived",
      updated_by: auth.id 
    })
    .eq("id", id);

  if (error) {
    return { success: false, formError: error.message };
  }

  if (page?.slug) {
    revalidateCmsPaths(page.slug, id);
  }

  // Log action
  await createAuditLog({
    action: "page.archived",
    entity_type: "page",
    entity_id: id,
    details: { slug: page?.slug },
    user_id: auth.id
  });

  return { success: true, data: true, message: "PÃ¡gina arquivada." };
}

export async function deletePage(id: string): Promise<ActionResult<true>> {
  const auth = await requireAdmin();
  const supabase = createAdminClient();

  // System pages protection
  const { data: page } = await supabase.from("pages").select("is_system, status").eq("id", id).single();
  
  if (page?.is_system) {
    return { success: false, formError: "PÃ¡ginas de sistema nÃ£o podem ser excluÃ­das." };
  }

  // Only allow deleting drafts
  if (page?.status !== 'draft') {
    return { success: false, formError: "Apenas rascunhos podem ser excluÃ­dos permanentemente. Arquive pÃ¡ginas publicadas." };
  }

  const { error } = await supabase.from("pages").delete().eq("id", id);

  if (error) {
    return { success: false, formError: error.message };
  }

  // Log action
  await createAuditLog({
    action: "page.deleted",
    entity_type: "page",
    entity_id: id,
    user_id: auth.id
  });

  return { success: true, data: true, message: "Rascunho excluÃ­do." };
}

// --- Revisions ---

export async function createRevision(pageId: string, snapshot: Record<string, unknown>, label?: string): Promise<ActionResult> {
  try {
    const auth = await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from("cms_revisions")
      .insert({
        page_id: pageId,
        snapshot,
        label,
        is_autosave: !label,
        created_by: auth.id
      });

    if (error) throw error;

    await createAuditLog({
      action: label ? "page.revision_created" : "page.autosaved",
      entity_type: "page",
      entity_id: pageId,
      user_id: auth.id,
      details: { label }
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Error creating revision:", error);
    return { success: false, formError: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function getRevisions(pageId: string): Promise<ActionResult<CmsRevisionRow[]>> {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("cms_revisions")
      .select("*")
      .eq("page_id", pageId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) throw error;

    return { success: true, data };
  } catch (error: unknown) {
    console.error("Error fetching revisions:", error);
    return { success: false, formError: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function restoreRevision(revisionId: string): Promise<ActionResult> {
  try {
    const auth = await requireAdmin();
    const supabase = await createClient();

    // 1. Get snapshot
    const { data: revision, error: revError } = await supabase
      .from("cms_revisions")
      .select("*")
      .eq("id", revisionId)
      .single();

    if (revError || !revision) throw new Error("RevisÃ£o nÃ£o encontrada.");

    // 2. Update page content
    const { error: updateError } = await supabase
      .from("pages")
      .update(revision.snapshot)
      .eq("id", revision.page_id);

    if (updateError) throw updateError;

    // 3. Create a new revision to mark the restoration
    await supabase.from("cms_revisions").insert({
      page_id: revision.page_id,
      snapshot: revision.snapshot,
      label: `Restaurado de ${new Date(revision.created_at).toLocaleString()}`,
      created_by: auth.id
    });

    await createAuditLog({
      action: "page.restored",
      entity_type: "page",
      entity_id: revision.page_id,
      user_id: auth.id,
      details: { revision_id: revisionId }
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Error restoring revision:", error);
    return { success: false, formError: error instanceof Error ? error.message : "Unknown error" };
  }
}
