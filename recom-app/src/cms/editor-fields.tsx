"use client";

import type { CmsFieldDefinition } from "./types";
import { cn } from "@/lib/utils";

type FieldRendererProps = {
  field: CmsFieldDefinition;
  defaultValue?: string;
};

export function CmsFieldRenderer({ field, defaultValue }: FieldRendererProps) {
  const baseClassName =
    "mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

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
          defaultChecked={defaultValue === "true" || defaultValue === true}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span className="text-sm text-muted-foreground">{field.description || field.label}</span>
      </div>
    );
  }

  if (field.type === "list") {
    return (
      <CmsListField field={field} defaultValue={defaultValue} />
    );
  }

  return (
    <input
      name={field.name}
      defaultValue={defaultValue}
      placeholder={field.placeholder}
      type={field.type === "url" ? "url" : "text"}
      className={baseClassName}
    />
  );
}

function CmsListField({ field, defaultValue }: { field: CmsFieldDefinition; defaultValue?: any }) {
  const [items, setItems] = React.useState<any[]>(() => {
    if (Array.isArray(defaultValue)) return defaultValue;
    if (typeof defaultValue === "string") {
      try { return JSON.parse(defaultValue); } catch { return []; }
    }
    return [];
  });

  const addItem = () => {
    const newItem = {};
    field.itemFields?.forEach(f => {
      // @ts-ignore
      newItem[f.name] = "";
    });
    setItems([...items, newItem]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, name: string, value: any) => {
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
                     value={item[itemField.name] || ""}
                     onChange={(e) => updateItem(index, itemField.name, e.target.value)}
                   />
                 ) : itemField.type === "select" ? (
                    <select
                      className="mt-1 w-full rounded border border-border px-2 py-1 text-sm"
                      value={item[itemField.name] || ""}
                      onChange={(e) => updateItem(index, itemField.name, e.target.value)}
                    >
                      <option value="">Selecione</option>
                      {itemField.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                 ) : (
                   <input
                     className="mt-1 w-full rounded border border-border px-2 py-1 text-sm"
                     value={item[itemField.name] || ""}
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

