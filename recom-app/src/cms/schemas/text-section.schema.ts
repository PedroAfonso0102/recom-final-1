import { z } from "zod";

export const textSectionSchema = z.object({
  title: z.string().trim().optional().nullable(),
  body: z.string().trim().min(1, "Informe o texto."),
  variant: z.enum(["default", "panel"]).default("default"),
});

export type TextSectionProps = z.infer<typeof textSectionSchema>;

