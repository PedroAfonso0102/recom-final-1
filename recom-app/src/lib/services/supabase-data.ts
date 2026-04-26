import { createClient } from '../supabase/server';
import { createStaticClient } from '../supabase/static';
import { Supplier, SupplierSchema } from '../../design-system/schemas/supplier.schema';
import { Process, ProcessSchema } from '../../design-system/schemas/process.schema';
import { Promotion, PromotionSchema } from '../../design-system/schemas/promotion.schema';

export async function getSuppliers(): Promise<Supplier[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('status', 'active')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching suppliers from Supabase:', error);
    return [];
  }

  // Parse and validate using Zod
  return data.map(item => SupplierSchema.parse({
    ...item,
    logoUrl: item.logo_url,
    catalogUrl: item.catalog_url,
    shortDescription: item.short_description,
    longDescription: item.long_description,
    relatedProcesses: item.related_processes,
    sortOrder: item.sort_order,
    seoTitle: item.seo_title,
    seoDescription: item.seo_description,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
}

export async function getSupplierBySlug(slug: string): Promise<Supplier | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  return SupplierSchema.parse({
    ...data,
    logoUrl: data.logo_url,
    catalogUrl: data.catalog_url,
    shortDescription: data.short_description,
    longDescription: data.long_description,
    relatedProcesses: data.related_processes,
    sortOrder: data.sort_order,
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  });
}

export async function getProcesses(): Promise<Process[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('processes')
    .select('*')
    .eq('status', 'active')
    .order('sort_order', { ascending: true });

  if (error) return [];

  return data.map(item => ProcessSchema.parse({
    ...item,
    imageUrl: item.image_url,
    shortDescription: item.short_description,
    longDescription: item.long_description,
    sortOrder: item.sort_order,
    seoTitle: item.seo_title,
    seoDescription: item.seo_description,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
}

export async function getProcessBySlug(slug: string): Promise<Process | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('processes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  return ProcessSchema.parse({
    ...data,
    imageUrl: data.image_url,
    shortDescription: data.short_description,
    longDescription: data.long_description,
    sortOrder: data.sort_order,
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  });
}

export async function getPromotions(): Promise<Promotion[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('status', 'active')
    .order('starts_at', { ascending: false });

  if (error) return [];

  return data.map(item => PromotionSchema.parse({
    ...item,
    supplierId: item.supplier_id,
    imageUrl: item.image_url,
    startsAt: item.starts_at,
    endsAt: item.ends_at,
    ctaLabel: item.cta_label,
    ctaUrl: item.cta_url,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
}

// ─── Funções para generateStaticParams (sem cookies) ─────────────

export async function getStaticSupplierSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from('suppliers')
    .select('slug')
    .eq('status', 'active');

  if (error || !data) return [];
  return data.map(item => ({ slug: item.slug }));
}

export async function getStaticProcessSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from('processes')
    .select('slug')
    .eq('status', 'active');

  if (error || !data) return [];
  return data.map(item => ({ slug: item.slug }));
}
