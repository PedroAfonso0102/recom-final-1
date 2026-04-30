"use client";

import React from "react";
import { CmsPageRow } from "@/cms/types";
import { AdminEditorInspector } from "../editor/AdminEditorInspector";
import { AuditTimeline } from "../admin-kit";

interface PageInspectorProps {
  page: CmsPageRow;
  sectionsCount: number;
  issues: string[];
}

export function PageInspector({ page, sectionsCount, issues }: PageInspectorProps) {
  const summary = [
    { label: "Blocos", value: sectionsCount },
    { label: "Template", value: page.template_key || "Padrão" },
    { label: "Tipo", value: page.page_type },
  ];

  return (
    <AdminEditorInspector summary={summary} validationErrors={issues}>
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Histórico</p>
          <AuditTimeline
            items={[
              { label: "Criada", detail: page.created_by ? `Por ${page.created_by}` : "Autor não registrado", date: page.created_at },
              { label: "Última atualização", detail: page.updated_by ? `Por ${page.updated_by}` : "Editor não registrado", date: page.updated_at },
              { label: page.published_at ? "Publicada" : "Ainda não publicada", date: page.published_at },
            ]}
          />
        </div>
      </div>
    </AdminEditorInspector>
  );
}
