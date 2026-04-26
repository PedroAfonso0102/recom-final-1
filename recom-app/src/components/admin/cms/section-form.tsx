"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CmsFieldRenderer } from "@/cms/editor-fields";
import { componentRegistry, type CmsComponentType } from "@/cms/component-registry";
import type { CmsSectionRow } from "@/cms/types";
import { createSection, updateSection } from "@/server/actions/cms-pages";

type SectionFormProps = {
  pageId: string;
  section?: CmsSectionRow;
  sortOrder: number;
};

export function CmsSectionForm({ pageId, section, sortOrder }: SectionFormProps) {
  const router = useRouter();
  const [componentType, setComponentType] = useState<CmsComponentType>(
    (section?.component_type as CmsComponentType) ?? "HeroSection"
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const definition = componentRegistry[componentType];
  const defaults = (section?.props ?? definition.defaultProps) as Record<string, unknown>;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const activeDefinition = componentRegistry[componentType];
    const props = Object.fromEntries(
      activeDefinition.fields.map((field) => [field.name, String(formData.get(field.name) ?? "")])
    );

    const payload = {
      ...(section ? { id: section.id } : {}),
      pageId,
      componentType,
      sortOrder: Number(formData.get("sortOrder") ?? sortOrder),
      status: String(formData.get("status") ?? "draft"),
      visibility: String(formData.get("visibility") ?? "visible"),
      anchorId: String(formData.get("anchorId") ?? ""),
      props,
    };

    const result = section ? await updateSection(payload) : await createSection(payload);

    if (!result.ok) {
      setError(result.formError ?? Object.values(result.fieldErrors ?? {})[0]?.[0] ?? "Não foi possível salvar.");
      setSaving(false);
      return;
    }

    router.refresh();
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-[0.2em]">
          {section ? "Editar seção" : "Nova seção"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}

          {!section && (
            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Tipo de bloco
              </span>
              <select
                name="componentType"
                value={componentType}
                onChange={(event) => setComponentType(event.target.value as CmsComponentType)}
                className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {Object.values(componentRegistry).map((entry) => (
                  <option key={entry.type} value={entry.type}>
                    {entry.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {definition.fields.map((field) => (
              <label key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {field.label}
                </span>
                <CmsFieldRenderer field={field} defaultValue={String(defaults[field.name] ?? "")} />
              </label>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label>
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Ordem
              </span>
              <input
                name="sortOrder"
                type="number"
                defaultValue={section?.sort_order ?? sortOrder}
                className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label>
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Status
              </span>
              <select
                name="status"
                defaultValue={section?.status ?? "draft"}
                className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
                <option value="hidden">Oculto</option>
                <option value="archived">Arquivado</option>
              </select>
            </label>
            <label>
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Visibilidade
              </span>
              <select
                name="visibility"
                defaultValue={section?.visibility ?? "visible"}
                className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="visible">Visível</option>
                <option value="hidden">Oculta</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Anchor ID
            </span>
            <input
              name="anchorId"
              defaultValue={section?.anchor_id ?? ""}
              className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : section ? "Salvar seção" : "Criar seção"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
