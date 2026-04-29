'use server';
import { requireAdmin } from "@/lib/auth/utils";

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { formatDatabaseError } from '@/lib/database/errors';
import { createAuditLog } from '@/lib/audit';
import type { Json } from '@/lib/database.types';

const LeadStatusSchema = z.enum(['new', 'contacted', 'qualified', 'lost']);

export type ActionState = {
  success: boolean;
  error?: string;
};

export async function updateLeadStatus(id: string, status: string): Promise<ActionState> {
  const auth = await requireAdmin();
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

  // Log audit entry
  try {
    await createAuditLog({
      action: 'update_lead_status',
      entity_type: 'leads',
      entity_id: id,
      user_id: auth.id,
      details: { status: parsed.data }
    });
  } catch (err) {
    console.error('[Leads] Audit log failed:', err);
  }

  return { success: true };
}

export async function deleteLead(id: string): Promise<ActionState> {
  const auth = await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from('leads').delete().eq('id', id);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  revalidatePath('/admin/leads');

  // Log audit entry
  try {
    await createAuditLog({
      action: 'delete_lead',
      entity_type: 'leads',
      entity_id: id,
      user_id: auth.id,
    });
  } catch (err) {
    console.error('[Leads] Audit log failed:', err);
  }

  return { success: true };
}

export async function updateAdminConfig(key: string, value: unknown): Promise<ActionState> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from('admin_configs').upsert({ key, value });
  
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function processLeadBatch(ids: string[], targetStatus: string): Promise<ActionState> {
  const auth = await requireAdmin();
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

  // Log audit entry
  try {
    await createAuditLog({
      action: 'process_lead_batch',
      entity_type: 'leads',
      entity_id: 'batch',
      user_id: auth.id,
      details: { ids, targetStatus }
    });
  } catch (err) {
    console.error('[Leads] Audit log failed:', err);
  }

  return { success: true };
}

export async function assignProcessToLead(leadId: string, processId: string | null): Promise<ActionState> {
  const auth = await requireAdmin();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('leads')
    .update({ process_id: processId })
    .eq('id', leadId);
    
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');

  // Log audit entry
  try {
    await createAuditLog({
      action: 'assign_process_to_lead',
      entity_type: 'leads',
      entity_id: leadId,
      user_id: auth.id,
      details: { processId }
    });
  } catch (err) {
    console.error('[Leads] Audit log failed:', err);
  }

  return { success: true };
}


export async function updateLeadFeedback(id: string, feedback: { 
  revenue_value?: number, 
  loss_reason?: string,
  status?: string,
  closed_at?: string 
}): Promise<ActionState> {

  const auth = await requireAdmin();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('leads')
    .update(feedback)
    .eq('id', id);
    
  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }
  
  revalidatePath('/admin/leads');

  // Log audit entry
  try {
    await createAuditLog({
      action: 'update_lead_feedback',
      entity_type: 'leads',
      entity_id: id,
      user_id: auth.id,
      details: feedback as unknown as Record<string, Json | undefined>
    });
  } catch (err) {
    console.error('[Leads] Audit log failed:', err);
  }

  return { success: true };
}

export async function updateLeadNotes(id: string, notes: string): Promise<ActionState> {
  const auth = await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('leads')
    .update({ notes })
    .eq('id', id);

  if (error) {
    return { success: false, error: formatDatabaseError(error) };
  }

  revalidatePath('/admin/leads');

  // Log audit entry
  try {
    await createAuditLog({
      action: 'update_lead_notes',
      entity_type: 'leads',
      entity_id: id,
      user_id: auth.id,
      details: { notes_length: notes.length }
    });
  } catch (err) {
    console.error('[Leads] Audit log failed:', err);
  }

  return { success: true };
}

export async function getLeadTechnicalDossier(leadId: string) {
  await requireAdmin();
  const supabase = await createClient();
  
  // 1. Fetch Lead data
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*, processes(id, name, slug)')
    .eq('id', leadId)
    .single();
    
  if (leadError || !lead) return null;
  
  // 2. Fetch Suppliers related to this process
  // Note: We'll look for suppliers that have this process ID in their related_processes array
  const { data: suppliers, error: suppliersError } = await supabase
    .from('suppliers')
    .select('name, catalog_url, catalogs')
    .contains('related_processes', [lead.process_id]);
    
  if (suppliersError) {
    console.error("Error fetching suppliers:", suppliersError);
  }
    
  return {
    lead,
    suppliers: suppliers || [],
    suggested_catalogs: suppliers?.map((s: Record<string, unknown>) => ({
      supplier: s.name,
      main_catalog: s.catalog_url,
      extra_catalogs: s.catalogs
    })) || []
  };
}
