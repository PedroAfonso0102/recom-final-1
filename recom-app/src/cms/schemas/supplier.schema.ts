import { z } from "zod";

export const SupplierSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2, "O nome do fornecedor deve ter pelo menos 2 caracteres."),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hifens (ex: fornecedor-exemplo)."),
  logoUrl: z.string().trim().refine(
    (value) => value === "" || value.startsWith("/") || /^https?:\/\//i.test(value),
    "URL do logo inválida."
  ).nullable().optional(),
  catalogUrl: z.string().trim().url("URL do catálogo inválida.").nullable().optional().or(z.string().length(0)),
  eCatalogUrl: z.string().trim().url("URL do catálogo eletrônico inválida.").nullable().optional().or(z.string().length(0)),
  catalogs: z.array(z.object({
    label: z.string().trim().min(1, "O rótulo do catálogo é obrigatório."),
    url: z.string().trim().url("URL do catálogo inválida.").min(1, "O link do catálogo é obrigatório."),
  })).default([]),
  settings: z.object({
    showMenu: z.boolean().default(true),
    showPromotions: z.boolean().default(true),
    showProcesses: z.boolean().default(true),
    featured: z.boolean().default(false),
  }).default({
    showMenu: true,
    showPromotions: true,
    showProcesses: true,
    featured: false,
  }),
  shortDescription: z.string().trim().min(10, "A descrição curta deve ter pelo menos 10 caracteres."),
  longDescription: z.string().trim().min(50, "A descrição longa deve ter pelo menos 50 caracteres."),
  relatedProcesses: z.array(z.string().uuid("ID de processo inválido.")).default([]),
  status: z.enum(["draft", "active", "published", "scheduled", "archived"]).default("draft"),
  sortOrder: z.number().int().default(0),
  seoTitle: z.string().trim().max(120, "O título SEO não deve exceder 120 caracteres.").optional().nullable(),
  seoDescription: z.string().trim().max(160, "A descrição SEO não deve exceder 160 caracteres.").optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Supplier = z.infer<typeof SupplierSchema>;
