import React from 'react';
import { getAuditLogs } from '@/server/actions/audit';
import { History, User, Database, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  created_at: string;
  details?: Record<string, unknown>;
}

function formatRelativeTime(dateValue: string) {
  const date = new Date(dateValue);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 60) {
    return `há ${diffMinutes} minuto${diffMinutes === 1 ? '' : 's'}`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `há ${diffHours} hora${diffHours === 1 ? '' : 's'}`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `há ${diffDays} dia${diffDays === 1 ? '' : 's'}`;
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default async function AuditPage() {
  const logs = await getAuditLogs() as AuditLog[];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-slate-400">
          <History className="h-4 w-4" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Trilha de Auditoria</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Histórico de <span className="text-slate-400">Alterações</span>
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl font-medium">
          Rastreabilidade completa de todas as ações administrativas críticas realizadas no sistema.
        </p>
      </div>

      <div className="grid gap-4">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white border border-dashed border-slate-200 rounded-3xl">
            <History className="h-12 w-12 mb-4 text-slate-200" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nenhuma atividade registrada ainda</p>
          </div>
        ) : (
          logs.map((log: AuditLog) => (
            <div key={log.id} className="group relative bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="mt-1 h-10 w-10 flex items-center justify-center bg-slate-100 rounded-xl text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Database className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 px-2 py-0.5 bg-slate-100 rounded-full border border-slate-200">
                        {log.action.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatRelativeTime(log.created_at)}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Alterou {log.entity_type} <span className="font-mono text-[10px] text-slate-400">({log.entity_id.substring(0, 8)}...)</span>
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
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    <User className="h-3 w-3" />
                    Usuário: {log.user_id?.substring(0, 8)}...
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
        <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Logs monitorados em tempo real
        </div>
      </div>
    </div>
  );
}
