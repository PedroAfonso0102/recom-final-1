import type { Json } from "@/lib/database.types";

export type ResourceOperation = "create" | "read" | "update" | "delete" | "publish" | "archive";

export type ResourceFieldType =
  | "text"
  | "textarea"
  | "select"
  | "boolean"
  | "date"
  | "json"
  | "relationship"
  | "upload";

export type ResourceFieldOption = {
  label: string;
  value: string;
};

export type ResourceField = {
  name: string;
  label: string;
  type: ResourceFieldType;
  required?: boolean;
  options?: ResourceFieldOption[];
  relationTo?: string;
  hasMany?: boolean;
  admin?: {
    description?: string;
    readOnly?: boolean;
    position?: "main" | "sidebar";
  };
};

export type ResourceAccessContext = {
  actorId?: string | null;
  role?: "admin" | "editor" | "user" | string | null;
  operation: ResourceOperation;
};

export type ResourceAccess = {
  canRead?: (ctx: ResourceAccessContext) => boolean | Promise<boolean>;
  canCreate?: (ctx: ResourceAccessContext) => boolean | Promise<boolean>;
  canUpdate?: (ctx: ResourceAccessContext) => boolean | Promise<boolean>;
  canDelete?: (ctx: ResourceAccessContext) => boolean | Promise<boolean>;
  canPublish?: (ctx: ResourceAccessContext) => boolean | Promise<boolean>;
};

export type ResourceAuditEvents = Partial<Record<Exclude<ResourceOperation, "read">, string>>;

export type ResourceConfig = {
  slug: string;
  label: string;
  description?: string;
  fields: ResourceField[];
  access?: ResourceAccess;
  audit?: {
    events: ResourceAuditEvents;
  };
  admin?: {
    group?: string;
    description?: string;
    defaultColumns?: string[];
  };
  defaults?: Record<string, Json | undefined>;
};

export function isAdminRole(ctx: ResourceAccessContext) {
  return ctx.role === "admin";
}

export function canManageResource(ctx: ResourceAccessContext) {
  return ctx.role === "admin" || ctx.role === "editor";
}
