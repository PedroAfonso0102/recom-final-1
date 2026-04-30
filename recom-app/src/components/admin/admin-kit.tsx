"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Clock, EyeOff, FileText, Loader2, Lock, SearchX, History } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type AdminStatus =
  | "draft"
  | "published"
  | "scheduled"
  | "archived"
  | "active"
  | "inactive"
  | "new"
  | "contacted"
  | "qualified"
  | "lost"
  | "warning"
  | "error"
  | "success";

const statusMap: Record<string, { label: string; className: string }> = {
  draft: { label: "Rascunho", className: "border-amber-200 bg-amber-50 text-amber-800" },
  published: { label: "Publicado", className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  scheduled: { label: "Agendado", className: "border-blue-200 bg-blue-50 text-blue-800" },
  archived: { label: "Arquivado", className: "border-slate-200 bg-slate-100 text-slate-600" },
  active: { label: "Ativo", className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  inactive: { label: "Pausado", className: "border-slate-200 bg-slate-100 text-slate-600" },
  new: { label: "Novo", className: "border-blue-200 bg-blue-50 text-blue-800" },
  contacted: { label: "Em atendimento", className: "border-indigo-200 bg-indigo-50 text-indigo-800" },
  qualified: { label: "Qualificado", className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  lost: { label: "Perdido", className: "border-rose-200 bg-rose-50 text-rose-800" },
  warning: { label: "Pendencia", className: "border-amber-200 bg-amber-50 text-amber-800" },
  error: { label: "Erro", className: "border-rose-200 bg-rose-50 text-rose-800" },
  success: { label: "OK", className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0 space-y-1">
        {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{eyebrow}</p> : null}
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-[28px]">{title}</h1>
        {description ? <p className="max-w-3xl text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Toolbar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 border border-slate-200 bg-white p-3 md:flex-row md:items-center md:justify-between", className)}>
      {children}
    </div>
  );
}

export function FilterBar({
  search,
  onSearch,
  children,
  placeholder = "Buscar",
}: {
  search?: string;
  onSearch?: (value: string) => void;
  children?: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(260px,1fr)_auto] md:items-center">
      {onSearch ? (
        <Input value={search ?? ""} onChange={(event) => onSearch(event.target.value)} placeholder={placeholder} className="h-9 rounded-md border-slate-300 bg-white text-sm" />
      ) : (
        <div />
      )}
      {children ? <div className="flex flex-wrap items-center gap-2">{children}</div> : null}
    </div>
  );
}

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  const config = statusMap[status] ?? { label: label ?? status, className: "border-slate-200 bg-slate-50 text-slate-700" };
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold", config.className)}>
      {label ?? config.label}
    </span>
  );
}

