import { z } from "zod";
import { visualSectionFields } from "./visual-options.schema";

export const textSectionSchema = z.object({
  title: z.string().trim().optional().nullable(),
  body: z.string().trim().min(1, "Informe o texto."),
  variant: z.enum(["default", "panel", "editorial", "technical", "compact", "note"]).default("default"),
  ...visualSectionFields,
});

export type TextSectionProps = z.infer<typeof textSectionSchema>;
