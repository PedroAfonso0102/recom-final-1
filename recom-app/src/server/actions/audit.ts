'use server';
import { requireAdmin } from "@/lib/auth/utils";
import { createAdminClient } from "@/lib/supabase/admin";
import { unstable_noStore as noStore } from "next/cache";

export async function getAuditLogs(limit = 100) {
  await requireAdmin();
  noStore();
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
    
  if (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }
  
  return data || [];
}
