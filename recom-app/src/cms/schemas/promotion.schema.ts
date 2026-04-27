import { z } from "zod";

export const PromotionSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(5, "O título da promoção deve ter pelo menos 5 caracteres."),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hifens (ex: promocao-mes)."),
  supplierId: z.string().uuid().nullable().optional(),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres."),
  imageUrl: z.string().min(1, "URL de imagem inválida.").nullable().optional(),
  startsAt: z.string().min(1, "Data de início obrigatória."),
  endsAt: z.string().min(1, "Data de fim obrigatória."),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Promotion = z.infer<typeof PromotionSchema>;
