import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/lib/database.types";

export type AuditLogEntry = {
  action: string;
  entity_type: string;
  entity_id: string | null;
  details?: Record<string, Json | undefined>;
  user_id: string;
};

export type ActivityLogEntry = {
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata?: Record<string, Json | undefined>;
  actor_id?: string | null;
};

export function toAuditLogInsert(log: AuditLogEntry | ActivityLogEntry) {
  const isActivityLog = "actor_id" in log;
  const auditLog = log as AuditLogEntry;
  const activityLog = log as ActivityLogEntry;

  return {
    action: log.action,
    entity_type: log.entity_type,
    entity_id: log.entity_id,
    user_id: isActivityLog ? activityLog.actor_id ?? null : auditLog.user_id,
    details: isActivityLog ? activityLog.metadata ?? {} : auditLog.details ?? {},
    created_at: new Date().toISOString(),
  };
}

/**
 * Registra uma acao administrativa na trilha de auditoria.
 * Tambem aceita o vocabulario activity-log: actor_id e metadata.
 */
export async function createAuditLog(log: AuditLogEntry | ActivityLogEntry) {
  const supabase = createAdminClient();
  const insert = toAuditLogInsert(log);

  // Audit logging must not block the main operation. Mock dev users can miss
  // the auth.users FK locally, so retry with a null user_id when needed.
  const { error } = await supabase.from("audit_logs").insert(insert);

  if (error && error.code === "23503") {
    console.warn("[AuditLog] FK violation for user_id, retrying without user_id context:", insert.user_id);
    await supabase.from("audit_logs").insert({
      ...insert,
      user_id: undefined,
      details: {
        ...(insert.details ?? {}),
        original_user_id: insert.user_id,
        note: "User ID omitted due to FK violation (likely mock user)",
      },
    });
    return;
  }

  if (error) {
    console.error("[AuditLog] Failed to write audit entry:", error.message, log);
  }
}
