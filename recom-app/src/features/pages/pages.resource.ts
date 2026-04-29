import type { ResourceConfig } from "@/lib/resources/types";
import { canManageResource, isAdminRole } from "@/lib/resources/types";

export const pagesResource: ResourceConfig = {
  slug: "pages",
  label: "Paginas",
  description: "Conteudo editorial renderizado pelo CMS publico.",
  admin: {
    group: "Conteudo",
    description: "Inventario de paginas, drafts, publicacao e SEO.",
    defaultColumns: ["title", "slug", "status", "updated_at"],
  },
  audit: {
    events: {
      create: "page.created",
      update: "page.updated",
      delete: "page.deleted",
      publish: "page.published",
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
    {
      name: "title",
      label: "Titulo",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      admin: {
        description: "URL publica da pagina.",
      },
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
      name: "seo_title",
      label: "Titulo SEO",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "seo_description",
      label: "Descricao SEO",
      type: "textarea",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "sections",
      label: "Blocos",
      type: "relationship",
      relationTo: "page_sections",
      hasMany: true,
    },
  ],
};
