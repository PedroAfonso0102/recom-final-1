"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ChevronRight, 
  Eye, 
  GripVertical, 
  Plus, 
  Search, 
  Layers, 
  Settings, 
  ShieldAlert,
  Monitor
} from "lucide-react";

import { 
  BlockEditor, 
  BlockList, 
  EmptyState, 
  PreviewPanel, 
  StatusBadge, 
  VisibilityBadge 
} from "@/components/admin/admin-kit";
import { Button } from "@/components/ui/button";
import { CmsPageForm } from "./page-form";
import { CmsSectionForm } from "./section-form";
import { SectionReorderButtons } from "./section-reorder-buttons";
import { PublishPageButton } from "./publish-page-button";
import { cn } from "@/lib/utils";
import { CmsPageRow, CmsSectionRow } from "@/cms/types";

// Admin Shell Components
import { AdminEditorShell, AdminEditorTab } from "../editor";
import { PageInspector } from "./PageInspector";

const HOME_CMS_SLUG = "home";

type CmsPageEditorProps = {
  pageData: {
    page: CmsPageRow;
    sections: CmsSectionRow[];
  };
  showPageMeta?: boolean;
};

function sectionPending(section: CmsSectionRow) {
  const pending: string[] = [];
  if (section.status !== "published") pending.push("rascunho");
  if (section.visibility !== "visible") pending.push("oculto");
  if (!section.anchor_id) pending.push("sem ancora");
  if (!section.props || Object.keys(section.props as Record<string, unknown>).length === 0) pending.push("sem conteudo");
  return pending;
}

const cmsTabs: AdminEditorTab[] = [
  { id: "sections", label: "Estrutura", icon: Layers },
  { id: "settings", label: "Configurações", icon: Settings },
  { id: "seo", label: "SEO", icon: Search },
  { id: "advanced", label: "Avançado", icon: ShieldAlert },
];

