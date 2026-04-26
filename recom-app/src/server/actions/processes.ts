'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProcessSchema, Process } from '@/design-system/schemas/process.schema';

export type ActionState = {
  success: boolean;
  error?: string;
};

export async function createProcess(data: Process): Promise<ActionState> {
  const supabase = await createClient();
  const parsed = ProcessSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const { name, slug, shortDescription, longDescription, status, sortOrder,
    imageUrl, seoTitle, seoDescription } = parsed.data;

  const { error } = await supabase.from('processes').insert({
    name,
    slug,
    short_description: shortDescription,
    long_description: longDescription,
    status,
    sort_order: sortOrder,
    image_url: imageUrl || null,
    seo_title: seoTitle || null,
    seo_description: seoDescription || null,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/processos');
  redirect('/admin/processos');
}

export async function updateProcess(id: string, data: Process): Promise<ActionState> {
  const supabase = await createClient();
  const parsed = ProcessSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const { name, slug, shortDescription, longDescription, status, sortOrder,
    imageUrl, seoTitle, seoDescription } = parsed.data;

  const { error } = await supabase.from('processes').update({
    name,
    slug,
    short_description: shortDescription,
    long_description: longDescription,
    status,
    sort_order: sortOrder,
    image_url: imageUrl || null,
    seo_title: seoTitle || null,
    seo_description: seoDescription || null,
  }).eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/processos');
  redirect('/admin/processos');
}

export async function deleteProcess(id: string): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from('processes').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/processos');
  return { success: true };
}
