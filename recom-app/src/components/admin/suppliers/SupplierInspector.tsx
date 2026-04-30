"use client";

import React from "react";
import { Supplier } from "@/cms/schemas/supplier.schema";
import { AdminEditorInspector } from "../editor/AdminEditorInspector";
import { ExternalLink, AlertCircle, AlertTriangle, ChevronRight } from "lucide-react";
import { getSupplierInspectorIssues, getSupplierCompletionScore } from "./supplier-inspector-validation";
import { SupplierInspectorIssue, SupplierInspectorTab } from "./types";
import { cn } from "@/lib/utils";

interface SupplierInspectorProps {
  supplier: Supplier;
  onNavigateToTab?: (tab: SupplierInspectorTab, fieldPath?: string) => void;
}

export function SupplierInspector({ supplier, onNavigateToTab }: SupplierInspectorProps) {
  const issues = getSupplierInspectorIssues(supplier);
  const completionScore = getSupplierCompletionScore(supplier, issues);

  const errors = issues.filter(i => i.severity === "error");
  const warnings = issues.filter(i => i.severity === "warning");

  const summary = [
    { label: "Catálogos", value: supplier.catalogs.length },
    { label: "Mídias", value: supplier.media.length },
    { label: "Qualidade", value: `${completionScore}%` },
    { label: "Status", value: supplier.status === 'active' || supplier.status === 'published' ? 'Ativo' : 'Rascunho' },
  ];

  return (
    <AdminEditorInspector summary={summary}>
      <div className="space-y-6">
        {/* Progress Score */}
        <div className="space-y-2">
           <div className="flex justify-between items-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Qualidade do Cadastro</p>
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded",
                completionScore > 80 ? "bg-emerald-50 text-emerald-600" : 
                completionScore > 50 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
              )}>
                {completionScore}%
              </span>
           </div>
           <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500",
                  completionScore > 80 ? "bg-emerald-500" : 
                  completionScore > 50 ? "bg-amber-500" : "bg-red-500"
                )}
                style={{ width: `${completionScore}%` }}
              />
           </div>
        </div>

        {/* Errors Section */}
        {errors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-red-600">
              <AlertCircle className="h-3 w-3" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Erros Críticos ({errors.length})</p>
            </div>
            <div className="space-y-1">
              {errors.map(issue => (
                <IssueItem key={issue.id} issue={issue} onNavigate={onNavigateToTab} />
              ))}
            </div>
          </div>
        )}

        {/* Warnings Section */}
        {warnings.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-amber-600">
              <AlertTriangle className="h-3 w-3" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Avisos ({warnings.length})</p>
            </div>
            <div className="space-y-1">
              {warnings.map(issue => (
                <IssueItem key={issue.id} issue={issue} onNavigate={onNavigateToTab} />
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">URL Pública</p>
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-[11px] font-mono text-slate-600 truncate">
              recom.com/f/{supplier.slug || "..."}
            </span>
            <ExternalLink className="h-3 w-3 text-slate-300 group-hover:text-slate-900 transition-colors" />
          </div>
        </div>
      </div>
    </AdminEditorInspector>
  );
}

function IssueItem({ 
  issue, 
  onNavigate 
}: { 
  issue: SupplierInspectorIssue, 
  onNavigate?: (tab: SupplierInspectorTab, fieldPath?: string) => void 
}) {
  return (
    <button 
      onClick={() => onNavigate?.(issue.tab, issue.fieldPath)}
      className="w-full text-left p-2 rounded-lg hover:bg-slate-50 group transition-colors border border-transparent hover:border-slate-100 flex items-start justify-between gap-2"
    >
      <div className="space-y-0.5">
        <p className="text-[11px] font-semibold text-slate-800 leading-tight">{issue.label}</p>
        {issue.description && (
          <p className="text-[9px] text-slate-500 leading-snug">{issue.description}</p>
        )}
      </div>
      <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-slate-900 shrink-0 mt-0.5" />
    </button>
  );
}
