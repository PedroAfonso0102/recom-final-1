"use client";

import { useMemo, useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  GripVertical, 
  Plus, 
  Search, 
  Layers, 
  Settings, 
  ShieldAlert,
  Layout
} from "lucide-react";

import { 
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
import { CmsPageRow, CmsPageStatus, CmsSectionRow, CmsSectionStatus } from "@/cms/types";

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
      status={page.status as CmsPageStatus}
      tabs={cmsTabs}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
      onSave={() => {
        setSaveState("saved");
      }}
      onPreview={handlePreview}
      onPublish={() => {}} 
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
      <div className="max-w-5xl mx-auto w-full py-4 px-2">
        {activeTabId === "sections" && (
          <div className="grid gap-8 grid-cols-1 xl:grid-cols-[340px_1fr]">
            {/* Sidebar de Blocos Interna */}
            <div className="space-y-4">
              <section className="rounded-[2.5rem] border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-slate-50/50">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Arquitetura de Blocos</h2>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 rounded-full"
                    onClick={() => setActiveSectionId(activeSectionId === "new" ? null : "new")}
                  >
                    <Plus className="mr-1.5 h-3.5 w-3.5" /> Adicionar
                  </Button>
                </div>

                <div className="p-3">
                  {sections.length === 0 ? (
                    <div className="py-12">
                      <EmptyState title="Sem blocos" description="Adicione o primeiro bloco para começar a construir a página." />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {sections.map((section, index) => {
                        const ids = sections.map((item) => item.id);
                        const moveUpOrder = index > 0 ? ids.map((id, currentIndex) => (currentIndex === index - 1 ? ids[index] : currentIndex === index ? ids[index - 1] : id)) : undefined;
                        const moveDownOrder = index < sections.length - 1 ? ids.map((id, currentIndex) => (currentIndex === index + 1 ? ids[index] : currentIndex === index ? ids[index + 1] : id)) : undefined;
                        const pending = sectionPending(section);
                        const active = activeSectionId === section.id;

                        return (
                          <div key={section.id} className={cn(
                            "group rounded-2xl border transition-all duration-200", 
                            active 
                              ? "border-primary/20 bg-primary/5 shadow-sm ring-1 ring-primary/10" 
                              : "border-transparent hover:bg-slate-50"
                          )}>
                            <button type="button" className="flex w-full items-start gap-4 p-4 text-left" onClick={() => setActiveSectionId(active ? null : section.id)}>
                              <div className="mt-1 flex flex-col items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                <GripVertical className="h-4 w-4 text-slate-400" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <p className={cn(
                                    "truncate text-[11px] font-black uppercase tracking-tight", 
                                    active ? "text-primary" : "text-slate-900"
                                  )}>
                                    {String(index + 1).padStart(2, '0')}. {section.component_type.split('_').join(' ')}
                                  </p>
                                  {active ? <ChevronDown className="h-3.5 w-3.5 text-primary" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400" />}
                                </div>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                  <StatusBadge status={section.status as CmsSectionStatus} />
                                  <VisibilityBadge visible={section.visibility === "visible"} />
                                </div>
                                {pending.length > 0 && (
                                   <div className="mt-3 flex items-center gap-1.5">
                                     <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                                     <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest">
                                       {pending.length} Pendências de Conteúdo
                                     </p>
                                   </div>
                                )}
                              </div>
                            </button>
                            {active && (
                              <div className="px-4 pb-4 pt-2 border-t border-primary/10">
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
            <div className="min-w-0 space-y-6">
               {activeSectionId === null && (
                 <div className="bg-white rounded-[2.5rem] border border-slate-200 border-dashed p-20 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
                   <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center">
                      <Layout className="h-8 w-8 text-slate-300" />
                   </div>
                   <div className="max-w-xs">
                     <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Studio Editorial</h3>
                     <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
                        Selecione um bloco na arquitetura lateral para ajustar componentes, estilos e conteúdos em tempo real.
                     </p>
                   </div>
                 </div>
               )}

               {activeSectionId === "new" && (
                 <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
                   <header className="mb-10">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Injeção de Novo Bloco</h3>
                     <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">Escolha um componente para estender a página</p>
                   </header>
                   <CmsSectionForm pageId={page.id} sortOrder={sections.length} onSaveSuccess={() => setSaveState("saved")} onLiveUpdate={markChanged} />
                 </div>
               )}

               {activeSection && (
                 <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
                   <header className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                      <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Editando Componente</h3>
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mt-1">{activeSection.component_type.split('_').join(' ')}</p>
                      </div>
                      <StatusBadge status={activeSection.status as CmsSectionStatus} />
                   </header>
                   <CmsSectionForm pageId={page.id} section={activeSection} sortOrder={activeSection.sort_order} onSaveSuccess={() => setSaveState("saved")} onLiveUpdate={markChanged} />
                 </div>
               )}
            </div>
          </div>
        )}

        {activeTabId === "settings" && showPageMeta && (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 md:p-16 shadow-sm">
            <header className="mb-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Definições Editoriais</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">Título interno, slug e comportamento de sistema</p>
            </header>
            <CmsPageForm page={page} mode="edit" onLiveUpdate={markChanged} />
          </div>
        )}

        {activeTabId === "seo" && (
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 md:p-16 shadow-sm">
              <header className="mb-12">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">SEO e Indexação</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">Meta tags e cartões de compartilhamento social</p>
              </header>
              <CmsPageForm page={page} mode="edit" onLiveUpdate={markChanged} />
            </div>
            
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 md:p-16 shadow-sm overflow-hidden">
              <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-10">
                <Search className="h-4 w-4 text-slate-400" /> Preview Google Search
              </h3>
              <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="flex items-center gap-2 mb-2">
                   <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">R</div>
                   <p className="text-[12px] text-slate-600 font-medium">https://recom.com.br<span className="text-slate-400">{publicPath}</span></p>
                </div>
                <p className="text-xl font-medium text-blue-800 hover:underline cursor-pointer tracking-tight">
                  {page.seo_title || page.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 font-medium line-clamp-2">
                  {page.seo_description || "Configure uma meta descrição personalizada para atrair mais cliques nos resultados orgânicos."}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTabId === "advanced" && (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 md:p-16 shadow-sm">
            <header className="mb-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Parâmetros de Engenharia</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">ID Único, Rota e Metadados brutos</p>
            </header>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 p-6 rounded-3xl bg-slate-50/50 border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">UUID de Registro</p>
                <p className="text-xs font-mono text-slate-900 truncate bg-white p-3 rounded-xl border border-slate-100">
                  {page.id}
                </p>
              </div>
              <div className="space-y-2 p-6 rounded-3xl bg-slate-50/50 border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Padrão de Rota (Pattern)</p>
                <p className="text-xs font-mono text-slate-900 bg-white p-3 rounded-xl border border-slate-100">
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
