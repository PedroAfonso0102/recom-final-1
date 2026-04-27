'use server';

import { requireAuth } from "@/lib/auth/utils";
import { createAdminClient } from '@/lib/supabase/admin';
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export type SalesRep = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: 'active' | 'inactive';
  last_assigned_at: string | null;
  assignment_count: number;
};

export async function getSalesReps() {
  await requireAuth();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('sales_reps')
    .select('*')
    .order('name');
  
  if (error) return [];
  return data as SalesRep[];
}

export async function createSalesRep(data: Partial<SalesRep>) {
  await requireAuth();
  const supabase = createAdminClient();
  const { error } = await supabase.from('sales_reps').insert(data);
  if (error) return { ok: false, error: error.message };
  
  revalidatePath('/admin/leads');
  return { ok: true };
}

export async function updateSalesRep(id: string, data: Partial<SalesRep>) {
  await requireAuth();
  const supabase = createAdminClient();
  const { error } = await supabase.from('sales_reps').update(data).eq('id', id);
  if (error) return { ok: false, error: error.message };
  
  revalidatePath('/admin/leads');
  return { ok: true };
}

export async function toggleSalesRepStatus(id: string, currentStatus: string) {
  const auth = await requireAuth();
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('sales_reps')
    .update({ status: newStatus })
    .eq('id', id);
    
  if (error) return { ok: false, error: error.message };
  
  // Log action
  await createAuditLog({
    action: "toggle_sales_rep_status",
    entity_type: "sales_rep",
    entity_id: id,
    details: { status: newStatus },
    user_id: auth.id
  });

  revalidatePath('/admin/leads');
  return { ok: true };
}

export async function deleteSalesRep(id: string) {
  const auth = await requireAuth();
  const supabase = createAdminClient();
  
  // Check if rep has assignments (we might want to archive instead if so)
  const { data: rep } = await supabase.from('sales_reps').select('assignment_count').eq('id', id).single();
  
  if (rep && rep.assignment_count > 0) {
    return { ok: false, error: "Este vendedor possui atendimentos registrados e não pode ser excluído. Pause-o no rodízio." };
  }

  const { error } = await supabase.from('sales_reps').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  
  // Log action
  await createAuditLog({
    action: "delete_sales_rep",
    entity_type: "sales_rep",
    entity_id: id,
    user_id: auth.id
  });

  revalidatePath('/admin/leads');
  return { ok: true };
}


/**
 * Round Robin logic to get the next representative to assign a lead.
 * Selects the active representative who hasn't been assigned a lead for the longest time.
 */
export async function getNextRepForAssignment(): Promise<SalesRep | null> {
  const supabase = createAdminClient();
  
  // Get active reps ordered by last_assigned_at (nulls first)
  const { data, error } = await supabase
    .from('sales_reps')
    .select('*')
    .eq('status', 'active')
    .order('last_assigned_at', { ascending: true, nullsFirst: true })
    .limit(1);
    
  if (error || !data || data.length === 0) return null;
  
  return data[0] as SalesRep;
}

/**
 * Assigns a lead to a representative and updates their stats.
 */
export async function assignLeadToRep(leadId: string, repId: string) {
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  
  // 1. Update Lead
  const { error: leadError } = await supabase
    .from('leads')
    .update({ 
      assigned_rep_id: repId,
      status: 'em_tratativa', // Update status as requested
      updated_at: now
    })
    .eq('id', leadId);
    
  if (leadError) return { ok: false, error: leadError.message };
  
  // 2. Update Rep stats
  const { error: repError } = await supabase.rpc('increment_rep_stats', { 
    rep_id: repId,
    assignment_time: now
  });
  
  // Fallback if RPC doesn't exist yet (manual update)
  if (repError) {
    const { data: rep } = await supabase.from('sales_reps').select('assignment_count').eq('id', repId).single();
    await supabase.from('sales_reps').update({
      last_assigned_at: now,
      assignment_count: (rep?.assignment_count || 0) + 1
    }).eq('id', repId);
  }
  
  revalidatePath('/admin/leads');
  return { ok: true };
}
