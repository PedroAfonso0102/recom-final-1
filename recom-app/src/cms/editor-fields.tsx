"use client";

import React from "react";
import type { CmsFieldDefinition } from "./types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MediaPickerDialog } from "@/components/admin/MediaPickerDialog";
import type { MediaAsset } from "@/server/actions/media";
import { Image as ImageIcon, X, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { Reorder } from "framer-motion";

type FieldRendererProps = {
  field: CmsFieldDefinition;
  defaultValue?: unknown;
  value?: unknown;
  onChange?: (value: unknown) => void;
  error?: string[];
};

export function CmsFieldRenderer({ field, defaultValue, value, onChange, error }: FieldRendererProps) {
  const isControlled = onChange !== undefined;
  const currentVal = isControlled ? value : defaultValue;
  const hasError = error && error.length > 0;

  const baseClassName = cn(
    "mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2",
    hasError 
      ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
      : "border-border focus:border-primary focus:ring-primary/20"
  );

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
          name={isControlled ? undefined : field.name}
          value={isControlled ? ((value as string) ?? "") : undefined}
          defaultValue={isControlled ? undefined : (defaultValue as string)}
          onChange={isControlled ? (e) => onChange(e.target.value) : undefined}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          className={cn(baseClassName, "min-h-[120px]")}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select 
          name={isControlled ? undefined : field.name}
          value={isControlled ? ((value as string) ?? "") : undefined}
          defaultValue={isControlled ? undefined : ((defaultValue as string) ?? "")}
          onChange={isControlled ? (e) => onChange(e.target.value) : undefined}
          className={baseClassName}
        >
          <option value="">Selecione</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "checkbox" || field.type === "switch") {
      const checked = isControlled 
        ? (!!value) 
        : (defaultValue === "true" || defaultValue === true);

      return (
        <div className="flex items-center space-x-2 py-2">
          <input
            type="checkbox"
            name={isControlled ? undefined : field.name}
            checked={isControlled ? checked : undefined}
            defaultChecked={isControlled ? undefined : checked}
            onChange={isControlled ? (e) => onChange(e.target.checked) : undefined}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-muted-foreground">{field.description || field.label}</span>
        </div>
      );
    }

    if (field.type === "list") {
      return <CmsListField field={field} defaultValue={currentVal} value={value} onChange={onChange} />;
    }

    if (field.type === "number") {
      return (
        <input
          name={isControlled ? undefined : field.name}
          value={isControlled ? ((value as string) ?? "") : undefined}
          defaultValue={isControlled ? undefined : (defaultValue as string)}
          onChange={isControlled ? (e) => onChange(e.target.value) : undefined}
          placeholder={field.placeholder}
          type="number"
          className={baseClassName}
        />
      );
    }

    if (field.type === "media") {
      return <CmsMediaField field={field} defaultValue={currentVal} value={value} onChange={onChange} />;
    }

    return (
      <input
        name={isControlled ? undefined : field.name}
        value={isControlled ? ((value as string) ?? "") : undefined}
        defaultValue={isControlled ? undefined : (defaultValue as string)}
        onChange={isControlled ? (e) => onChange(e.target.value) : undefined}
        placeholder={field.placeholder}
        type="text"
        className={baseClassName}
      />
    );
  };

  return (
    <div className={cn("space-y-1.5", (field.type === "textarea" || field.type === "media" || field.type === "list") ? "md:col-span-2" : "")}>
      {field.type !== "checkbox" && field.type !== "switch" && labelElement}
      {renderInput()}
      {hasError && (
        <p className="text-[10px] font-medium text-destructive px-0.5 animate-in fade-in slide-in-from-top-1">
          {error[0]}
        </p>
      )}
      {field.description && !["checkbox", "switch", "media", "list"].includes(field.type) && (
        <p className="text-[10px] text-muted-foreground px-0.5">{field.description}</p>
      )}
    </div>
  );
}

