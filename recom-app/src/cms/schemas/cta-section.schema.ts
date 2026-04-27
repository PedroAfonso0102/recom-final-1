import { z } from "zod";

export const ctaSectionSchema = z.object({
  eyebrow: z.string().trim().optional().nullable(),
  title: z.string().trim().min(2, "Informe um título."),
  description: z.string().trim().min(1, "Informe o texto de apoio."),
  primaryCtaLabel: z.string().trim().min(1, "Informe o texto do botão."),
  primaryCtaHref: z.string().trim().min(1, "Informe o link do botão."),
  secondaryCtaLabel: z.string().trim().optional().nullable(),
  secondaryCtaHref: z.string().trim().optional().nullable(),
  variant: z.enum(["default", "light", "primary", "dark"]).default("default"),
});

export type CtaSectionProps = z.infer<typeof ctaSectionSchema>;
