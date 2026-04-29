'use server';
import { requireAdmin } from "@/lib/auth/utils";
import { createAuditLog } from "@/lib/audit";

import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { ProcessSchema, Process } from '@/cms/schemas/process.schema';
import { revalidateProcessCatalog } from '@/lib/revalidation/catalog';
import { mapProcessToInsert, mapProcessToUpdate } from '@/lib/database/mappings';
import { formatDatabaseError } from '@/lib/database/errors';

export type ActionState = {
  success: boolean;
  error?: string;
};

export async function createProcess(data: Process): Promise<ActionState> {
  const auth = await requireAdmin();
  const supabase = createAdminClient();
  const parsed = ProcessSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const payload = mapProcessToInsert(parsed.data);

  const { error } = await supabase.from('processes').insert(payload);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  await createAuditLog({
    action: "process.created",
    entity_type: "process",
    entity_id: payload.slug,
    details: { name: payload.name },
    user_id: auth.id
  });

  revalidateProcessCatalog(payload.slug);
  redirect('/admin/processos');
}

export async function updateProcess(id: string, data: Process): Promise<ActionState> {
  const auth = await requireAdmin();
  const supabase = createAdminClient();
  const parsed = ProcessSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const payload = mapProcessToUpdate(parsed.data);

  const { error } = await supabase.from('processes').update(payload).eq('id', id);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  await createAuditLog({
    action: "process.updated",
    entity_type: "process",
    entity_id: id,
    details: { name: payload.name, slug: payload.slug },
    user_id: auth.id
  });

  revalidateProcessCatalog(payload.slug ?? '');
  redirect('/admin/processos');
}

export async function deleteProcess(id: string): Promise<ActionState> {
  const auth = await requireAdmin();
  const supabase = createAdminClient();
  const { data: current, error: fetchError } = await supabase.from('processes').select('name, slug').eq('id', id).maybeSingle();

  if (fetchError) {
    return { success: false, error: fetchError.message };
  }

  const { error } = await supabase.from('processes').delete().eq('id', id);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  await createAuditLog({
    action: "process.deleted",
    entity_type: "process",
    entity_id: id,
    details: { name: current?.name, slug: current?.slug },
    user_id: auth.id
  });

  revalidateProcessCatalog(current?.slug ?? undefined);
  return { success: true };
}

