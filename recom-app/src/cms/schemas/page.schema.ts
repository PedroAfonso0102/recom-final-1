import { z } from "zod";
import { normalizeCmsSlug } from "../utils";

export const cmsPageStatusSchema = z.enum(["draft", "published", "archived"]);

export const cmsPageFormSchema = z.object({
  title: z.string().trim().min(2, "Informe um título."),
  slug: z.string().trim().min(1, "Informe um slug.").transform(normalizeCmsSlug),
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

