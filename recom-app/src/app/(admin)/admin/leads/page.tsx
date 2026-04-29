import React from "react";
import { unstable_noStore as noStore } from "next/cache";

import { ErrorSummary, PageHeader } from "@/components/admin/admin-kit";
import { LeadsManager } from "@/components/admin/LeadsManager";
import type { LeadNotificationsConfig } from "@/components/admin/LeadsManager";
import { getAdminConfig, getAllProcesses, getAllSuppliers } from "@/lib/services/dashboard";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSalesReps } from "@/server/actions/sales-reps";

function isLeadNotificationsConfig(value: unknown): value is LeadNotificationsConfig {
  if (typeof value !== "object" || value === null) return false;
  const config = value as Record<string, unknown>;
  return typeof config.enabled === "boolean" && Array.isArray(config.emails);
}

async function getLeads() {
  noStore();
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });

  if (error) {
    return { leads: [], error: error.message };
  }

  return { leads: data ?? [], error: "" };
}

export default async function AdminLeadsPage() {
  const [{ leads, error }, config, processes, salesReps, suppliers] = await Promise.all([
    getLeads(),
    getAdminConfig("lead_notifications"),
    getAllProcesses(),
    getSalesReps(),
    getAllSuppliers(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Comercial"
        title="Leads"
        description={`${leads.length} registros no pipeline. Busque, filtre, abra o drawer lateral e responda em ate dois cliques.`}
      />

      {error ? <ErrorSummary title="Nao foi possivel carregar os leads" errors={[error]} /> : null}

      <LeadsManager
        initialLeads={leads}
        config={isLeadNotificationsConfig(config) ? config : null}
        processes={processes}
        initialSalesReps={salesReps}
        suppliers={suppliers}
      />
    </div>
  );
}
