import { z } from "zod";
import { visualSectionFields } from "./visual-options.schema";

export const heroSectionSchema = z.object({
  eyebrow: z.string().trim().optional().nullable(),
  title: z.string().trim().min(2, "Informe um título."),
  subtitle: z.string().trim().optional().nullable(),
  primaryCtaLabel: z.string().trim().optional().nullable(),
  primaryCtaHref: z.string().trim().optional().nullable(),
  secondaryCtaLabel: z.string().trim().optional().nullable(),
  secondaryCtaHref: z.string().trim().optional().nullable(),
  imageUrl: z.string().trim().optional().nullable(),
  showCarousel: z.boolean().optional().default(true),
  variant: z.enum(["default", "split", "compact", "full", "simple", "industrial", "technical", "contact", "catalog"]).default("default"),
  carouselSpeed: z.coerce.number().optional().default(5000),
  ...visualSectionFields,
});

export type HeroSectionProps = z.infer<typeof heroSectionSchema>;