function CmsMediaField({ field, defaultValue, value, onChange }: { field: CmsFieldDefinition; defaultValue?: unknown; value?: unknown; onChange?: (val: unknown) => void }) {
  const isControlled = onChange !== undefined;
  const [internalValue, setInternalValue] = React.useState(typeof defaultValue === "string" ? defaultValue : "");
  const [selectedMedia, setSelectedMedia] = React.useState<MediaAsset | null>(null);
  const [open, setOpen] = React.useState(false);

  const currentValue = (isControlled ? (value ?? "") : internalValue) as string;

  const updateValue = (val: string) => {
    if (isControlled) {
      onChange(val);
    } else {
      setInternalValue(val);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (selectedMedia) setSelectedMedia(null);
  }, [defaultValue, isControlled, selectedMedia]);

  return (
    <div className="space-y-3 rounded-xl border border-border bg-muted/20 p-4">
      {!isControlled && <input type="hidden" name={field.name} value={currentValue} />}

      <div className="flex items-start gap-4">
        <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
          {currentValue ? (
            <img src={currentValue} alt={field.label} className="h-full w-full object-cover" />
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
              {selectedMedia?.file_name || currentValue || "Nenhuma imagem selecionada"}
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
                updateValue("");
                setSelectedMedia(null);
              }}
              disabled={!currentValue}
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
          value={currentValue}
          onChange={(event) => {
            updateValue(event.target.value);
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
          updateValue(asset.public_url);
          setSelectedMedia(asset);
        }}
      />
    </div>
  );
}

function CmsListField({ field, defaultValue, value, onChange }: { field: CmsFieldDefinition; defaultValue?: unknown; value?: unknown; onChange?: (val: unknown) => void }) {
  const isControlled = onChange !== undefined;
  
  const [internalItems, setInternalItems] = React.useState<(Record<string, unknown> & { _id: string })[]>(() => {
    const raw = isControlled ? value : defaultValue;
    let parsed: Record<string, unknown>[] = [];
    if (Array.isArray(raw)) parsed = raw;
    else if (typeof raw === "string") {
      try { 
        const p = JSON.parse(raw);
        if (Array.isArray(p)) parsed = p;
      } catch { parsed = []; }
    }
    // Ensure all items have a stable ID for Reorder
    return parsed.map(item => ({ ...item, _id: (typeof item._id === 'string' && item._id) ? item._id : Math.random().toString(36).substring(7) }));
  });

  const items = (isControlled ? (value || []) : internalItems) as (Record<string, unknown> & { _id: string })[];

  const updateItems = (newItems: (Record<string, unknown> & { _id: string })[]) => {
    if (isControlled) {
      onChange(newItems);
    } else {
      setInternalItems(newItems);
    }
  };

  const addItem = () => {
    const newItem: Record<string, unknown> & { _id: string } = {
      _id: Math.random().toString(36).substring(7)
    };
    field.itemFields?.forEach(f => {
      newItem[f.name] = "";
    });
    updateItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    updateItems(items.filter((item) => item._id !== id));
  };

  const moveItemUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    updateItems(newItems);
  };

  const moveItemDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    updateItems(newItems);
  };

  const updateItemValue = (id: string, name: string, val: unknown) => {
    const newItems = items.map((item) => 
      item._id === id ? { ...item, [name]: val } : item
    );
    updateItems(newItems);
  };

  return (
    <div className="space-y-3 rounded-md border border-border bg-muted/20 p-3">
      {!isControlled && <input type="hidden" name={field.name} value={JSON.stringify(items.map(({ _id, ...rest }) => rest))} />}
      
      <Reorder.Group 
        axis="y" 
        values={items} 
        onReorder={updateItems}
        className="space-y-3"
      >
        {items.map((item, index) => (
          <Reorder.Item 
            key={String(item._id)} 
            value={item}
            className="relative rounded-md border border-border bg-white p-3 shadow-sm group cursor-default"
          >
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 pt-1">
                <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 transition-colors">
                  <GripVertical className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => moveItemUp(index)}
                    disabled={index === 0}
                    className="text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:text-slate-400"
                    title="Mover para cima"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItemDown(index)}
                    disabled={index === items.length - 1}
                    className="text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:text-slate-400"
                    title="Mover para baixo"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(String(item._id))}
                  className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                  title="Remover item"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid flex-1 gap-4">
                {field.itemFields?.map(itemField => (
                   <CmsFieldRenderer 
                     key={itemField.name}
                     field={itemField}
                     value={item[itemField.name]}
                     onChange={(val) => updateItemValue(String(item._id), itemField.name, val)}
                   />
                ))}
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        className="w-full border-dashed py-4 bg-white/50 hover:bg-white"
      >
        + Adicionar {field.label.toLowerCase()}
      </Button>
    </div>
  );
}
