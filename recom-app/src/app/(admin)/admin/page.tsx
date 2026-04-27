import React from 'react';
import { Package, Factory, Tag, Users, ArrowUpRight } from 'lucide-react';
import { RecomCard } from '@/design-system/components/recom-card';
import { RecomButton } from '@/design-system/components/recom-button';
import { getDashboardStats, getRecentLeads } from '@/lib/services/dashboard';
import Link from 'next/link';

export default async function AdminDashboard() {
  const statsData = await getDashboardStats();
  const recentLeads = await getRecentLeads(5);

  const stats = [
    { title: "Fornecedores Ativos", value: statsData.suppliers.toString(), icon: Package, description: "Total na base" },
    { title: "Processos Técnicos", value: statsData.processes.toString().padStart(2, '0'), icon: Factory, description: "Categorias ativas" },
    { title: "Promoções", value: statsData.promotions.toString().padStart(2, '0'), icon: Tag, description: "Vigência atual" },
    { title: "Leads", value: statsData.leads.toString(), icon: Users, description: "Conversões totais" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Visão Geral</h1>
          <p className="text-slate-500 text-sm font-medium">
            Acompanhamento central de fornecedores, catálogos e leads da RECOM.
          </p>
        </div>
        <RecomButton size="sm" className="hidden md:flex rounded-xl shadow-sm px-6 text-xs font-bold">
          Gerar Relatório
        </RecomButton>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <RecomCard key={stat.title} className="p-6 border border-slate-100 shadow-sm bg-white hover:shadow-md rounded-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.title}</span>
              <div className="p-2 bg-slate-50 rounded-xl">
                <stat.icon className="h-4 w-4 text-recom-blue opacity-80" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tight text-slate-900">{stat.value}</span>
              <span className="text-[11px] font-medium text-slate-400">{stat.description}</span>
            </div>
          </RecomCard>
        ))}
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <RecomCard className="lg:col-span-4 p-8 border-none shadow-sm bg-white flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-bold text-slate-800">Leads Recentes</h3>
            <Link href="/admin/leads">
              <RecomButton intent="ghost" size="sm" className="h-auto p-0 hover:bg-transparent text-recom-blue text-xs font-semibold">
                Ver todos <ArrowUpRight className="ml-1 h-3 w-3" />
              </RecomButton>
            </Link>
          </div>
          
          <div className="flex flex-col gap-3">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">{lead.name}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{lead.company || lead.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-recom-blue bg-white border border-slate-100 px-2.5 py-1 rounded-full">
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-slate-400" />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
                <Users className="h-8 w-8 text-slate-200 mb-2" />
                <p className="text-xs font-semibold text-slate-400">Nenhum lead registrado</p>
              </div>
            )}
          </div>
        </RecomCard>

        <RecomCard className="lg:col-span-3 p-8 border-none shadow-sm bg-white flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-bold text-slate-800">Status da Infraestrutura</h3>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Ambiente de Execução</span>
              <span className="text-xs font-bold text-slate-700">Produção / MVP</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Banco de Dados</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-700">Supabase Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Tempo de Resposta</span>
              <span className="text-xs font-bold text-slate-700">240ms (Médio)</span>
            </div>
          </div>
          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plataforma RECOM</span>
              <span className="text-[9px] font-medium text-slate-300 italic">Built for Industrial Performance</span>
            </div>
          </div>
        </RecomCard>
      </div>
    </div>
  );
}


