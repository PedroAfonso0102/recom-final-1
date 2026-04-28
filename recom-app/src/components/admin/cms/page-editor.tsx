"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronRight, Eye, GripVertical, Plus, Search } from "lucide-react";

import { AuditTimeline, BlockEditor, BlockList, EmptyState, PageHeader, PreviewPanel, SaveBar, StatusBadge, VisibilityBadge } from "@/components/admin/admin-kit";
import { Button } from "@/components/ui/button";
import { CmsPageForm } from "./page-form";
import { CmsSectionForm } from "./section-form";
import { SectionReorderButtons } from "./section-reorder-buttons";
import { PublishPageButton } from "./publish-page-button";
import { cn } from "@/lib/utils";
import { CmsPageRow, CmsSectionRow } from "@/cms/types";

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

export function CmsPageEditor({ pageData, showPageMeta = true }: CmsPageEditorProps) {
  const { page, sections } = pageData;
  const [activeId, setActiveId] = useState<string | "new" | "settings" | "seo" | "advanced" | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [saveState, setSaveState] = useState<"saved" | "unsaved" | "published">(
    page.status === "published" ? "published" : "saved"
  );

  const publicPath = page.slug === HOME_CMS_SLUG ? "/" : `/${page.slug}`;
  const activeSection = sections.find((section) => section.id === activeId) ?? null;
  const pageIssues = useMemo(() => {
    const issues: string[] = [];
    if (!page.seo_title) issues.push("Titulo SEO pendente");
    if (!page.seo_description) issues.push("Descricao SEO pendente");
    if (sections.length === 0) issues.push("A pagina nao tem blocos");
    if (sections.some((section) => section.status !== "published")) issues.push("Ha blocos em rascunho");
    return issues;
  }, [page.seo_description, page.seo_title, sections]);

  function markChanged() {
    setSaveState("unsaved");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Editor editorial"
        title={page.title}
        description={`URL ${publicPath}. Edite um bloco por vez; blocos fechados mostram status, visibilidade e pendencias.`}
        actions={
          <>
            <Button asChild variant="outline" size="sm"><Link href="/admin/pages">Voltar ao inventario</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href={`/admin/preview/${page.slug}`} target="_blank"><Eye className="h-4 w-4" /> Abrir preview</Link></Button>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)_430px]">
        <aside className="space-y-4">
          <section className="border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-950">Estrutura da pagina</h2>
              <Button type="button" size="sm" variant="outline" onClick={() => setActiveId(activeId === "new" ? null : "new")}>
                <Plus className="h-4 w-4" /> Bloco
              </Button>
            </div>

            <div className="p-3">
              {sections.length === 0 ? (
                <EmptyState title="Sem blocos" description="Adicione o primeiro bloco para construir a pagina." />
              ) : (
                <BlockList>
                  {sections.map((section, index) => {
                    const ids = sections.map((item) => item.id);
                    const moveUpOrder = index > 0 ? ids.map((id, currentIndex) => (currentIndex === index - 1 ? ids[index] : currentIndex === index ? ids[index - 1] : id)) : undefined;
                    const moveDownOrder = index < sections.length - 1 ? ids.map((id, currentIndex) => (currentIndex === index + 1 ? ids[index] : currentIndex === index ? ids[index + 1] : id)) : undefined;
                    const pending = sectionPending(section);
                    const active = activeId === section.id;

                    return (
                      <div key={section.id} className={cn("border border-slate-200 bg-white", active && "border-slate-950")}>
                        <button type="button" className="flex w-full items-start gap-3 p-3 text-left" onClick={() => setActiveId(active ? null : section.id)}>
                          <GripVertical className="mt-1 h-4 w-4 text-slate-400" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="truncate text-sm font-semibold text-slate-950">{index + 1}. {section.component_type}</p>
                              {active ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              <StatusBadge status={section.status} />
                              <VisibilityBadge visible={section.visibility === "visible"} />
                            </div>
                            <p className="mt-2 text-xs leading-5 text-slate-600">
                              {pending.length > 0 ? `Pendencias: ${pending.join(", ")}` : "Sem pendencias aparentes"}
                            </p>
                          </div>
                        </button>
                        <div className="border-t border-slate-100 px-3 py-2">
                          <SectionReorderButtons pageId={page.id} moveUpOrder={moveUpOrder} moveDownOrder={moveDownOrder} />
                        </div>
                      </div>
                    );
                  })}
                </BlockList>
              )}
            </div>
          </section>

          <section className="border border-slate-200 bg-white p-3">
            <button type="button" onClick={() => setActiveId(activeId === "settings" ? null : "settings")} className="flex w-full items-center justify-between px-1 py-2 text-sm font-semibold text-slate-950">
              Configuracoes editoriais
              {activeId === "settings" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            <button type="button" onClick={() => setActiveId(activeId === "seo" ? null : "seo")} className="flex w-full items-center justify-between px-1 py-2 text-sm font-semibold text-slate-950">
              SEO e compartilhamento
              {activeId === "seo" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            <button type="button" onClick={() => setActiveId(activeId === "advanced" ? null : "advanced")} className="flex w-full items-center justify-between px-1 py-2 text-sm font-semibold text-slate-950">
              Avancado
              {activeId === "advanced" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </section>
        </aside>

        <main className="min-w-0 space-y-4">
          {activeId === null ? (
            <EmptyState
              title="Selecione um bloco"
              description="A Home pode ser editada sem ver todos os blocos abertos. Escolha um item da estrutura para abrir apenas aquele bloco."
              action={<Button type="button" size="sm" onClick={() => setActiveId(sections[0]?.id ?? "new")}>{sections.length > 0 ? "Abrir primeiro bloco" : "Criar bloco"}</Button>}
            />
          ) : null}

          {activeId === "new" ? (
            <BlockEditor title="Novo bloco">
              <CmsSectionForm pageId={page.id} sortOrder={sections.length} onSaveSuccess={() => setSaveState("saved")} onLiveUpdate={markChanged} />
            </BlockEditor>
          ) : null}

          {activeSection ? (
            <BlockEditor title={`Editar bloco: ${activeSection.component_type}`}>
              <CmsSectionForm pageId={page.id} section={activeSection} sortOrder={activeSection.sort_order} onSaveSuccess={() => setSaveState("saved")} onLiveUpdate={markChanged} />
            </BlockEditor>
          ) : null}

          {activeId === "settings" && showPageMeta ? (
            <BlockEditor title="Configuracoes editoriais">
              <CmsPageForm page={page} mode="edit" onLiveUpdate={markChanged} />
            </BlockEditor>
          ) : null}

          {activeId === "seo" ? (
            <BlockEditor title="SEO e compartilhamento">
              <CmsPageForm page={page} mode="edit" onLiveUpdate={markChanged} />
              <div className="mt-4 border border-slate-200 bg-slate-50 p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-950"><Search className="h-4 w-4" /> Preview Google</h3>
                <div className="mt-3 max-w-xl bg-white p-4">
                  <p className="text-xs text-slate-600">recom.com.br{publicPath}</p>
                  <p className="mt-1 text-lg text-blue-800">{page.seo_title || page.title}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-700">{page.seo_description || "Adicione uma descricao para melhorar o clique organico."}</p>
                </div>
              </div>
            </BlockEditor>
          ) : null}

          {activeId === "advanced" ? (
            <BlockEditor title="Avancado">
              <div className="space-y-3 text-sm text-slate-700">
                <p>Campos tecnicos concentrados para reduzir ruido durante a edicao normal.</p>
                <dl className="grid gap-2 md:grid-cols-2">
                  <div><dt className="font-semibold text-slate-950">ID</dt><dd className="break-all font-mono text-xs">{page.id}</dd></div>
                  <div><dt className="font-semibold text-slate-950">Template</dt><dd>{page.template_key || "Nao definido"}</dd></div>
                  <div><dt className="font-semibold text-slate-950">Tipo</dt><dd>{page.page_type}</dd></div>
                  <div><dt className="font-semibold text-slate-950">Rota</dt><dd>{page.route_pattern}</dd></div>
                </dl>
              </div>
            </BlockEditor>
          ) : null}
        </main>

        <aside className="space-y-4">
          <PreviewPanel src={`/admin/preview/${page.slug}?minimal=true`} mode={previewMode} onModeChange={setPreviewMode} />

          <section className="border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-950">Checklist de publicacao</h2>
            <div className="mt-3 space-y-2">
              {pageIssues.length === 0 ? (
                <p className="flex items-center gap-2 text-sm text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Pronto para publicar.</p>
              ) : (
                pageIssues.map((issue) => (
                  <p key={issue} className="flex items-center gap-2 text-sm text-amber-800"><AlertTriangle className="h-4 w-4" /> {issue}</p>
                ))
              )}
            </div>
          </section>

          <section className="border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-950">Auditoria</h2>
            <div className="mt-3">
              <AuditTimeline
                items={[
                  { label: "Criada", detail: page.created_by ? `Por ${page.created_by}` : "Autor nao registrado", date: page.created_at },
                  { label: "Ultima atualizacao", detail: page.updated_by ? `Por ${page.updated_by}` : "Editor nao registrado", date: page.updated_at },
                  { label: page.published_at ? "Publicada" : "Ainda nao publicada", date: page.published_at },
                ]}
              />
            </div>
          </section>
        </aside>
      </div>

      <SaveBar
        state={saveState}
        onSaveDraft={() => setSaveState("saved")}
        publishAction={<PublishPageButton pageId={page.id} />}
        disabledReason={sections.length === 0 ? "adicione ao menos um bloco" : undefined}
      />
    </div>
  );
}
