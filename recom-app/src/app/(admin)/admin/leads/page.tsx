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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Real-time Pipeline</span>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">
            Gestão de <span className="text-slate-400">Oportunidades</span>
          </h1>
          <p className="text-sm font-medium text-muted-foreground max-w-xl">
            Monitoramento centralizado de leads técnicos e requisições comerciais originadas via plataforma digital.
          </p>
        </div>

        {leads.length > 0 && (
          <div className="bg-primary/5 border border-primary/20 p-4 min-w-[200px]">
            <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Volume Total</div>
            <div className="text-2xl font-mono font-bold text-primary tracking-tighter">
              {leads.length.toString().padStart(3, '0')} <span className="text-xs uppercase tracking-normal">Unidades</span>
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

      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary" />
            <span>Novo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent" />
            <span>Processando</span>
          </div>
        </div>
        <div>
          RECOM ADMIN / v2.1.0
        </div>
      </div>
    </div>
  );
}
