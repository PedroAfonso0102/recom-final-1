import { z } from "zod";
import { normalizeCmsSlug } from "../utils";

export const cmsPageStatusSchema = z.enum(["draft", "published", "archived"]);
export const cmsPageTypeSchema = z.enum(["static", "dynamic_template", "landing"]);

export const cmsPageFormSchema = z.object({
  title: z.string().trim().min(2, "Informe um título."),
  slug: z.string().trim().min(1, "Informe um slug.").regex(/^[a-z0-9/_-]+$/, "O slug deve conter apenas letras minúsculas, números, hifens, sublinhados e barras (ex: sobre/contato).").transform(normalizeCmsSlug),
  routePattern: z.string().trim().optional().nullable().or(z.string().length(0)),
  pageType: cmsPageTypeSchema.default("static"),
  templateKey: z.string().trim().optional().nullable().or(z.string().length(0)),
  isSystem: z.boolean().default(false),
  isDynamicTemplate: z.boolean().default(false),
  description: z.string().trim().optional().nullable().or(z.string().length(0)),
  seoTitle: z.string().trim().max(120, "Título SEO muito longo.").optional().nullable().or(z.string().length(0)),
  seoDescription: z.string().trim().max(160, "Descrição SEO muito longa.").optional().nullable().or(z.string().length(0)),
  ogImageUrl: z.string().trim().url("URL de imagem OG inválida.").optional().nullable().or(z.string().length(0)),
  status: cmsPageStatusSchema.default("draft"),
  themeOverride: z.object({
    primaryColor: z.string().trim().optional().nullable(),
    secondaryColor: z.string().trim().optional().nullable(),
    backgroundColor: z.string().trim().optional().nullable(),
    textColor: z.string().trim().optional().nullable(),
    buttonColor: z.string().trim().optional().nullable(),
    buttonHoverColor: z.string().trim().optional().nullable(),
    headingFont: z.string().trim().optional().nullable(),
    bodyFont: z.string().trim().optional().nullable(),
    fontWeight: z.string().trim().optional().nullable(),
    headingSize: z.string().trim().optional().nullable(),
    bodySize: z.string().trim().optional().nullable(),
  }).optional(),
});

export const cmsCreatePageSchema = cmsPageFormSchema;

export const cmsUpdatePageSchema = cmsPageFormSchema.extend({
  id: z.string().uuid(),
});

export type CmsPageFormValues = z.infer<typeof cmsPageFormSchema>;
export type CmsCreatePageInput = z.infer<typeof cmsCreatePageSchema>;
export type CmsUpdatePageInput = z.infer<typeof cmsUpdatePageSchema>;

