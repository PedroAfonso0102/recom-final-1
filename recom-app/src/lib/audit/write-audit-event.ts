import type { Json } from "@/lib/database.types";
import { createAuditLog } from "@/lib/audit";

type WriteAuditEventInput = {
  event: string;
  actorId?: string | null;
  entityType: string;
  entityId?: string | number | null;
  metadata?: Record<string, Json | undefined>;
};

export async function writeAuditEvent(input: WriteAuditEventInput) {
  const normalized = {
    action: input.event,
    actor_id: input.actorId,
    entity_type: input.entityType,
    entity_id: input.entityId ? String(input.entityId) : null,
    metadata: input.metadata ?? {},
  };

  await createAuditLog(normalized);

  return normalized;
}
