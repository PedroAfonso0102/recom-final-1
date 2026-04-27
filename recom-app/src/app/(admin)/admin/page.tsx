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
    { title: "Fornecedores Ativos", value: statsData.suppliers.toString(), icon: Package, description: "Total cadastrado" },
    { title: "Processos Cadastrados", value: statsData.processes.toString().padStart(2, '0'), icon: Factory, description: "Categorias técnicas" },
    { title: "Promoções Ativas", value: statsData.promotions.toString().padStart(2, '0'), icon: Tag, description: "Vigência atual" },
    { title: "Novos Leads", value: statsData.leads.toString(), icon: Users, description: "Conversões totais" },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Overview Geral</span>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Painel de Controle</h1>
          <p className="text-muted-foreground max-w-2xl text-sm font-medium">
            Gestão de fornecedores, catálogos técnicos e leads comerciais da RECOM.
          </p>
        </div>
        <RecomButton size="sm" className="hidden md:flex">
          Gerar Relatório Técnico
        </RecomButton>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <RecomCard key={stat.title} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.title}</span>
              <stat.icon className="h-4 w-4 text-primary/40" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
              <span className="text-[10px] font-bold text-primary/60 uppercase tracking-tighter">{stat.description}</span>
            </div>
          </RecomCard>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <RecomCard className="lg:col-span-4 p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest">Leads Recentes</h3>
            <Link href="/admin/leads">
              <RecomButton intent="ghost" size="sm" className="h-auto p-0 hover:bg-transparent text-primary">
                Ver todos <ArrowUpRight className="ml-1 h-3 w-3" />
              </RecomButton>
            </Link>
          </div>
          
          <div className="flex flex-col gap-4">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-tight">{lead.name}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">{lead.company || lead.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded uppercase">
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-muted rounded-lg">
                <Users className="h-8 w-8 text-muted/30 mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Aguardando novas conversões</p>
              </div>
            )}
          </div>
        </RecomCard>

        <RecomCard className="lg:col-span-3 p-8 flex flex-col gap-6 bg-primary text-primary-foreground">
          <div className="flex items-center justify-between border-b border-primary-foreground/20 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest">Status do Sistema</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-tight opacity-70">Ambiente</span>
              <span className="text-xs font-bold uppercase tracking-tight">Desenvolvimento</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-tight opacity-70">Conexão BD</span>
              <span className="text-xs font-bold uppercase tracking-tight px-2 py-0.5 bg-white/10 rounded">Supabase Ativo</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-tight opacity-70">Uptime</span>
              <span className="text-xs font-bold uppercase tracking-tight">99.9%</span>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-primary-foreground/20">
            <p className="text-[10px] leading-relaxed opacity-60 uppercase font-bold tracking-widest text-center">
              Sistema Operacional Industrial <br/> RECOM-MVP v2.0
            </p>
          </div>
        </RecomCard>
      </div>
    </div>
  );
}


