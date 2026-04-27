import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/lib/database.types";

export type AuditLogEntry = {
  action: string;
  entity_type: string;
  entity_id: string;
  details?: Record<string, Json | undefined>;
  user_id: string;
};

/**
 * Registra uma ação administrativa na trilha de auditoria.
 * Uso: await createAuditLog({ action: "archive_supplier", entity_type: "supplier", entity_id: id, user_id: auth.id })
 */
export async function createAuditLog(log: AuditLogEntry) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("audit_logs").insert({
    ...log,
    created_at: new Date().toISOString(),
  });

  if (error) {
    // Audit log failure should never break the main operation.
    // Log it, don't throw.
    console.error("[AuditLog] Failed to write audit entry:", error.message, log);
  }
}
