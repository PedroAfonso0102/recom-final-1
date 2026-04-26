'use server';
import { requireAuth } from "@/lib/auth/utils";

import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { ProcessSchema, Process } from '@/design-system/schemas/process.schema';
import { revalidateProcessCatalog } from '@/lib/revalidation/catalog';
import { mapProcessToInsert, mapProcessToUpdate } from '@/lib/database/mappings';

export type ActionState = {
  success: boolean;
  error?: string;
};

export async function createProcess(data: Process): Promise<ActionState> {
  await requireAuth();
  const supabase = createAdminClient();
  const parsed = ProcessSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const payload = mapProcessToInsert(parsed.data);

  const { error } = await supabase.from('processes').insert(payload);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateProcessCatalog(payload.slug);
  redirect('/admin/processos');
}

export async function updateProcess(id: string, data: Process): Promise<ActionState> {
  await requireAuth();
  const supabase = createAdminClient();
  const parsed = ProcessSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const payload = mapProcessToUpdate(parsed.data);

  const { error } = await supabase.from('processes').update(payload).eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateProcessCatalog(payload.slug ?? '');
  redirect('/admin/processos');
}

export async function deleteProcess(id: string): Promise<ActionState> {
  await requireAuth();
  const supabase = createAdminClient();
  const { data: current, error: fetchError } = await supabase.from('processes').select('slug').eq('id', id).maybeSingle();

  if (fetchError) {
    return { success: false, error: fetchError.message };
  }

  const { error } = await supabase.from('processes').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateProcessCatalog(current?.slug ?? undefined);
  return { success: true };
}
