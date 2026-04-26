'use server';
import { requireAuth } from "@/lib/auth/utils";

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const LeadStatusSchema = z.enum(['new', 'contacted', 'qualified', 'lost']);

export type ActionState = {
  success: boolean;
  error?: string;
};

export async function updateLeadStatus(id: string, status: string): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  const parsed = LeadStatusSchema.safeParse(status);

  if (!parsed.success) {
    return { success: false, error: 'Status inválido.' };
  }

  const { error } = await supabase
    .from('leads')
    .update({ status: parsed.data })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/leads');
  return { success: true };
}

export async function deleteLead(id: string): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  const { error } = await supabase.from('leads').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/leads');
  return { success: true };
}
