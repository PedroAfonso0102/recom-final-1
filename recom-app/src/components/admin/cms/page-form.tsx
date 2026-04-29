"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CmsFieldRenderer } from "@/cms/editor-fields";
import { createPage, updatePage, createRevision } from "@/server/actions/cms-pages";
import type { CmsPageRow } from "@/cms/types";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lock, Loader2, Check, Cloud, Save } from "lucide-react";
import { useBeforeUnload } from "@/hooks/use-before-unload";
import { useAutosave } from "@/hooks/use-autosave";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { cmsPageFormSchema } from "@/cms/schemas/page.schema";
import { RevisionHistory } from "./revision-history";
import { pageFields } from "@/cms/resources";

type PageFormProps = {
  page?: CmsPageRow;
  mode: "create" | "edit";
  onLiveUpdate?: (data: Record<string, unknown>) => void;
};

export function CmsPageForm({ page, mode, onLiveUpdate }: PageFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isSystem = page?.is_system ?? false;

  const handleFieldChange = () => {
    setIsDirty(true);
    if (formRef.current && onLiveUpdate) {
      const formData = new FormData(formRef.current);
      const data = {
        title: String(formData.get("title") ?? ""),
        slug: String(formData.get("slug") ?? ""),
        seoTitle: String(formData.get("seoTitle") ?? ""),
        seoDescription: String(formData.get("seoDescription") ?? ""),
      };
      onLiveUpdate(data);
    }
  };

  useBeforeUnload(isDirty);

  // Autosave logic
  useAutosave(async () => {
    if (!isDirty || saving || mode === "create" || !page) return;
    
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const payload = {
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

      const parsed = cmsPageFormSchema.safeParse(payload);
      if (!parsed.success) return; // Don't autosave invalid data

      const data = { ...parsed.data, id: page.id };
      const result = await updatePage(data);
      if (result.success) {
        setIsDirty(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    }
  }, 5000, isDirty);


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setSaveSuccess(false);
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
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

    // Client-side validation
    const parsed = cmsPageFormSchema.safeParse(payload);
    if (!parsed.success) {
      const errors: Record<string, string[]> = {};
      parsed.error.issues.forEach((err) => {
        const path = err.path[0] as string;
        if (!errors[path]) errors[path] = [];
        errors[path].push(err.message);
      });
      setFieldErrors(errors);
      setError("Verifique os campos destacados abaixo.");
      setSaving(false);
      return;
    }

    const data = mode === "edit" 
      ? { ...parsed.data, id: page?.id ?? "" } 
      : parsed.data;

    const result = mode === "edit" ? await updatePage(data) : await createPage(data);

    if (!result.success) {
      setFieldErrors(result.fieldErrors ?? {});
      setError(result.formError ?? "Erro tecnico: Verifique os campos e tente novamente.");
      setSaving(false);
      return;
    }

    if (mode === "edit" && page) {
      await createRevision(page.id, data, "Edicao manual");
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
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4 sticky top-0 z-10 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <CardTitle className="text-sm font-bold text-slate-900">Configuracoes da Pagina</CardTitle>
            <div className="flex items-center gap-2">
              {saving ? (
                <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground animate-pulse">
                  <Loader2 className="h-2.5 w-2.5 animate-spin" /> Salvando...
                </span>
              ) : isDirty ? (
                <span className="flex items-center gap-1.5 text-[10px] text-amber-600 font-bold">
                  <AlertCircle className="h-2.5 w-2.5" /> Pendente
                </span>
              ) : saveSuccess ? (
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold">
                  <Check className="h-2.5 w-2.5" /> Salvo
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                  <Cloud className="h-2.5 w-2.5" /> Atualizado
                </span>
              )}
            </div>
          </div>
          {isSystem && (
            <Badge variant="secondary" className="gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 border-blue-100">
              <Lock className="h-3 w-3" />
              Sistema
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {mode === "edit" && page && (
             <RevisionHistory pageId={page.id} onRestore={() => router.refresh()} />
          )}
          <Button 
            form="page-form"
            type="submit" 
            size="sm"
            disabled={saving || (!isDirty && !error)} 
            className={cn(
              "h-8 px-4 text-[10px] font-bold gap-2 transition-all shadow-sm", 
              saveSuccess ? "bg-emerald-500 hover:bg-emerald-600" : "bg-recom-600 hover:bg-recom-700"
            )}
          >
            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
            {mode === "create" ? "Criar" : "Salvar"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form 
          id="page-form"
          ref={formRef}
          onSubmit={handleSubmit} 
          onChange={handleFieldChange}
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
              Campos protegidos: Alguns valores nao podem ser alterados para garantir a integridade do sistema.
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
                      error={fieldErrors[field.name]}
                      onChange={handleFieldChange}
                    />
                    {isReadOnly && (
                      <input type="hidden" name={field.name} value={defaults[field.name as keyof typeof defaults]} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom actions removed in favor of header actions for cleaner UX */}
        </form>
      </CardContent>
    </Card>
  );
}
