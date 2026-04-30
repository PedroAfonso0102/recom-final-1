"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Eye, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminStatusBadge, AdminEditorStatus } from "./AdminStatusBadge";
import { cn } from "@/lib/utils";

interface AdminEditorHeaderProps {
  title: string;
  entityType: string;
  status: AdminEditorStatus;
  lastSaved?: Date;
  isDirty?: boolean;
  isSaving?: boolean;
  onSave: () => void;
  onPreview?: () => void;
  onPublish?: () => void;
  backHref?: string;
}

export function AdminEditorHeader({
  title,
  entityType,
  status,
  lastSaved,
  isDirty,
  isSaving,
  onSave,
  onPreview,
  onPublish,
  backHref = "..",
}: AdminEditorHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4 min-w-0">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-slate-500 hover:text-slate-900">
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {entityType}
            </span>
            <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
            <h1 className="text-sm font-bold text-slate-900 truncate max-w-[300px]">
              {title || "Sem título"}
            </h1>
            <AdminStatusBadge status={status} className="ml-2" />
          </div>

          {isDirty && (
            <div className="flex items-center gap-1.5 ml-4">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-medium text-amber-600 uppercase tracking-tight">
                Alterações não salvas
              </span>
            </div>
          )}

          {!isDirty && lastSaved && (
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight ml-4">
              Salvo às {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onPreview && (
            <Button
              variant="outline"
              size="sm"
              onClick={onPreview}
              className="h-9 gap-2 text-xs font-bold border-slate-200 hover:bg-slate-50"
            >
              <Eye className="h-3.5 w-3.5" />
              PREVIEW
            </Button>
          )}

          <Button
            onClick={onSave}
            disabled={isSaving || !isDirty}
            size="sm"
            className={cn(
              "h-9 gap-2 text-xs font-bold shadow-sm transition-all",
              isDirty 
                ? "bg-slate-900 text-white hover:bg-slate-800" 
                : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            )}
          >
            <Save className={cn("h-3.5 w-3.5", isSaving && "animate-spin")} />
            {isSaving ? "SALVANDO..." : "SALVAR"}
          </Button>

          {onPublish && (
            <Button
              onClick={onPublish}
              size="sm"
              className="h-9 gap-2 text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
            >
              <Globe className="h-3.5 w-3.5" />
              PUBLICAR
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
