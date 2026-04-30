import { Database, User } from "lucide-react";

import { EmptyState, PageHeader, StatusBadge } from "@/components/admin/admin-kit";
import { getAuditLogs } from "@/server/actions/audit";

export const dynamic = "force-dynamic";

interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  user_id: string | null;
  created_at: string;
  details?: Record<string, unknown> | null;
}

function formatRelativeTime(dateValue: string) {
  const date = new Date(dateValue);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 60) {
    return `ha ${diffMinutes} minuto${diffMinutes === 1 ? "" : "s"}`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `ha ${diffHours} hora${diffHours === 1 ? "" : "s"}`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `ha ${diffDays} dia${diffDays === 1 ? "" : "s"}`;
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatAction(action: string) {
  return action.replace(/[._]/g, " ");
}

export default async function AuditPage() {
  const logs = (await getAuditLogs()) as AuditLog[];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Trilha de auditoria"
        title="Historico de alteracoes"
        description="Rastreabilidade das acoes administrativas criticas realizadas no CMS e no admin comercial."
      />

      {logs.length === 0 ? (
        <EmptyState
          iconName="history"
          title="Nenhuma atividade registrada"
          description="Quando uma acao sensivel for executada, ela aparecera aqui com usuario, entidade e metadados."
        />
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <article key={log.id} className="border border-slate-200 bg-white p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex min-w-0 gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-slate-500">
                    <Database className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status="success" label={formatAction(log.action)} />
                      <span className="text-xs font-medium text-slate-500">{formatRelativeTime(log.created_at)}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-950">
                      {log.entity_type}
                      {log.entity_id ? <span className="ml-2 font-mono text-xs font-normal text-slate-500">{log.entity_id.slice(0, 8)}</span> : null}
                    </p>
                    {log.details && Object.keys(log.details).length > 0 ? (
                      <pre className="max-h-32 overflow-auto border border-slate-100 bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    ) : null}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-500">
                  <User className="h-3.5 w-3.5" />
                  {log.user_id ? log.user_id.slice(0, 8) : "sistema"}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
