import type { ResourceConfig } from "@/lib/resources/types";
import { canManageResource, isAdminRole } from "@/lib/resources/types";

export const leadsResource: ResourceConfig = {
  slug: "leads",
  label: "Leads",
  description: "Solicitacoes comerciais recebidas pelo site.",
  admin: {
    group: "Comercial",
    description: "Pipeline comercial, status e distribuicao de atendimento.",
    defaultColumns: ["name", "company", "status", "created_at"],
  },
  audit: {
    events: {
      create: "lead.created",
      update: "lead.updated",
      delete: "lead.deleted",
    },
  },
  access: {
    canRead: canManageResource,
    canCreate: () => true,
    canUpdate: canManageResource,
    canDelete: isAdminRole,
  },
  fields: [
    { name: "name", label: "Nome", type: "text", required: true },
    { name: "company", label: "Empresa", type: "text" },
    { name: "email", label: "Email", type: "text", required: true },
    { name: "phone", label: "Telefone", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Novo", value: "new" },
        { label: "Em atendimento", value: "contacted" },
        { label: "Qualificado", value: "qualified" },
        { label: "Perdido", value: "lost" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "process_id",
      label: "Processo relacionado",
      type: "relationship",
      relationTo: "processes",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "notes",
      label: "Notas internas",
      type: "textarea",
    },
  ],
};
