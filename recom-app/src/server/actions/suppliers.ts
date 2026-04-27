'use server';
import { requireAuth } from "@/lib/auth/utils";
import { createAuditLog } from "@/lib/audit";

import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { SupplierSchema, Supplier } from '@/cms/schemas/supplier.schema';
import { revalidateSupplierCatalog } from '@/lib/revalidation/catalog';
import { mapSupplierToInsert, mapSupplierToUpdate } from '@/lib/database/mappings';
import { formatDatabaseError } from '@/lib/database/errors';

export type ActionState = {
  success: boolean;
  error?: string;
};

export async function createSupplier(data: Supplier): Promise<ActionState> {
  await requireAuth();
  const supabase = createAdminClient();
  const parsed = SupplierSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const payload = mapSupplierToInsert(parsed.data);

  const { error } = await supabase.from('suppliers').insert(payload);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  revalidateSupplierCatalog(payload.slug);
  redirect('/admin/fornecedores');
}

export async function updateSupplier(id: string, data: Supplier): Promise<ActionState> {
  await requireAuth();
  console.log(`[Action: updateSupplier] ID: ${id}, Slug: ${data.slug}`);
  const supabase = createAdminClient();
  
  // Buscar o slug antigo para revalidação
  const { data: oldData, error: fetchError } = await supabase.from('suppliers').select('slug').eq('id', id).maybeSingle();
  
  if (fetchError) {
    console.error(`[Action: updateSupplier] Error fetching old record:`, fetchError);
  }
  
  console.log(`[Action: updateSupplier] Old slug found: ${oldData?.slug || 'none'}`);

  const parsed = SupplierSchema.safeParse(data);

  if (!parsed.success) {
    console.error(`[Action: updateSupplier] Validation error:`, parsed.error.format());
    return { success: false, error: `Erro de validação: ${parsed.error.issues[0]?.message}` };
  }

  const payload = mapSupplierToUpdate(parsed.data);
  console.log(`[Action: updateSupplier] Payload mapped. Updating database record...`);

  const { data: updatedData, error } = await supabase
    .from('suppliers')
    .update(payload)
    .eq('id', id)
    .select();

  if (error) {
    console.error(`[Action: updateSupplier] DB Error during update:`, error);
    return { success: false, error: formatDatabaseError(error) };
  }

  if (!updatedData || updatedData.length === 0) {
    console.warn(`[Action: updateSupplier] No rows were updated. ID ${id} might not exist.`);
    return { success: false, error: "Nenhum registro foi encontrado para atualização. O ID pode estar incorreto." };
  }

  console.log(`[Action: updateSupplier] Update successful! Record updated:`, updatedData[0].name);

  // Revalidar o slug antigo e o novo (caso tenha mudado)
  if (oldData?.slug) {
    console.log(`[Action: updateSupplier] Revalidating old slug: ${oldData.slug}`);
    revalidateSupplierCatalog(oldData.slug);
  }
  
  if (payload.slug && payload.slug !== oldData?.slug) {
    console.log(`[Action: updateSupplier] Revalidating new slug: ${payload.slug}`);
    revalidateSupplierCatalog(payload.slug);
  }
  
  // Revalidar as listas principais
  revalidateSupplierCatalog();
  
  console.log(`[Action: updateSupplier] Revalidation complete. Redirecting to admin list...`);
  redirect('/admin/fornecedores');
}

export async function archiveSupplier(id: string): Promise<ActionState> {
  const auth = await requireAuth();
  const supabase = createAdminClient();
  const { data: current, error: fetchError } = await supabase.from('suppliers').select('name, slug').eq('id', id).maybeSingle();

  if (fetchError) {
    return { success: false, error: fetchError.message };
  }

  const { error } = await supabase
    .from('suppliers')
    .update({ status: 'archived' })
    .eq('id', id);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  revalidateSupplierCatalog(current?.slug ?? undefined);

  // Log action
  await createAuditLog({
    action: "archive_supplier",
    entity_type: "supplier",
    entity_id: id,
    details: { name: current?.name },
    user_id: auth.id
  });

  return { success: true };
}

export async function deleteSupplier(id: string): Promise<ActionState> {
  const auth = await requireAuth();
  const supabase = createAdminClient();
  const { data: current, error: fetchError } = await supabase.from('suppliers').select('slug, status').eq('id', id).maybeSingle();

  if (fetchError) {
    return { success: false, error: fetchError.message };
  }

  // Only allow deleting drafts
  if (current?.status !== 'draft') {
    return { success: false, error: "Apenas rascunhos podem ser excluídos permanentemente. Arquive fornecedores ativos." };
  }

  const { error } = await supabase.from('suppliers').delete().eq('id', id);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  revalidateSupplierCatalog(current?.slug ?? undefined);

  // Log action
  await createAuditLog({
    action: "delete_supplier_draft",
    entity_type: "supplier",
    entity_id: id,
    user_id: auth.id
  });

  return { success: true };
}

