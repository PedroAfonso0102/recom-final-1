"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Info, AlertCircle, History, ExternalLink } from "lucide-react";

interface AdminEditorInspectorProps {
  children?: React.ReactNode;
  summary?: {
    label: string;
    value: string | number;
  }[];
  validationErrors?: string[];
  className?: string;
}

export function AdminEditorInspector({
  children,
  summary,
  validationErrors,
  className,
}: AdminEditorInspectorProps) {
  return (
    <aside className={cn("w-80 shrink-0 space-y-6", className)}>
      <div className="sticky top-24 space-y-6">
        {/* Sumário Rápido */}
        {summary && summary.length > 0 && (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Info className="h-3.5 w-3.5 text-slate-400" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                Resumo
              </h3>
            </div>
            <div className="space-y-3">
              {summary.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">{item.label}</span>
                  <span className="text-slate-900 font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Validação */}
        {validationErrors && validationErrors.length > 0 && (
          <div className="rounded-2xl border border-red-100 bg-red-50/30 p-5">
            <div className="mb-4 flex items-center gap-2 text-red-600">
              <AlertCircle className="h-3.5 w-3.5" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">
                Pendências
              </h3>
            </div>
            <ul className="space-y-2">
              {validationErrors.map((err, idx) => (
                <li key={idx} className="text-[11px] font-medium text-red-600/80 leading-relaxed flex gap-2">
                  <span className="shrink-0 text-red-300">•</span>
                  {err}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ações Rápidas ou Customizadas */}
        {children && (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <History className="h-3.5 w-3.5 text-slate-400" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                Atividade
              </h3>
            </div>
            {children}
          </div>
        )}

        {/* Links Externos / Logs */}
        <div className="px-5">
           <button className="group flex w-full items-center justify-between py-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors border-t border-slate-100 mt-4">
              <span className="uppercase tracking-widest">Ver Histórico</span>
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
           </button>
        </div>
      </div>
    </aside>
  );
}
