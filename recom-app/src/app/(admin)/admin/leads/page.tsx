import React from 'react';
import { createAdminClient } from '@/lib/supabase/admin';
import { unstable_noStore as noStore } from 'next/cache';
import { LeadsManager } from '@/components/admin/LeadsManager';
import type { LeadNotificationsConfig } from '@/components/admin/LeadsManager';
import { getAdminConfig, getAllProcesses, getAllSuppliers } from '@/lib/services/dashboard';
import { getSalesReps } from '@/server/actions/sales-reps';

function isLeadNotificationsConfig(value: unknown): value is LeadNotificationsConfig {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const config = value as Record<string, unknown>;
  const autoStatusUpdate = config.auto_status_update as Record<string, unknown> | undefined;
  const workingHours = config.working_hours as Record<string, unknown> | undefined;
  const emailTemplate = config.email_template as Record<string, unknown> | undefined;

  return (
    typeof config.enabled === 'boolean' &&
    Array.isArray(config.emails) &&
    ['instant', 'daily', 'weekly', 'custom'].includes(String(config.frequency)) &&
    typeof config.round_robin_enabled === 'boolean' &&
    !!autoStatusUpdate &&
    typeof autoStatusUpdate.enabled === 'boolean' &&
    typeof autoStatusUpdate.target_status === 'string' &&
    !!workingHours &&
    typeof workingHours.start === 'string' &&
    typeof workingHours.end === 'string' &&
    typeof workingHours.enabled === 'boolean' &&
    !!emailTemplate &&
    typeof emailTemplate.subject_prefix === 'string' &&
    typeof emailTemplate.include_summary === 'boolean'
  );
}


async function getLeads() {
  noStore();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
    return { leads: [], error: error.message };
  }

  return { leads: data ?? [], error: '' };
}

export default async function AdminLeadsPage() {
  const [{ leads, error }, config, processes, salesReps, suppliers] = await Promise.all([
    getLeads(),
    getAdminConfig('lead_notifications'),
    getAllProcesses(),
    getSalesReps(),
    getAllSuppliers()
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pipeline em Tempo Real</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Gestão de Oportunidades
          </h1>
          <p className="text-sm font-medium text-slate-500 max-w-xl">
            Monitoramento centralizado de leads técnicos e requisições comerciais originadas via plataforma digital.
          </p>
        </div>

        {leads.length > 0 && (
          <div className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center bg-slate-50 rounded-xl">
              <span className="text-sm font-bold text-slate-900">{leads.length}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total de Leads</p>
              <p className="text-xs font-semibold text-slate-600">Unidades registradas</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Não foi possível carregar os leads agora. {error}
        </div>
      )}

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