export function CmsPageEditor({ pageData, showPageMeta = true }: CmsPageEditorProps) {
  const { page, sections } = pageData;
  const [activeTabId, setActiveTabId] = useState("sections");
  const [activeSectionId, setActiveSectionId] = useState<string | "new" | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [saveState, setSaveState] = useState<"saved" | "unsaved" | "published">(
    page.status === "published" ? "published" : "saved"
  );

  const publicPath = page.slug === HOME_CMS_SLUG ? "/" : `/${page.slug}`;
  const activeSection = sections.find((section) => section.id === activeSectionId) ?? null;

  const pageIssues = useMemo(() => {
    const issues: string[] = [];
    if (!page.seo_title) issues.push("Título SEO pendente");
    if (!page.seo_description) issues.push("Descrição SEO pendente");
    if (sections.length === 0) issues.push("A página não tem blocos");
    if (sections.some((section) => section.status !== "published")) issues.push("Há blocos em rascunho");
    return issues;
  }, [page.seo_description, page.seo_title, sections]);

  function markChanged() {
    setSaveState("unsaved");
  }

  const handlePreview = () => {
    window.open(`/admin/preview/${page.slug}`, '_blank');
  };

  return (
    <AdminEditorShell
      title={page.title}
      entityType="página cms"
      status={page.status as any}
      tabs={cmsTabs}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
      onSave={() => setSaveState("saved")}
      onPreview={handlePreview}
      onPublish={() => {}} // Controlled by PublishPageButton in inspector or header
      isDirty={saveState === "unsaved"}
      isSaving={false}
      lastSaved={page.updated_at ? new Date(page.updated_at) : undefined}
      backHref="/admin/pages"
      inspector={
        <div className="space-y-6">
          <PageInspector page={page} sectionsCount={sections.length} issues={pageIssues} />
          <div className="px-5">
            <PublishPageButton pageId={page.id} />
          </div>
          <div className="px-5">
            <PreviewPanel src={`/admin/preview/${page.slug}?minimal=true`} mode={previewMode} onModeChange={setPreviewMode} />
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {activeTabId === "sections" && (
          <div className="grid gap-6 grid-cols-1 xl:grid-cols-[320px_1fr]">
            {/* Sidebar de Blocos Interna */}
            <div className="space-y-4">
              <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/50">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Blocos</h2>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 px-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5"
                    onClick={() => setActiveSectionId(activeSectionId === "new" ? null : "new")}
                  >
                    <Plus className="mr-1 h-3 w-3" /> Adicionar
                  </Button>
                </div>

                <div className="p-2">
                  {sections.length === 0 ? (
                    <EmptyState title="Sem blocos" description="Adicione o primeiro bloco." />
                  ) : (
                    <div className="space-y-1">
                      {sections.map((section, index) => {
                        const ids = sections.map((item) => item.id);
                        const moveUpOrder = index > 0 ? ids.map((id, currentIndex) => (currentIndex === index - 1 ? ids[index] : currentIndex === index ? ids[index - 1] : id)) : undefined;
                        const moveDownOrder = index < sections.length - 1 ? ids.map((id, currentIndex) => (currentIndex === index + 1 ? ids[index] : currentIndex === index ? ids[index + 1] : id)) : undefined;
                        const pending = sectionPending(section);
                        const active = activeSectionId === section.id;

                        return (
                          <div key={section.id} className={cn("group rounded-xl border border-transparent transition-all", active ? "border-slate-200 bg-slate-50 shadow-inner" : "hover:bg-slate-50")}>
                            <button type="button" className="flex w-full items-start gap-3 p-3 text-left" onClick={() => setActiveSectionId(active ? null : section.id)}>
                              <GripVertical className="mt-1 h-3.5 w-3.5 text-slate-300" />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <p className={cn("truncate text-xs font-bold uppercase tracking-tight", active ? "text-primary" : "text-slate-700")}>
                                    {index + 1}. {section.component_type}
                                  </p>
                                  {active ? <ChevronDown className="h-3.5 w-3.5 text-primary" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-300" />}
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                  <StatusBadge status={section.status} />
                                </div>
                                {pending.length > 0 && (
                                   <p className="mt-2 text-[9px] font-bold text-amber-600 uppercase tracking-tight">
                                     {pending.length} pendências
                                   </p>
                                )}
                              </div>
                            </button>
                            {active && (
                              <div className="px-3 pb-3 pt-1 border-t border-slate-100">
                                <SectionReorderButtons pageId={page.id} moveUpOrder={moveUpOrder} moveDownOrder={moveDownOrder} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Área de Edição do Bloco */}
            <div className="min-w-0">
               {activeSectionId === null && (
                 <div className="bg-white rounded-3xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-sm border-dashed">
                   <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center">
                      <Monitor className="h-6 w-6 text-slate-300" />
                   </div>
                   <div>
                     <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Editor de Blocos</h3>
                     <p className="text-xs text-slate-500 mt-1">Selecione um bloco na lista lateral para começar a editar o conteúdo.</p>
                   </div>
                 </div>
               )}

               {activeSectionId === "new" && (
                 <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Novo Bloco</h3>
                   <CmsSectionForm pageId={page.id} sortOrder={sections.length} onSaveSuccess={() => setSaveState("saved")} onLiveUpdate={markChanged} />
                 </div>
               )}

               {activeSection && (
                 <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Editando: {activeSection.component_type}</h3>
                      <StatusBadge status={activeSection.status} />
                   </div>
                   <CmsSectionForm pageId={page.id} section={activeSection} sortOrder={activeSection.sort_order} onSaveSuccess={() => setSaveState("saved")} onLiveUpdate={markChanged} />
                 </div>
               )}
            </div>
          </div>
        )}

        {activeTabId === "settings" && showPageMeta && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8">Configurações Editoriais</h3>
            <CmsPageForm page={page} mode="edit" onLiveUpdate={markChanged} />
          </div>
        )}

        {activeTabId === "seo" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-10">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8">SEO e Compartilhamento</h3>
              <CmsPageForm page={page} mode="edit" onLiveUpdate={markChanged} />
            </div>
            
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8">
              <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6">
                <Search className="h-3.5 w-3.5 text-slate-400" /> Preview Google
              </h3>
              <div className="max-w-xl bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-[11px] text-slate-500 font-medium">recom.com.br{publicPath}</p>
                <p className="mt-1 text-lg font-semibold text-blue-700 hover:underline cursor-pointer">
                  {page.seo_title || page.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {page.seo_description || "Adicione uma descrição para melhorar o clique orgânico nos resultados de busca."}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTabId === "advanced" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8">Configurações Avançadas</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ID da Página</p>
                <code className="block p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-mono text-slate-600 break-all">
                  {page.id}
                </code>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Template Key</p>
                <p className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700">
                  {page.template_key || "padrão"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Page Type</p>
                <p className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 uppercase">
                  {page.page_type}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Route Pattern</p>
                <p className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-mono text-slate-700">
                  {page.route_pattern}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminEditorShell>
  );
}
