"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CmsFieldRenderer } from "@/cms/editor-fields";
import { createPage, updatePage } from "@/server/actions/cms-pages";
import type { CmsPageRow } from "@/cms/types";
import type { CmsFieldDefinition } from "@/cms/types";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lock } from "lucide-react";
import { useBeforeUnload } from "@/hooks/use-before-unload";
import { useAutosave } from "@/hooks/use-autosave";
import { cn } from "@/lib/utils";
import { useRef } from "react";
const pageFields: CmsFieldDefinition[] = [
  { name: "title", label: "Título", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true, placeholder: "home" },
  { name: "routePattern", label: "Padrão de Rota", type: "text", placeholder: "/exemplo/[slug]" },
  {
    name: "pageType",
    label: "Tipo de Página",
    type: "select",
    options: [
      { label: "Estática", value: "static" },
      { label: "Template Dinâmico", value: "dynamic_template" },
      { label: "Landing Page", value: "landing" },
    ],
  },
  { name: "templateKey", label: "Chave do Template", type: "text", placeholder: "home, supplier_detail, etc." },
  { name: "description", label: "Descrição Interna", type: "textarea", rows: 2 },
  { name: "seoTitle", label: "SEO title", type: "text" },
  { name: "seoDescription", label: "SEO description", type: "textarea", rows: 3 },
  { name: "ogImageUrl", label: "Imagem social / OG", type: "media", description: "Escolha uma imagem da biblioteca ou cole uma URL pública." },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Rascunho", value: "draft" },
      { label: "Publicado", value: "published" },
      { label: "Arquivado", value: "archived" },
    ],
  },
];

type PageFormProps = {
  page?: CmsPageRow;
  mode: "create" | "edit";
};

export function CmsPageForm({ page, mode }: PageFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isSystem = page?.is_system ?? false;

  useBeforeUnload(isDirty);

  // Autosave logic
  useAutosave(async () => {
    if (!isDirty || saving || mode === "create") return;
    
    // We only autosave existing pages to avoid accidental creations
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const payload = {
        id: page?.id ?? "",
        title: String(formData.get("title") ?? ""),
        slug: String(formData.get("slug") ?? ""),
        routePattern: String(formData.get("routePattern") ?? ""),
        pageType: String(formData.get("pageType") ?? "static"),
        templateKey: String(formData.get("templateKey") ?? ""),
        isSystem: isSystem,
        isDynamicTemplate: String(formData.get("pageType")) === "dynamic_template",
        description: String(formData.get("description") ?? ""),
        seoTitle: String(formData.get("seoTitle") ?? ""),
        seoDescription: String(formData.get("seoDescription") ?? ""),
        ogImageUrl: String(formData.get("ogImageUrl") ?? ""),
        status: String(formData.get("status") ?? "draft"),
      };
      
      const result = await updatePage(payload);
      if (result.ok) {
        setIsDirty(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    }
  }, 5000, isDirty);


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaveSuccess(false);
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      ...(mode === "edit" ? { id: page?.id ?? "" } : {}),
      title: String(formData.get("title") ?? ""),
      slug: String(formData.get("slug") ?? ""),
      routePattern: String(formData.get("routePattern") ?? ""),
      pageType: String(formData.get("pageType") ?? "static"),
      templateKey: String(formData.get("templateKey") ?? ""),
      isSystem: isSystem,
      isDynamicTemplate: String(formData.get("pageType")) === "dynamic_template",
      description: String(formData.get("description") ?? ""),
      seoTitle: String(formData.get("seoTitle") ?? ""),
      seoDescription: String(formData.get("seoDescription") ?? ""),
      ogImageUrl: String(formData.get("ogImageUrl") ?? ""),
      status: String(formData.get("status") ?? "draft"),
    };

    const result = mode === "edit" ? await updatePage(payload) : await createPage(payload);

    if (!result.ok) {
      setError(result.formError ?? Object.values(result.fieldErrors ?? {})[0]?.[0] ?? "Erro técnico: Verifique os campos e tente novamente.");
      setSaving(false);
      return;
    }

    setSaveSuccess(true);
    setIsDirty(false);
    setTimeout(() => setSaveSuccess(false), 3000);

    
    router.refresh();
    if (mode === "create" && result.data?.id) {
      router.push(`/admin/pages/${result.data.id}`);
    }
    setSaving(false);
  }

  const defaults = {
    title: page?.title ?? "",
    slug: page?.slug ?? "",
    routePattern: page?.route_pattern ?? "",
    pageType: page?.page_type ?? "static",
    templateKey: page?.template_key ?? "",
    description: page?.description ?? "",
    seoTitle: page?.seo_title ?? "",
    seoDescription: page?.seo_description ?? "",
    ogImageUrl: page?.og_image_url ?? "",
    status: page?.status ?? "draft",
  };

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base uppercase tracking-[0.2em]">Dados da página</CardTitle>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Informações estruturais e de SEO.</p>
        </div>
        {isSystem && (
          <Badge variant="secondary" className="gap-1 px-2 py-1 text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-700 border-blue-200">
            <Lock className="h-3 w-3" />
            Página de Sistema
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          onChange={() => setIsDirty(true)}
          className="space-y-6"
        >


          {error && (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 flex gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-destructive">Falha ao salvar</p>
                <p className="text-xs font-bold text-destructive/80">{error}</p>
              </div>
            </div>
          )}

          {isSystem && (
            <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-[10px] text-blue-700 font-bold uppercase tracking-widest">
              <AlertCircle className="h-5 w-5 shrink-0" />
              Proteção Ativa: Esta página é essencial para o funcionamento do motor. Alguns campos estão bloqueados para evitar quebras.
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {pageFields.map((field) => {
              const isReadOnly = isSystem && (field.name === "slug" || field.name === "pageType" || field.name === "templateKey" || field.name === "routePattern");

              return (
                <div key={field.name} className={cn("space-y-2", field.type === "textarea" ? "md:col-span-2" : "")}>
                  <div className="flex items-center justify-between">
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                      {field.label}
                    </span>
                    {isReadOnly && <Lock className="h-3 w-3 text-muted-foreground/30" />}
                  </div>
                  <div className={cn("transition-opacity", isReadOnly && "pointer-events-none opacity-40 grayscale")}>
                    <CmsFieldRenderer 
                      field={field} 
                      defaultValue={defaults[field.name as keyof typeof defaults]} 
                    />
                    {isReadOnly && (
                      <input type="hidden" name={field.name} value={defaults[field.name as keyof typeof defaults]} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <Button type="submit" disabled={saving} className={cn("h-12 px-10 text-[10px] font-black uppercase tracking-widest gap-2 transition-all", saveSuccess ? "bg-emerald-500 hover:bg-emerald-600" : "")}>
              {saving ? (
                <>Salvando...</>
              ) : saveSuccess ? (
                <>Alterações Salvas!</>
              ) : (
                mode === "create" ? "Criar Página" : "Salvar Alterações"
              )}
            </Button>
            {saveSuccess && (
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest animate-in fade-in slide-in-from-left-2">
                Sucesso! O conteúdo foi persistido.
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>

  );
}
