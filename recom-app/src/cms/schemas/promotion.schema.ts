import { z } from "zod";

export const PromotionSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(5, "O título da promoção deve ter pelo menos 5 caracteres."),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hifens (ex: promocao-mes)."),
  supplierId: z.string().uuid("ID de fornecedor inválido.").nullable().optional(),
  description: z.string().trim().min(10, "A descrição deve ter pelo menos 10 caracteres."),
  imageUrl: z.string().trim().url("URL de imagem inválida.").nullable().optional().or(z.string().length(0)),
  startsAt: z.string().min(1, "Data de início obrigatória."),
  endsAt: z.string().min(1, "Data de fim obrigatória."),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
  ctaLabel: z.string().trim().optional().nullable(),
  ctaUrl: z.string().trim().url("URL de ação inválida.").optional().nullable().or(z.string().length(0)),
}).refine((data) => {
  if (data.startsAt && data.endsAt) {
    return new Date(data.endsAt) > new Date(data.startsAt);
  }
  return true;
}, {
  message: "A data de fim deve ser posterior à data de início.",
  path: ["endsAt"],
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Promotion = z.infer<typeof PromotionSchema>;
