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
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-sm font-bold text-slate-900">Configurações da Página</CardTitle>
          <p className="text-xs text-muted-foreground font-medium">Informações estruturais e metadados de SEO.</p>
        </div>
        {isSystem && (
          <Badge variant="secondary" className="gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 border-blue-100">
            <Lock className="h-3 w-3" />
            Sistema
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          onChange={() => setIsDirty(true)}
          className="space-y-6"
        >
          {error && (
            <div className="rounded-lg border border-destructive/10 bg-destructive/5 p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-destructive">Falha ao salvar</p>
                <p className="text-[11px] font-medium text-destructive/80">{error}</p>
              </div>
            </div>
          )}

          {isSystem && (
            <div className="flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50/30 p-4 text-[11px] text-blue-700 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Campos protegidos: Alguns valores não podem ser alterados para garantir a integridade do sistema.
            </div>
          )}

          <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
            {pageFields.map((field) => {
              const isReadOnly = isSystem && (field.name === "slug" || field.name === "pageType" || field.name === "templateKey" || field.name === "routePattern");

              return (
                <div key={field.name} className={cn("space-y-1.5", field.type === "textarea" ? "md:col-span-2" : "")}>
                  <div className="flex items-center justify-between px-0.5">
                    <span className="block text-xs font-semibold text-slate-500">
                      {field.label}
                    </span>
                    {isReadOnly && <Lock className="h-3 w-3 text-slate-300" />}
                  </div>
                  <div className={cn("transition-opacity", isReadOnly && "pointer-events-none opacity-50")}>
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

          <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
            <Button 
              type="submit" 
              disabled={saving} 
              className={cn(
                "h-10 px-8 text-xs font-bold gap-2 transition-all shadow-sm", 
                saveSuccess ? "bg-emerald-500 hover:bg-emerald-600" : ""
              )}
            >
              {saving ? "Salvando..." : saveSuccess ? "Salvo com Sucesso!" : mode === "create" ? "Criar Página" : "Salvar Alterações"}
            </Button>
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-600 animate-in fade-in slide-in-from-left-2">
                Conteúdo persistido no banco de dados.
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
