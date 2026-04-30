import { z } from "zod";

export const SeoSchema = z.object({
  title: z.string().trim().max(120, "O título SEO não deve exceder 120 caracteres.").optional().nullable(),
  description: z.string().trim().max(160, "A descrição SEO não deve exceder 160 caracteres.").optional().nullable(),
  ogImage: z.string().url("URL de imagem inválida.").optional().nullable().or(z.literal("")),
  keywords: z.string().optional().nullable(),
});

export type Seo = z.infer<typeof SeoSchema>;
