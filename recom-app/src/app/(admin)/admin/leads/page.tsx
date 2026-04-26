import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RecomCard } from '@/design-system/components/recom-card';
import { cn } from '@/lib/utils';
import { createAdminClient } from '@/lib/supabase/admin';
import { unstable_noStore as noStore } from 'next/cache';

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

const statusMap: Record<string, { label: string; className: string }> = {
  new: { label: 'NOVA DEMANDA', className: 'border-l-4 border-primary text-primary bg-primary/5' },
  contacted: { label: 'EM TRATATIVA', className: 'border-l-4 border-accent text-accent bg-accent/5' },
  qualified: { label: 'QUALIFICADO', className: 'border-l-4 border-green-600 text-green-700 bg-green-50' },
  lost: { label: 'ENCERRADO', className: 'border-l-4 border-muted-foreground/30 text-muted-foreground bg-muted/20' },
};

export default async function AdminLeadsPage() {
  const { leads, error } = await getLeads();

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

      <RecomCard className="overflow-hidden border-border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-primary">Nome / Empresa</TableHead>
              <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-primary">Contato Direto</TableHead>
              <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-primary">Requisito Técnico</TableHead>
              <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-primary text-center">Data Entrada</TableHead>
              <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-primary text-right">Status Atual</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em]">Queue Empty</div>
                    <div className="text-xs font-medium">Nenhum registro encontrado no pipeline.</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => {
                const status = statusMap[lead.status] ?? statusMap.new;
                return (
                  <TableRow key={lead.id} className="border-border hover:bg-muted/30 transition-colors group">
                    <TableCell className="py-5">
                      <div className="font-bold text-sm uppercase tracking-tight text-primary">{lead.name}</div>
                      <div className="text-[10px] font-mono uppercase text-muted-foreground">{lead.company || 'Pessoa Física'}</div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="text-xs font-medium text-slate-700">{lead.email}</div>
                      <div className="text-[10px] font-mono text-muted-foreground">{lead.phone || 'N/A'}</div>
                    </TableCell>
                    <TableCell className="py-5 max-w-[250px]">
                      <div className="text-xs text-slate-600 line-clamp-2 italic leading-relaxed">
                        "{lead.message || 'Sem mensagem adicional'}"
                      </div>
                    </TableCell>
                    <TableCell className="py-5 text-center">
                      <div className="text-[11px] font-mono font-bold text-primary bg-muted px-2 py-1 inline-block">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="py-5 text-right">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1.5 text-[9px] font-black tracking-widest uppercase",
                        status.className
                      )}>
                        {status.label}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </RecomCard>

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
          RECOM ADMIN / v2.0.42
        </div>
      </div>
    </div>
  );
}
