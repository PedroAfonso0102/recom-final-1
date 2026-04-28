"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CmsFieldRenderer } from "@/cms/editor-fields";
import { componentRegistry, type CmsComponentType } from "@/cms/component-registry";
import type { CmsSectionRow } from "@/cms/types";
import { createSection, updateSection, createRevision } from "@/server/actions/cms-pages";
import { useBeforeUnload } from "@/hooks/use-before-unload";
import { useAutosave } from "@/hooks/use-autosave";
import { cn } from "@/lib/utils";
import { extractPropsFromFormData } from "@/cms/utils";
import { useRef } from "react";
import { Check, Cloud, Loader2, Save, AlertCircle } from "lucide-react";


type SectionFormProps = {
  pageId: string;
  section?: CmsSectionRow;
  sortOrder: number;
  onSaveSuccess?: () => void;
  onLiveUpdate?: (data: Record<string, unknown>) => void;
};

export function CmsSectionForm({ pageId, section, sortOrder, onSaveSuccess, onLiveUpdate }: SectionFormProps) {
  const router = useRouter();
  const [componentType, setComponentType] = useState<CmsComponentType>(
    (section?.component_type as CmsComponentType) ?? "HeroSection"
  );
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [props, setProps] = useState<Record<string, unknown>>((section?.props as Record<string, unknown>) ?? {});
  const formRef = useRef<HTMLFormElement>(null);

  useBeforeUnload(isDirty);

  // Auto-save logic
  useAutosave(async () => {
    if (!isDirty || saving || !section) return;
    handleSave(true); // true = silent/background save
  }, 5000, isDirty);

  const definition = componentRegistry[componentType];
  const defaults = (section?.props ?? definition.defaults) as Record<string, unknown>;

  async function handleSave(isAutosave = false) {
    if (!section) return;
    setError(null);
    setFieldErrors({});
    if (!isAutosave) setSaving(true);

    // Validate
    if (definition.schema) {
      const result = definition.schema.safeParse(props);
      if (!result.success) {
        const errors: Record<string, string[]> = {};
        result.error.issues.forEach((err) => {
          const path = err.path[0] as string;
          if (!errors[path]) errors[path] = [];
          errors[path].push(err.message);
        });
        setFieldErrors(errors);
        if (!isAutosave) setError("Verifique os erros no formulário.");
        setSaving(false);
        return;
      }
    }

    const result = await updateSection({
      id: section.id,
      pageId: section.page_id,
      componentType: section.component_type as CmsComponentType,
      props,
    });

    if (!result.success) {
      if (!isAutosave) {
        setFieldErrors(result.fieldErrors ?? {});
        setError(result.formError ?? "Erro ao salvar seção.");
      }
      setSaving(false);
      return;
    }

    // If it's a manual save or significant change, create a revision
    if (!isAutosave) {
      await createRevision(section.page_id, { props }, "Edição manual da seção");
    }

    setSaveSuccess(true);
    setIsDirty(false);
    if (!isAutosave) {
      setTimeout(() => setSaveSuccess(false), 3000);
      setSaving(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (section) {
      await handleSave(false);
      return;
    }

    setError(null);
    setFieldErrors({});
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const propsData = extractPropsFromFormData(formData, definition.fields);

    const parsed = definition.schema.safeParse(propsData);
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

    const data = {
      pageId,
      componentType,
      sortOrder: Number(formData.get("sortOrder") ?? sortOrder),
      status: String(formData.get("status") ?? "draft"),
      visibility: String(formData.get("visibility") ?? "visible"),
      anchorId: String(formData.get("anchorId") ?? ""),
      props: parsed.data,
    };

    const result = await createSection(data);

    if (result.success) {
      onSaveSuccess?.();
      router.refresh();
      setSaving(false);
    } else {
      setFieldErrors(result.fieldErrors ?? {});
      setError(result.formError ?? "Erro ao salvar seção. Verifique os dados.");
      setSaving(false);
    }
  }

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      onChange={() => setIsDirty(true)}
      className="space-y-8"
    >
      {section && (
        <div className="flex items-center justify-between border-b border-border bg-white p-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{definition.label}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                {saving ? (
                  <span className="flex items-center gap-1.5, text-xs text-muted-foreground animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin" /> Salvando...
                  </span>
                ) : isDirty ? (
                  <span className="flex items-center gap-1.5, text-xs text-amber-600 font-medium">
                    <AlertCircle className="h-3 w-3" /> Alterações pendentes
                  </span>
                ) : saveSuccess ? (
                  <span className="flex items-center gap-1.5, text-xs text-emerald-600 font-medium">
                    <Check className="h-3 w-3" /> Salvo
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5, text-xs text-muted-foreground">
                    <Cloud className="h-3 w-3" /> Todas as alterações salvas
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              type="button"
              onClick={() => handleSave(false)} 
              disabled={saving || (!isDirty && !error)}
              className="bg-primary hover:bg-primary/90 transition-all shadow-md active:scale-95"
            >
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Salvar Agora
            </Button>
          </div>
        </div>
      )}

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
              <CmsFieldRenderer 
                key={field.name} 
                field={field} 
                defaultValue={defaults[field.name]}
                error={fieldErrors[field.name]}
                onChange={(val) => {
                  const newProps = { ...props, [field.name]: val };
                  setProps(newProps);
                  setIsDirty(true);
                  onLiveUpdate?.(newProps);
                }}
              />
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
