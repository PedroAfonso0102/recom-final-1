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
      archive: "page.archived",
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
      name: "routePattern",
      label: "Padrao de rota",
      type: "text",
      admin: {
        description: "Use apenas quando a rota publica for diferente do slug.",
      },
    },
    {
      name: "pageType",
      label: "Tipo de pagina",
      type: "select",
      required: true,
      options: [
        { label: "Estatica", value: "static" },
        { label: "Template dinamico", value: "dynamic_template" },
        { label: "Landing page", value: "landing" },
      ],
    },
    {
      name: "templateKey",
      label: "Experiencia da pagina",
      type: "select",
      admin: {
        description: "Controla diferencas de UI/UX sem liberar layout livre.",
      },
    },
    {
      name: "description",
      label: "Descricao interna",
      type: "textarea",
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
      name: "seoTitle",
      label: "Titulo SEO",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "seoDescription",
      label: "Descricao SEO",
      type: "textarea",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "ogImageUrl",
      label: "Imagem social / OG",
      type: "upload",
      relationTo: "media_assets",
      admin: {
        description: "Escolha uma imagem da biblioteca ou cole uma URL publica.",
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
