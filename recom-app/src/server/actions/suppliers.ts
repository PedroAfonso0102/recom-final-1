'use server';

import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { SupplierSchema, Supplier } from '@/design-system/schemas/supplier.schema';
import { revalidateSupplierCatalog } from '@/lib/revalidation/catalog';
import { mapSupplierToInsert, mapSupplierToUpdate } from '@/lib/database/mappings';

export type ActionState = {
  success: boolean;
  error?: string;
};

export async function createSupplier(data: Supplier): Promise<ActionState> {
  const supabase = createAdminClient();
  const parsed = SupplierSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const payload = mapSupplierToInsert(parsed.data);

  const { error } = await supabase.from('suppliers').insert(payload);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateSupplierCatalog(payload.slug);
  redirect('/admin/fornecedores');
}

export async function updateSupplier(id: string, data: Supplier): Promise<ActionState> {
  const supabase = createAdminClient();
  const parsed = SupplierSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const payload = mapSupplierToUpdate(parsed.data);

  const { error } = await supabase.from('suppliers').update(payload).eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateSupplierCatalog(payload.slug ?? '');
  redirect('/admin/fornecedores');
}

export async function deleteSupplier(id: string): Promise<ActionState> {
  const supabase = createAdminClient();
  const { data: current, error: fetchError } = await supabase.from('suppliers').select('slug').eq('id', id).maybeSingle();

  if (fetchError) {
    return { success: false, error: fetchError.message };
  }

  const { error } = await supabase.from('suppliers').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateSupplierCatalog(current?.slug ?? undefined);
  return { success: true };
}
