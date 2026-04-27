import { createAdminClient } from "../supabase/admin";
import { unstable_noStore as noStore } from "next/cache";

export async function getDashboardStats() {
  noStore();
  const supabase = createAdminClient();

  const [
    suppliersRes,
    processesRes,
    promotionsRes,
    leadsRes,
  ] = await Promise.all([
    supabase.from("suppliers").select("*", { count: "exact", head: true }),
    supabase.from("processes").select("*", { count: "exact", head: true }),
    supabase.from("promotions").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }),
  ]);

  return {
    suppliers: suppliersRes.count || 0,
    processes: processesRes.count || 0,
    promotions: promotionsRes.count || 0,
    leads: leadsRes.count || 0,
  };
}

export async function getRecentLeads(limit = 5) {
  noStore();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent leads:", error);
    return [];
  }

  return data;
}

export async function getAdminConfig(key: string) {
  noStore();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("admin_configs")
    .select("value")
    .eq("key", key)
    .single();

  if (error) {
    return null;
  }

  return data.value;
}

export async function getAllProcesses() {
  noStore();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("processes")
    .select("id, name, slug, short_description")
    .order("name");

  if (error) {
    console.error("Error fetching processes:", error);
    return [];
  }

  return data;
}
