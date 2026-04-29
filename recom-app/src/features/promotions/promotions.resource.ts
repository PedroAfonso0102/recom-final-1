import type { ResourceConfig } from "@/lib/resources/types";
import { canManageResource, isAdminRole } from "@/lib/resources/types";

export const promotionsResource: ResourceConfig = {
  slug: "promotions",
  label: "Promocoes",
  description: "Campanhas comerciais exibidas no site.",
  admin: {
    group: "Comercial",
    description: "Promocoes, validade, fornecedor e chamadas comerciais.",
    defaultColumns: ["title", "supplier_id", "status", "expires_at"],
  },
  audit: {
    events: {
      create: "promotion.created",
      update: "promotion.updated",
      delete: "promotion.deleted",
      publish: "promotion.published",
    },
  },
  access: {
    canRead: canManageResource,
    canCreate: canManageResource,
    canUpdate: canManageResource,
    canDelete: isAdminRole,
    canPublish: canManageResource,
  },
  fields: [
    { name: "title", label: "Titulo", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    {
      name: "supplier_id",
      label: "Fornecedor",
      type: "relationship",
      relationTo: "suppliers",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Rascunho", value: "draft" },
        { label: "Publicado", value: "published" },
        { label: "Arquivado", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "starts_at",
      label: "Inicio",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "expires_at",
      label: "Validade",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    { name: "description", label: "Descricao", type: "textarea" },
  ],
};
