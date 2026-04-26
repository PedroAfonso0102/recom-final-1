import { z } from "zod";

export const heroSectionSchema = z.object({
  eyebrow: z.string().trim().optional().nullable(),
  title: z.string().trim().min(2, "Informe um título."),
  subtitle: z.string().trim().optional().nullable(),
  primaryCtaLabel: z.string().trim().optional().nullable(),
  primaryCtaHref: z.string().trim().optional().nullable(),
  secondaryCtaLabel: z.string().trim().optional().nullable(),
  secondaryCtaHref: z.string().trim().optional().nullable(),
  imageUrl: z.string().trim().optional().nullable(),
  variant: z.enum(["default", "split", "compact"]).default("default"),
});

export type HeroSectionProps = z.infer<typeof heroSectionSchema>;

