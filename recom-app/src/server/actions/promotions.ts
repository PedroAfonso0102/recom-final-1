'use server';
import { requireAuth } from "@/lib/auth/utils";
import { createAuditLog } from "@/lib/audit";

import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { PromotionSchema, Promotion } from '@/cms/schemas/promotion.schema';
import { revalidatePromotionCatalog } from '@/lib/revalidation/catalog';
import { mapPromotionToInsert, mapPromotionToUpdate } from '@/lib/database/mappings';
import { formatDatabaseError } from '@/lib/database/errors';

export type ActionState = {
  success: boolean;
  error?: string;
};

export async function createPromotion(data: Promotion): Promise<ActionState> {
  const auth = await requireAuth();
  const supabase = createAdminClient();
  const parsed = PromotionSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const payload = mapPromotionToInsert(parsed.data);

  const { error } = await supabase.from('promotions').insert(payload);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  await createAuditLog({
    action: "create_promotion",
    entity_type: "promotion",
    entity_id: payload.slug,
    details: { title: payload.title },
    user_id: auth.id
  });

  revalidatePromotionCatalog(payload.slug);
  redirect('/admin/promocoes');
}

export async function updatePromotion(id: string, data: Promotion): Promise<ActionState> {
  const auth = await requireAuth();
  const supabase = createAdminClient();
  const parsed = PromotionSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const payload = mapPromotionToUpdate(parsed.data);

  const { error } = await supabase.from('promotions').update(payload).eq('id', id);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  await createAuditLog({
    action: "update_promotion",
    entity_type: "promotion",
    entity_id: id,
    details: { title: payload.title, slug: payload.slug },
    user_id: auth.id
  });

  revalidatePromotionCatalog(payload.slug ?? '');
  redirect('/admin/promocoes');
}

export async function deletePromotion(id: string): Promise<ActionState> {
  const auth = await requireAuth();
  const supabase = createAdminClient();
  const { data: current, error: fetchError } = await supabase.from('promotions').select('title, slug').eq('id', id).maybeSingle();

  if (fetchError) {
    return { success: false, error: fetchError.message };
  }

  const { error } = await supabase.from('promotions').delete().eq('id', id);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  await createAuditLog({
    action: "delete_promotion",
    entity_type: "promotion",
    entity_id: id,
    details: { title: current?.title, slug: current?.slug },
    user_id: auth.id
  });

  revalidatePromotionCatalog(current?.slug ?? undefined);
  return { success: true };
}

