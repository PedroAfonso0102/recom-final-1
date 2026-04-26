import { z } from "zod";

export const gridItemSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  icon: z.string().optional(),
  linkHref: z.string().optional(),
  linkLabel: z.string().optional(),
});

export const gridSectionSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  items: z.array(gridItemSchema).default([]),
  columns: z.enum(["2", "3", "4"]).default("3"),
  variant: z.enum(["default", "white", "gray"]).default("default"),
});

export type GridSectionProps = z.infer<typeof gridSectionSchema>;
export type GridItemProps = z.infer<typeof gridItemSchema>;
