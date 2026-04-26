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
  { name: "ogImageUrl", label: "OG image URL", type: "url" },
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

  const isSystem = page?.is_system ?? false;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
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
      setError(result.formError ?? Object.values(result.fieldErrors ?? {})[0]?.[0] ?? "Não foi possível salvar.");
      setSaving(false);
      return;
    }

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
        <CardTitle className="text-base uppercase tracking-[0.2em]">Dados da página</CardTitle>
        {isSystem && (
          <Badge variant="secondary" className="gap-1 px-2 py-1">
            <Lock className="h-3 w-3" />
            Página de Sistema
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}

          {isSystem && (
            <div className="flex items-center gap-2 rounded-md border border-blue-500/20 bg-blue-500/5 p-3 text-[11px] text-blue-500">
              <AlertCircle className="h-4 w-4" />
              Esta é uma página essencial do sistema. Alguns campos como slug e tipo são protegidos.
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {pageFields.map((field) => {
              const isReadOnly = isSystem && (field.name === "slug" || field.name === "pageType" || field.name === "templateKey" || field.name === "routePattern");
              
              return (
                <label key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {field.label}
                    </span>
                    {isReadOnly && <Lock className="h-3 w-3 text-muted-foreground/50" />}
                  </div>
                  <div className={isReadOnly ? "pointer-events-none opacity-60" : ""}>
                    <CmsFieldRenderer 
                      field={field} 
                      defaultValue={defaults[field.name as keyof typeof defaults]} 
                    />
                    {isReadOnly && (
                      <input type="hidden" name={field.name} value={defaults[field.name as keyof typeof defaults]} />
                    )}
                  </div>
                </label>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : mode === "create" ? "Criar página" : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

