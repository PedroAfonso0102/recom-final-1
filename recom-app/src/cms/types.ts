import type { ComponentType } from "react";
import type { z } from "zod";
import type { Database } from "@/lib/database.types";

export type CmsPageRow = Database["public"]["Tables"]["pages"]["Row"];
export type CmsPageInsert = Database["public"]["Tables"]["pages"]["Insert"];
export type CmsPageUpdate = Database["public"]["Tables"]["pages"]["Update"];

export type CmsSectionRow = Database["public"]["Tables"]["page_sections"]["Row"];
export type CmsSectionInsert = Database["public"]["Tables"]["page_sections"]["Insert"];
export type CmsSectionUpdate = Database["public"]["Tables"]["page_sections"]["Update"];

export type CmsPageVersionRow = Database["public"]["Tables"]["page_versions"]["Row"];
export type CmsPageVersionInsert = Database["public"]["Tables"]["page_versions"]["Insert"];

export type CmsRevisionRow = {
  id: string;
  page_id: string;
  snapshot: unknown;
  created_by: string | null;
  created_at: string;
  is_autosave: boolean;
  label: string | null;
};

export type CmsPageStatus = "draft" | "published" | "archived";
export type CmsSectionStatus = "draft" | "published" | "hidden" | "archived";
export type CmsSectionVisibility = "visible" | "hidden";

export type ActionResult<T = unknown> = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  formError?: string;
  data?: T;
};

export type CmsFieldDefinition = {
  name: string;
  label: string;
  type: "text" | "textarea" | "url" | "select" | "switch" | "checkbox" | "list" | "media" | "number";
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  rows?: number;
  itemFields?: CmsFieldDefinition[];
};

export type EditableComponentDefinition = {
  type: string;
  label: string;
  description: string;
  category: "layout" | "content" | "commerce" | "trust" | "navigation" | "media" | "cta";
  component: ComponentType<never>;
  schema: z.ZodTypeAny;
  defaults: Record<string, unknown>;
  fields: CmsFieldDefinition[];
  allowedVariants?: string[];
  previewConfig?: {
    layout: "full" | "contained" | "split";
    backgroundColor?: string;
  };
  permissions?: string[];
  revisionStrategy?: "snapshot" | "incremental";
};

export type CmsPageWithSections = {
  page: CmsPageRow;
  sections: CmsSectionRow[];
};