export function DataTable({
  columns,
  children,
  empty,
}: {
  columns: string[];
  children: React.ReactNode;
  empty?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden border border-slate-200 bg-white">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="border-slate-200 hover:bg-slate-50">
            {columns.map((column) => (
              <TableHead key={column} className="h-10 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{children || empty}</TableBody>
      </Table>
    </div>
  );
}

const iconLibrary = {
  fileText: FileText,
  history: History,
  lock: Lock,
  searchX: SearchX,
};

export function EmptyState({
  title,
  description,
  action,
  icon: IconProp,
  iconName,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  iconName?: keyof typeof iconLibrary;
}) {
  const Icon = (iconName ? iconLibrary[iconName] : IconProp) || FileText;
  
  return (
    <div className="flex min-h-48 flex-col items-center justify-center border border-dashed border-slate-300 bg-white p-8 text-center">
      <Icon className="mb-3 h-7 w-7 text-slate-400" />
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      <p className="mt-1 max-w-md text-sm leading-6 text-slate-600">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function ErrorSummary({ title = "Revise os campos destacados", errors }: { title?: string; errors: string[] }) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900" role="alert" tabIndex={-1}>
      <div className="flex items-center gap-2 font-semibold">
        <AlertCircle className="h-4 w-4" />
        {title}
      </div>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}

export function LoadingState({ title = "Carregando", description = "Buscando os dados mais recentes." }: { title?: string; description?: string }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center border border-slate-200 bg-white p-8 text-center" role="status">
      <Loader2 className="mb-3 h-7 w-7 animate-spin text-slate-400" />
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      <p className="mt-1 max-w-md text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export function SuccessState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center border border-emerald-200 bg-emerald-50 p-8 text-center">
      <CheckCircle2 className="mb-3 h-7 w-7 text-emerald-600" />
      <h3 className="text-sm font-semibold text-emerald-950">{title}</h3>
      <p className="mt-1 max-w-md text-sm leading-6 text-emerald-800">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function SkeletonTable({
  columns = 5,
  rows = 6,
}: {
  columns?: number;
  rows?: number;
}) {
  return (
    <div className="overflow-hidden border border-slate-200 bg-white" role="status" aria-label="Carregando tabela">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="border-slate-200 hover:bg-slate-50">
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={index} className="h-10">
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="border-slate-100 hover:bg-transparent">
              {Array.from({ length: columns }).map((_, columnIndex) => (
                <TableCell key={columnIndex}>
                  <Skeleton className={cn("h-5", columnIndex === 0 ? "w-40" : "w-24")} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function FormSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="border border-slate-200 bg-white p-5">
      <div className="mb-5 border-b border-slate-100 pb-3">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
        {description ? <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function FieldGroup({ children, columns = 2 }: { children: React.ReactNode; columns?: 1 | 2 | 3 }) {
  return <div className={cn("grid gap-4", columns === 1 && "grid-cols-1", columns === 2 && "md:grid-cols-2", columns === 3 && "md:grid-cols-3")}>{children}</div>;
}

export function EntityDrawer({
  title,
  subtitle,
  open,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/25" onClick={onClose}>
      <aside className="ml-auto flex h-full w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-5">{children}</div>
      </aside>
    </div>
  );
}

export function SaveBar({
  state,
  onSaveDraft,
  onPublish,
  publishAction,
  disabledReason,
}: {
  state: "saved" | "saving" | "unsaved" | "published" | "error";
  onSaveDraft?: () => void;
  onPublish?: () => void;
  publishAction?: React.ReactNode;
  disabledReason?: string;
}) {
  const label = {
    saved: "Tudo salvo",
    saving: "Salvando...",
    unsaved: "Alteracoes nao salvas",
    published: "Publicado",
    error: "Erro ao salvar",
  }[state];

  return (
    <div className="sticky bottom-0 z-30 mt-8 border border-slate-200 bg-white/95 p-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          {state === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : state === "saved" || state === "published" ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Clock className="h-4 w-4 text-amber-600" />}
          {label}
          {disabledReason ? <span className="text-xs font-normal text-slate-500">- {disabledReason}</span> : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onSaveDraft ? (
            <Button type="button" variant="outline" size="sm" onClick={onSaveDraft}>
              Salvar rascunho
            </Button>
          ) : null}
          {onPublish ? (
            <Button type="button" size="sm" onClick={onPublish} disabled={!!disabledReason}>
              Publicar
            </Button>
          ) : null}
          {publishAction}
        </div>
      </div>
    </div>
  );
}

export function BlockList({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function BlockEditor({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function PreviewPanel({
  src,
  mode,
  onModeChange,
}: {
  src: string;
  mode: "desktop" | "tablet" | "mobile";
  onModeChange: (mode: "desktop" | "tablet" | "mobile") => void;
}) {
  const width = mode === "desktop" ? "w-full" : mode === "tablet" ? "w-[768px] max-w-full" : "w-[390px] max-w-full";
  return (
    <section className="border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-950">Preview</h2>
        <div className="flex items-center gap-1">
          {(["desktop", "tablet", "mobile"] as const).map((item) => (
            <Button key={item} type="button" variant={mode === item ? "secondary" : "ghost"} size="sm" onClick={() => onModeChange(item)} className="h-8 px-2 text-xs">
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="overflow-auto bg-slate-100 p-4">
        <div className={cn("mx-auto h-[560px] overflow-hidden border border-slate-300 bg-white", width)}>
          <iframe src={src} title="Preview da pagina" className="h-full w-full border-0" />
        </div>
      </div>
    </section>
  );
}

export function AuditTimeline({
  items,
}: {
  items: Array<{ label: string; detail?: string; date?: string | null }>;
}) {
  return (
    <ol className="space-y-3">
      {items.map((item) => (
        <li key={`${item.label}-${item.date ?? ""}`} className="border-l border-slate-200 pl-3">
          <p className="text-sm font-medium text-slate-900">{item.label}</p>
          {item.detail ? <p className="text-xs leading-5 text-slate-600">{item.detail}</p> : null}
          {item.date ? <p className="text-[11px] text-slate-500">{new Date(item.date).toLocaleString("pt-BR")}</p> : null}
        </li>
      ))}
    </ol>
  );
}

export function AdminSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export function PermissionDeniedState() {
  return <EmptyState iconName="lock" title="Acesso restrito" description="Seu papel atual permite visualizar esta area, mas nao executar esta acao critica." />;
}

export function NoResultsState({ description = "Ajuste a busca ou limpe os filtros para ver mais registros." }: { description?: string }) {
  return <EmptyState iconName="searchX" title="Nenhum resultado" description={description} />;
}

export function HiddenState() {
  return <StatusBadge status="archived" label="Oculto" />;
}

export function VisibilityBadge({ visible }: { visible: boolean }) {
  return visible ? <StatusBadge status="success" label="Visivel" /> : <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600"><EyeOff className="h-3 w-3" /> Oculto</span>;
}
