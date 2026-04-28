"use client";

import React from "react";
import type { CmsFieldDefinition } from "./types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MediaPickerDialog } from "@/components/admin/MediaPickerDialog";
import type { MediaAsset } from "@/server/actions/media";
import { Image as ImageIcon, X } from "lucide-react";

type FieldRendererProps = {
  field: CmsFieldDefinition;
  defaultValue?: string;
};

export function CmsFieldRenderer({ field, defaultValue }: FieldRendererProps) {
  const baseClassName =
    "mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  const labelElement = (
    <span className="block text-xs font-semibold text-slate-500 px-0.5">
      {field.label}
      {field.required && <span className="text-destructive ml-1">*</span>}
    </span>
  );

  const renderInput = () => {
    if (field.type === "textarea") {
      return (
        <textarea
          name={field.name}
          defaultValue={defaultValue}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          className={cn(baseClassName, "min-h-[120px]")}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select name={field.name} defaultValue={defaultValue ?? ""} className={baseClassName}>
          <option value="">Selecione</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "checkbox") {
      return (
        <div className="flex items-center space-x-2 py-2">
          <input
            type="checkbox"
            name={field.name}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            defaultChecked={defaultValue === "true" || (defaultValue as any) === true}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-muted-foreground">{field.description || field.label}</span>
        </div>
      );
    }

    if (field.type === "list") {
      return <CmsListField field={field} defaultValue={defaultValue} />;
    }

    if (field.type === "number") {
      return (
        <input
          name={field.name}
          defaultValue={defaultValue}
          placeholder={field.placeholder}
          type="number"
          className={baseClassName}
        />
      );
    }

    if (field.type === "media") {
      return <CmsMediaField field={field} defaultValue={defaultValue} />;
    }

    return (
      <input
        name={field.name}
        defaultValue={defaultValue}
        placeholder={field.placeholder}
        type="text"
        className={baseClassName}
      />
    );
  };

  return (
    <div className={cn("space-y-1.5", field.type === "textarea" || field.type === "media" || field.type === "list" ? "md:col-span-2" : "")}>
      {field.type !== "checkbox" && labelElement}
      {renderInput()}
      {field.description && field.type !== "checkbox" && field.type !== "media" && (
        <p className="text-[10px] text-muted-foreground px-0.5">{field.description}</p>
      )}
    </div>
  );
}

function CmsMediaField({ field, defaultValue }: { field: CmsFieldDefinition; defaultValue?: unknown }) {
  const [value, setValue] = React.useState(typeof defaultValue === "string" ? defaultValue : "");
  const [selectedMedia, setSelectedMedia] = React.useState<MediaAsset | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setValue(typeof defaultValue === "string" ? defaultValue : "");
    setSelectedMedia(null);
  }, [defaultValue]);

  return (
    <div className="space-y-3 rounded-xl border border-border bg-muted/20 p-4">
      <input type="hidden" name={field.name} value={value} />

      <div className="flex items-start gap-4">
        <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={field.label} className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="h-8 w-8" />
              <span className="text-[10px] font-semibold uppercase tracking-widest">Sem imagem</span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Imagem vinculada
            </p>
            <p className="truncate text-sm font-medium text-foreground">
              {selectedMedia?.file_name || value || "Nenhuma imagem selecionada"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" className="gap-2" onClick={() => setOpen(true)}>
              <ImageIcon className="h-3.5 w-3.5" />
              Selecionar mídia
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={() => {
                setValue("");
                setSelectedMedia(null);
              }}
              disabled={!value}
            >
              <X className="h-3.5 w-3.5" />
              Limpar
            </Button>
          </div>

          {field.description && (
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {field.description}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          URL pública
        </span>
        <Input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setSelectedMedia(null);
          }}
          placeholder={field.placeholder || "https://..."}
          className="bg-white"
        />
      </div>

      <MediaPickerDialog
        open={open}
        onOpenChange={setOpen}
        onSelect={(asset) => {
          setValue(asset.public_url);
          setSelectedMedia(asset);
        }}
      />
    </div>
  );
}

function CmsListField({ field, defaultValue }: { field: CmsFieldDefinition; defaultValue?: unknown }) {
  const [items, setItems] = React.useState<Record<string, unknown>[]>(() => {
    if (Array.isArray(defaultValue)) return defaultValue;
    if (typeof defaultValue === "string") {
      try { return JSON.parse(defaultValue); } catch { return []; }
    }
    return [];
  });

  const addItem = () => {
    const newItem: Record<string, unknown> = {};
    field.itemFields?.forEach(f => {
      newItem[f.name] = "";
    });
    setItems([...items, newItem]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, name: string, value: unknown) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [name]: value };
    setItems(newItems);
  };

  return (
    <div className="space-y-3 rounded-md border border-border bg-muted/20 p-3">
      <input type="hidden" name={field.name} value={JSON.stringify(items)} />
      
      {items.map((item, index) => (
        <div key={index} className="relative rounded-md border border-border bg-white p-3 shadow-sm">
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
          >
            &times;
          </button>
          <div className="grid gap-3">
            {field.itemFields?.map(itemField => (
               <div key={itemField.name}>
                 <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{itemField.label}</span>
                 {itemField.type === "textarea" ? (
                   <textarea
                     className="mt-1 w-full rounded border border-border px-2 py-1 text-sm"
                     value={(item[itemField.name] as string) || ""}
                     onChange={(e) => updateItem(index, itemField.name, e.target.value)}
                   />
                 ) : itemField.type === "select" ? (
                    <select
                      className="mt-1 w-full rounded border border-border px-2 py-1 text-sm"
                      value={(item[itemField.name] as string) || ""}
                      onChange={(e) => updateItem(index, itemField.name, e.target.value)}
                    >
                      <option value="">Selecione</option>
                      {itemField.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                 ) : (
                   <input
                     className="mt-1 w-full rounded border border-border px-2 py-1 text-sm"
                     value={(item[itemField.name] as string) || ""}
                     onChange={(e) => updateItem(index, itemField.name, e.target.value)}
                   />
                 )}
               </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full rounded-md border border-dashed border-border py-2 text-xs font-medium hover:bg-muted"
      >
        + Adicionar item
      </button>
    </div>
  );
}

