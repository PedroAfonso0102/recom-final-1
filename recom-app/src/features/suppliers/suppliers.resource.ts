import type { ResourceConfig } from "@/lib/resources/types";
import { canManageResource, isAdminRole } from "@/lib/resources/types";

export const suppliersResource: ResourceConfig = {
  slug: "suppliers",
  label: "Fornecedores",
  description: "Catalogo de fornecedores e vinculos com processos industriais.",
  admin: {
    group: "Catalogo",
    description: "Fornecedores, catalogos, SEO e relacionamento com processos.",
    defaultColumns: ["name", "slug", "status", "updated_at"],
  },
  audit: {
    events: {
      create: "supplier.created",
      update: "supplier.updated",
      delete: "supplier.deleted",
    },
  },
  access: {
    canRead: canManageResource,
    canCreate: canManageResource,
    canUpdate: canManageResource,
    canDelete: isAdminRole,
  },
  fields: [
    { name: "name", label: "Nome", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Ativo", value: "active" },
        { label: "Pausado", value: "inactive" },
        { label: "Rascunho", value: "draft" },
        { label: "Arquivado", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "related_processes",
      label: "Processos relacionados",
      type: "relationship",
      relationTo: "processes",
      hasMany: true,
    },
    {
      name: "catalogs",
      label: "Catalogos",
      type: "json",
      admin: {
        description: "Lista de links e documentos comerciais do fornecedor.",
      },
    },
    {
      name: "logo_url",
      label: "Logo",
      type: "upload",
      relationTo: "media_assets",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
