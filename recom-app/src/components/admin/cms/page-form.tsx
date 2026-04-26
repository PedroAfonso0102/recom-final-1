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

const pageFields: CmsFieldDefinition[] = [
  { name: "title", label: "Título", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true, placeholder: "home" },
  { name: "description", label: "Descrição", type: "textarea", rows: 4 },
  { name: "seoTitle", label: "SEO title", type: "text" },
  { name: "seoDescription", label: "SEO description", type: "textarea", rows: 4 },
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      ...(mode === "edit" ? { id: page?.id ?? "" } : {}),
      title: String(formData.get("title") ?? ""),
      slug: String(formData.get("slug") ?? ""),
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
  }

  const defaults = {
    title: page?.title ?? "",
    slug: page?.slug ?? "",
    description: page?.description ?? "",
    seoTitle: page?.seo_title ?? "",
    seoDescription: page?.seo_description ?? "",
    ogImageUrl: page?.og_image_url ?? "",
    status: page?.status ?? "draft",
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base uppercase tracking-[0.2em]">Dados da página</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}

          <div className="grid gap-4 md:grid-cols-2">
            {pageFields.map((field) => (
              <label key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {field.label}
                </span>
                <CmsFieldRenderer field={field} defaultValue={defaults[field.name as keyof typeof defaults]} />
              </label>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : mode === "create" ? "Criar página" : "Salvar rascunho"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
