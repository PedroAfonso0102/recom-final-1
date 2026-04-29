import { toAuditLogInsert } from "./audit";

const normalized = toAuditLogInsert({
  actor_id: "00000000-0000-0000-0000-000000000001",
  action: "lead.status_changed",
  entity_type: "lead",
  entity_id: "lead-1",
  metadata: { status: "qualified" },
});

if (normalized.user_id !== "00000000-0000-0000-0000-000000000001") {
  throw new Error("Activity actor_id must map to audit_logs.user_id.");
}

if (normalized.details?.status !== "qualified") {
  throw new Error("Activity metadata must map to audit_logs.details.");
}

if (normalized.action !== "lead.status_changed") {
  throw new Error("Dot-separated activity actions must be preserved.");
}
