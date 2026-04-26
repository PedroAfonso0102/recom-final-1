'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SupplierSchema, Supplier } from '@/design-system/schemas/supplier.schema';

export type ActionState = {
  success: boolean;
  error?: string;
};

export async function createSupplier(data: Supplier): Promise<ActionState> {
  const supabase = await createClient();
  const parsed = SupplierSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const { name, slug, shortDescription, longDescription, status, sortOrder,
    logoUrl, catalogUrl, eCatalogUrl, seoTitle, seoDescription, relatedProcesses } = parsed.data;

  const { error } = await supabase.from('suppliers').insert({
    name,
    slug,
    short_description: shortDescription,
    long_description: longDescription,
    status,
    sort_order: sortOrder,
    logo_url: logoUrl || null,
    catalog_url: catalogUrl || null,
    e_catalog_url: eCatalogUrl || null,
    seo_title: seoTitle || null,
    seo_description: seoDescription || null,
    related_processes: relatedProcesses || [],
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/fornecedores');
  redirect('/admin/fornecedores');
}

export async function updateSupplier(id: string, data: Supplier): Promise<ActionState> {
  const supabase = await createClient();
  const parsed = SupplierSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const { name, slug, shortDescription, longDescription, status, sortOrder,
    logoUrl, catalogUrl, eCatalogUrl, seoTitle, seoDescription, relatedProcesses } = parsed.data;

  const { error } = await supabase.from('suppliers').update({
    name,
    slug,
    short_description: shortDescription,
    long_description: longDescription,
    status,
    sort_order: sortOrder,
    logo_url: logoUrl || null,
    catalog_url: catalogUrl || null,
    e_catalog_url: eCatalogUrl || null,
    seo_title: seoTitle || null,
    seo_description: seoDescription || null,
    related_processes: relatedProcesses || [],
  }).eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/fornecedores');
  redirect('/admin/fornecedores');
}

export async function deleteSupplier(id: string): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from('suppliers').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/fornecedores');
  return { success: true };
}
