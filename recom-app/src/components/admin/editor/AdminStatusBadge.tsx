"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type AdminEditorStatus =
  | "draft"
  | "published"
  | "unpublished_changes"
  | "archived"
  | "invalid"
  | "deleted";

interface AdminStatusBadgeProps {
  status: AdminEditorStatus;
  className?: string;
}

const statusConfig: Record<
  AdminEditorStatus,
  { label: string; className: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  draft: {
    label: "Rascunho",
    variant: "secondary",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
  published: {
    label: "Publicado",
    variant: "default",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  unpublished_changes: {
    label: "Alterações pendentes",
    variant: "outline",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  archived: {
    label: "Arquivado",
    variant: "outline",
    className: "bg-slate-50 text-slate-400 border-slate-200",
  },
  invalid: {
    label: "Inválido",
    variant: "destructive",
    className: "bg-red-50 text-red-700 border-red-100",
  },
  deleted: {
    label: "Excluído",
    variant: "destructive",
    className: "bg-slate-900 text-white border-transparent",
  },
};

export function AdminStatusBadge({ status, className }: AdminStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft;

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
