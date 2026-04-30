export type SupplierInspectorIssueSeverity = "error" | "warning" | "info";

export type SupplierInspectorTab =
  | "general"
  | "catalogs"
  | "productLines"
  | "media"
  | "layout"
  | "seo";

export type SupplierInspectorIssue = {
  id: string;
  severity: SupplierInspectorIssueSeverity;
  label: string;
  description?: string;
  tab: SupplierInspectorTab;
  fieldPath?: string;
};
