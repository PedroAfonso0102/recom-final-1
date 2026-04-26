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

