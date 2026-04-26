'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PromotionSchema, Promotion } from '@/design-system/schemas/promotion.schema';

export type ActionState = {
  success: boolean;
  error?: string;
};

export async function createPromotion(data: Promotion): Promise<ActionState> {
  const supabase = await createClient();
  const parsed = PromotionSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const { title, slug, description, status, imageUrl, startsAt, endsAt,
    ctaLabel, ctaUrl, supplierId } = parsed.data;

  const { error } = await supabase.from('promotions').insert({
    title,
    slug,
    description,
    status,
    image_url: imageUrl || null,
    starts_at: startsAt,
    ends_at: endsAt,
    cta_label: ctaLabel || null,
    cta_url: ctaUrl || null,
    supplier_id: supplierId || null,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/promocoes');
  redirect('/admin/promocoes');
}

export async function updatePromotion(id: string, data: Promotion): Promise<ActionState> {
  const supabase = await createClient();
  const parsed = PromotionSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const { title, slug, description, status, imageUrl, startsAt, endsAt,
    ctaLabel, ctaUrl, supplierId } = parsed.data;

  const { error } = await supabase.from('promotions').update({
    title,
    slug,
    description,
    status,
    image_url: imageUrl || null,
    starts_at: startsAt,
    ends_at: endsAt,
    cta_label: ctaLabel || null,
    cta_url: ctaUrl || null,
    supplier_id: supplierId || null,
  }).eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/promocoes');
  redirect('/admin/promocoes');
}

export async function deletePromotion(id: string): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from('promotions').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/promocoes');
  return { success: true };
}
