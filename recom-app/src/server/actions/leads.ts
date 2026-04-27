'use server';
import { requireAuth } from "@/lib/auth/utils";

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { formatDatabaseError } from '@/lib/database/errors';

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
    return { success: false, error: formatDatabaseError(error) };
  }

  revalidatePath('/admin/leads');
  return { success: true };
}

export async function deleteLead(id: string): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  const { error } = await supabase.from('leads').delete().eq('id', id);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  revalidatePath('/admin/leads');
  return { success: true };
}

export async function updateAdminConfig(key: string, value: any): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  const { error } = await supabase.from('admin_configs').upsert({ key, value });
  
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function processLeadBatch(ids: string[], targetStatus: string): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('leads')
    .update({ 
      status: targetStatus,
      notified_at: new Date().toISOString()
    })
    .in('id', ids);
    
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function assignProcessToLead(leadId: string, processId: string | null): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('leads')
    .update({ process_id: processId })
    .eq('id', leadId);
    
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function getSalesReps(): Promise<any[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sales_reps')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching sales reps:', error);
    return [];
  }
  return data || [];
}

export async function addSalesRep(rep: { name: string, email: string, phone?: string }): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('sales_reps')
    .insert([rep]);
    
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function updateSalesRep(id: string, updates: any): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('sales_reps')
    .update(updates)
    .eq('id', id);
    
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function deleteSalesRep(id: string): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('sales_reps')
    .delete()
    .eq('id', id);
    
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function updateRepAssignment(id: string): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('sales_reps')
    .update({ last_assigned_at: new Date().toISOString() })
    .eq('id', id);
    
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function updateLeadFeedback(id: string, feedback: { 
  revenue_value?: number, 
  loss_reason?: string,
  status?: string,
  closed_at?: string 
}): Promise<ActionState> {
  await requireAuth();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('leads')
    .update(feedback)
    .eq('id', id);
    
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');
  return { success: true };
}
