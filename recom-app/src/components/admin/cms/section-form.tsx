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
import { useBeforeUnload } from "@/hooks/use-before-unload";
import { useAutosave } from "@/hooks/use-autosave";
import { cn } from "@/lib/utils";
import { useRef } from "react";


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
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useBeforeUnload(isDirty);

  // Autosave logic
  useAutosave(async () => {
    if (!isDirty || saving || !section) return;

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const activeDefinition = componentRegistry[componentType];
      const props = Object.fromEntries(
        activeDefinition.fields.map((field) => {
          const value = formData.get(field.name);
          if (field.type === "list") {
            try {
              return [field.name, JSON.parse(String(value ?? "[]"))];
            } catch {
              return [field.name, []];
            }
          }
          if (field.type === "checkbox") {
            return [field.name, value === "on"];
          }
          if (field.type === "number") {
            return [field.name, value ? Number(value) : (field.required ? 0 : null)];
          }
          return [field.name, String(value ?? "")];
        })
      );

      const payload = {
        id: section.id,
        pageId,
        componentType,
        sortOrder: Number(formData.get("sortOrder") ?? sortOrder),
        status: String(formData.get("status") ?? "draft"),
        visibility: String(formData.get("visibility") ?? "visible"),
        anchorId: String(formData.get("anchorId") ?? ""),
        props,
      };

      const result = await updateSection(payload);
      if (result.ok) {
        setIsDirty(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    }
  }, 5000, isDirty);



  const definition = componentRegistry[componentType];
  const defaults = (section?.props ?? definition.defaultProps) as Record<string, unknown>;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaveSuccess(false);
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const props = Object.fromEntries(
      definition.fields.map((field) => {
        const value = formData.get(field.name);
        if (field.type === "list") {
          try {
            return [field.name, JSON.parse(String(value ?? "[]"))];
          } catch {
            return [field.name, []];
          }
        }
        if (field.type === "checkbox") {
          return [field.name, value === "on"];
        }
        if (field.type === "number") {
          return [field.name, value ? Number(value) : (field.required ? 0 : null)];
        }
        return [field.name, String(value ?? "")];
      })
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
      setError(result.formError ?? Object.values(result.fieldErrors ?? {})[0]?.[0] ?? "Erro ao salvar seção. Verifique os dados.");
      setSaving(false);
      return;
    }

    setSaveSuccess(true);
    setIsDirty(false);
    setTimeout(() => setSaveSuccess(false), 3000);

    router.refresh();
    setSaving(false);
  }

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      onChange={() => setIsDirty(true)}
      className="space-y-8"
    >
      {error && (
        <div className="rounded-lg border border-destructive/10 bg-destructive/5 p-4 flex gap-3">
          <div className="space-y-1">
            <p className="text-xs font-bold text-destructive">Falha na Seção</p>
            <p className="text-[11px] font-medium text-destructive/80">{error}</p>
          </div>
        </div>
      )}

      {!section && (
        <div className="space-y-1.5">
          <span className="block text-xs font-semibold text-slate-500 px-0.5">
            Tipo de Bloco Estrutural
          </span>
          <select
            name="componentType"
            value={componentType}
            onChange={(event) => setComponentType(event.target.value as CmsComponentType)}
            className="w-full h-11 rounded-lg border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/5 shadow-sm appearance-none"
          >
            {Object.values(componentRegistry).map((entry) => (
              <option key={entry.type} value={entry.type}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-8">
        {/* Conteúdo Dinâmico */}
        <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-200/60">
          <div className="mb-6 flex items-center gap-2 border-b border-slate-200/60 pb-3">
             <div className="h-4 w-1 bg-primary rounded-full" />
             <h4 className="text-xs font-bold text-slate-800">Conteúdo do Bloco</h4>
          </div>
          <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
            {definition.fields.map((field) => (
              <div key={field.name} className={cn("space-y-1.5", field.type === "textarea" ? "md:col-span-2" : "")}>
                <span className="block text-xs font-semibold text-slate-500 px-0.5">
                  {field.label}
                </span>
                <CmsFieldRenderer field={field} defaultValue={String(defaults[field.name] ?? "")} />
              </div>
            ))}
          </div>
        </div>

        {/* Configurações Técnicas */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
             <div className="h-4 w-1 bg-slate-300 rounded-full" />
             <h4 className="text-xs font-bold text-slate-800">Configurações de Exibição</h4>
          </div>
          <div className="grid gap-x-6 gap-y-5 md:grid-cols-3">
            <div className="space-y-1.5">
              <span className="block text-xs font-semibold text-slate-500 px-0.5">
                Ordem
              </span>
              <input
                name="sortOrder"
                type="number"
                defaultValue={section?.sort_order ?? sortOrder}
                className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/5"
              />
            </div>
            <div className="space-y-1.5">
              <span className="block text-xs font-semibold text-slate-500 px-0.5">
                Status
              </span>
              <select
                name="status"
                defaultValue={section?.status ?? "draft"}
                className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/5"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
                <option value="archived">Arquivado</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <span className="block text-xs font-semibold text-slate-500 px-0.5">
                Visibilidade
              </span>
              <select
                name="visibility"
                defaultValue={section?.visibility ?? "visible"}
                className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/5"
              >
                <option value="visible">Visível</option>
                <option value="hidden">Oculta</option>
              </select>
            </div>
            <div className="md:col-span-3 space-y-1.5">
              <span className="block text-xs font-semibold text-slate-500 px-0.5">
                Anchor ID (Link de Âncora)
              </span>
              <input
                name="anchorId"
                placeholder="ex: contato, diferenciais"
                defaultValue={section?.anchor_id ?? ""}
                className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/5"
              />
            </div>
          </div>
        </div>
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
          {saving ? "Salvando..." : saveSuccess ? "Seção Salva!" : section ? "Salvar Seção" : "Criar Seção"}
        </Button>
        {saveSuccess && (
           <span className="text-xs font-semibold text-emerald-600 animate-in fade-in slide-in-from-left-2">
            Pronto para visualização.
          </span>
        )}
      </div>
    </form>
  );
}
