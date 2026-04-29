import type { Json } from "@/lib/database.types";
import type { ResourceConfig, ResourceOperation } from "./types";
import { writeAuditEvent } from "@/lib/audit/write-audit-event";

export type ResourceHookContext<T> = {
  resource: ResourceConfig;
  operation: Exclude<ResourceOperation, "read">;
  previousDoc?: T | null;
  doc?: T | null;
  actorId?: string | null;
  metadata?: Record<string, Json | undefined>;
};

export type ResourceHooks<T> = {
  beforeCreate?: (ctx: ResourceHookContext<T>) => Promise<T> | T;
  beforeUpdate?: (ctx: ResourceHookContext<T>) => Promise<T> | T;
  beforePublish?: (ctx: ResourceHookContext<T>) => Promise<T> | T;
  afterChange?: (ctx: ResourceHookContext<T>) => Promise<void> | void;
  afterDelete?: (ctx: ResourceHookContext<T>) => Promise<void> | void;
};

function getDocumentId(doc: unknown) {
  if (!doc || typeof doc !== "object" || !("id" in doc)) {
    return null;
  }

  const value = (doc as { id?: unknown }).id;
  return typeof value === "string" || typeof value === "number" ? String(value) : null;
}

export function createAuditResourceHooks<T>(): ResourceHooks<T> {
  async function write(ctx: ResourceHookContext<T>) {
    const event = ctx.resource.audit?.events[ctx.operation];

    if (!event) {
      return;
    }

    await writeAuditEvent({
      event,
      actorId: ctx.actorId,
      entityType: ctx.resource.slug,
      entityId: getDocumentId(ctx.doc) ?? getDocumentId(ctx.previousDoc),
      metadata: ctx.metadata,
    });
  }

  return {
    afterChange: write,
    afterDelete: write,
  };
}
