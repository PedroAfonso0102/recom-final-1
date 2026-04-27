import React from 'react';
import { getAuditLogs } from '@/server/actions/audit';
import { History, User, Database, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

export default async function AuditPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-accent">
          <History className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Trilha de Auditoria</span>
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">
          Histórico de <span className="text-slate-400">Alterações</span>
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Rastreabilidade completa de todas as ações administrativas críticas realizadas no sistema.
        </p>
      </div>

      <div className="grid gap-4">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white border border-dashed border-slate-200 rounded-3xl opacity-50">
            <History className="h-12 w-12 mb-4 text-slate-300" />
            <p className="text-[10px] font-black uppercase tracking-widest">Nenhuma atividade registrada ainda</p>
          </div>
        ) : (
          logs.map((log: any) => (
            <div key={log.id} className="group relative bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="mt-1 h-10 w-10 flex items-center justify-center bg-slate-100 rounded-xl text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Database className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/5 rounded border border-primary/10">
                        {log.action.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: ptBR })}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-700">
                      Alterou {log.entity_type} <span className="font-mono text-xs opacity-50">({log.entity_id.substring(0, 8)}...)</span>
                    </h3>
                    {log.details && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <pre className="text-[10px] font-mono text-slate-500 overflow-auto max-h-32">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                    <User className="h-3 w-3" />
                    ID do Usuário: {log.user_id?.substring(0, 8)}...
                  </div>
                  <div className="text-[9px] font-mono text-slate-300">
                    {new Date(log.created_at).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center pt-8">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Sistema de logs ativo e monitorado em tempo real
        </p>
      </div>
    </div>
  );
}
