'use server';
import { requireAuth } from "@/lib/auth/utils";

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
  await requireAuth();
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

  revalidatePromotionCatalog(payload.slug);
  redirect('/admin/promocoes');
}

export async function updatePromotion(id: string, data: Promotion): Promise<ActionState> {
  await requireAuth();
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

  revalidatePromotionCatalog(payload.slug ?? '');
  redirect('/admin/promocoes');
}

export async function deletePromotion(id: string): Promise<ActionState> {
  await requireAuth();
  const supabase = createAdminClient();
  const { data: current, error: fetchError } = await supabase.from('promotions').select('slug').eq('id', id).maybeSingle();

  if (fetchError) {
    return { success: false, error: fetchError.message };
  }

  const { error } = await supabase.from('promotions').delete().eq('id', id);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  revalidatePromotionCatalog(current?.slug ?? undefined);
  return { success: true };
}
