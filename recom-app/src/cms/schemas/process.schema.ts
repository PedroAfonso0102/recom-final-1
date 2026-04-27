import { z } from "zod";

export const ProcessSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "O nome do processo deve ter pelo menos 2 caracteres."),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hifens (ex: processo-industrial)."),
  imageUrl: z.string().min(1, "URL de imagem inválida.").nullable().optional(),
  shortDescription: z.string().min(10, "A descrição curta deve ter pelo menos 10 caracteres."),
  longDescription: z.string().min(50, "A descrição longa deve ter pelo menos 50 caracteres."),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
  sortOrder: z.number().int().default(0),
  seoTitle: z.string().max(120, "O título SEO não deve exceder 120 caracteres.").optional(),
  seoDescription: z.string().max(160, "A descrição SEO não deve exceder 160 caracteres.").optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Process = z.infer<typeof ProcessSchema>;
