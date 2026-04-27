import { z } from "zod";
import { normalizeCmsSlug } from "../utils";

export const cmsPageStatusSchema = z.enum(["draft", "published", "archived"]);
export const cmsPageTypeSchema = z.enum(["static", "dynamic_template", "landing"]);

export const cmsPageFormSchema = z.object({
  title: z.string().trim().min(2, "Informe um título."),
  slug: z.string().trim().min(1, "Informe um slug.").regex(/^[a-z0-9/_-]+$/, "O slug deve conter apenas letras minúsculas, números, hifens, sublinhados e barras.").transform(normalizeCmsSlug),
  routePattern: z.string().trim().optional().nullable(),
  pageType: cmsPageTypeSchema.default("static"),
  templateKey: z.string().trim().optional().nullable(),
  isSystem: z.boolean().default(false),
  isDynamicTemplate: z.boolean().default(false),
  description: z.string().trim().optional().nullable(),
  seoTitle: z.string().trim().optional().nullable(),
  seoDescription: z.string().trim().optional().nullable(),
  ogImageUrl: z.string().trim().optional().nullable(),
  status: cmsPageStatusSchema.default("draft"),
});

export const cmsCreatePageSchema = cmsPageFormSchema;

export const cmsUpdatePageSchema = cmsPageFormSchema.extend({
  id: z.string().uuid(),
});

export type CmsPageFormValues = z.infer<typeof cmsPageFormSchema>;
export type CmsCreatePageInput = z.infer<typeof cmsCreatePageSchema>;
export type CmsUpdatePageInput = z.infer<typeof cmsUpdatePageSchema>;

