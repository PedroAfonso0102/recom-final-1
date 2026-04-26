import { z } from "zod";

export const PromotionSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(5, "O título da promoção deve ter pelo menos 5 caracteres."),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hifens."),
  supplierId: z.string().uuid().nullable().optional(),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres."),
  imageUrl: z.string().url("URL de imagem inválida.").nullable().optional(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().url().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Promotion = z.infer<typeof PromotionSchema>;
