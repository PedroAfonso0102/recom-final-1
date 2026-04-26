import { z } from "zod";

export const SupplierSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "O nome do fornecedor deve ter pelo menos 2 caracteres."),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hifens."),
  logoUrl: z.string().min(1, "URL de logotipo inválida.").nullable().optional(),
  catalogUrl: z.string().url("URL de catálogo inválida.").nullable().optional(),
  eCatalogUrl: z.string().url("URL de catálogo eletrônico inválida.").nullable().optional(),
  shortDescription: z.string().min(10, "A descrição curta deve ter pelo menos 10 caracteres."),
  longDescription: z.string().min(50, "A descrição longa deve ter pelo menos 50 caracteres."),
  relatedProcesses: z.array(z.string().uuid()).default([]),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
  sortOrder: z.number().int().default(0),
  catalogs: z.array(z.object({
    label: z.string(),
    url: z.string().url("URL de catálogo inválida.")
  })).default([]),
  seoTitle: z.string().max(120, "O título SEO não deve exceder 120 caracteres.").optional(),
  seoDescription: z.string().max(160, "A descrição SEO não deve exceder 160 caracteres.").optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Supplier = z.infer<typeof SupplierSchema>;
