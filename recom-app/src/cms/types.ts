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

export type CmsPageStatus = "draft" | "published" | "archived";
export type CmsSectionStatus = "draft" | "published" | "hidden" | "archived";
export type CmsSectionVisibility = "visible" | "hidden";

export type ActionResult<T = unknown> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; formError?: string };

export type CmsFieldDefinition = {
  name: string;
  label: string;
  type: "text" | "textarea" | "url" | "select" | "switch";
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  rows?: number;
};

export type EditableComponentDefinition = {
  type: string;
  label: string;
  description: string;
  category: "layout" | "content" | "commerce" | "trust" | "navigation" | "media" | "cta";
  component: ComponentType<any>;
  schema: z.ZodTypeAny;
  defaultProps: Record<string, unknown>;
  fields: CmsFieldDefinition[];
  allowedVariants?: string[];
};

export type CmsPageWithSections = {
  page: CmsPageRow;
  sections: CmsSectionRow[];
};

