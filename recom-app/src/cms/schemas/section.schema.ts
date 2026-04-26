import { z } from "zod";

export const cmsSectionStatusSchema = z.enum(["draft", "published", "hidden", "archived"]);
export const cmsSectionVisibilitySchema = z.enum(["visible", "hidden"]);

export const cmsSectionFormSchema = z.object({
  pageId: z.string().uuid(),
  componentType: z.string().min(1, "Selecione um bloco."),
  sortOrder: z.number().int().min(0).default(0),
  status: cmsSectionStatusSchema.default("draft"),
  visibility: cmsSectionVisibilitySchema.default("visible"),
  anchorId: z.string().trim().optional().nullable(),
  props: z.record(z.string(), z.unknown()).default({}),
});

export const cmsCreateSectionSchema = cmsSectionFormSchema;

export const cmsUpdateSectionSchema = cmsSectionFormSchema.extend({
  id: z.string().uuid(),
});

export const cmsReorderSectionsSchema = z.object({
  pageId: z.string().uuid(),
  orderedSectionIds: z.array(z.string().uuid()).min(1, "Informe a nova ordem."),
});

export const cmsPublishPageSchema = z.object({
  pageId: z.string().uuid(),
});

export type CmsSectionFormValues = z.infer<typeof cmsSectionFormSchema>;
export type CmsCreateSectionInput = z.infer<typeof cmsCreateSectionSchema>;
export type CmsUpdateSectionInput = z.infer<typeof cmsUpdateSectionSchema>;
export type CmsReorderSectionsInput = z.infer<typeof cmsReorderSectionsSchema>;
export type CmsPublishPageInput = z.infer<typeof cmsPublishPageSchema>;

