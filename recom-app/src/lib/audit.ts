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
  
  // If it's the mock dev user, we might need to skip the FK constraint if the user doesn't exist
  // For local development simplicity, we'll try to insert and if it fails due to FK, we'll try without user_id
  const { error } = await supabase.from("audit_logs").insert({
    ...log,
    created_at: new Date().toISOString(),
  });
  
  if (error && error.code === '23503') { // Foreign key violation
    console.warn("[AuditLog] FK violation for user_id, retrying without user_id context:", log.user_id);
    await supabase.from("audit_logs").insert({
      ...log,
      user_id: undefined, // Let it be null
      created_at: new Date().toISOString(),
      details: {
        ...(log.details as any),
        original_user_id: log.user_id,
        note: "User ID omitted due to FK violation (likely mock user)"
      }
    });
    return;
  }

  if (error) {
    // Audit log failure should never break the main operation.
    // Log it, don't throw.
    console.error("[AuditLog] Failed to write audit entry:", error.message, log);
  }
}
