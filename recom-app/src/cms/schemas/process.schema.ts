import { z } from "zod";

export const ProcessSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2, "O nome do processo deve ter pelo menos 2 caracteres."),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hifens (ex: processo-industrial)."),
  imageUrl: z.string().trim().url("URL de imagem inválida.").nullable().optional().or(z.string().length(0)),
  shortDescription: z.string().trim().min(10, "A descrição curta deve ter pelo menos 10 caracteres."),
  longDescription: z.string().trim().min(50, "A descrição longa deve ter pelo menos 50 caracteres."),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
  sortOrder: z.number().int().default(0),
  seoTitle: z.string().trim().max(120, "O título SEO não deve exceder 120 caracteres.").optional().nullable(),
  seoDescription: z.string().trim().max(160, "A descrição SEO não deve exceder 160 caracteres.").optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Process = z.infer<typeof ProcessSchema>;
