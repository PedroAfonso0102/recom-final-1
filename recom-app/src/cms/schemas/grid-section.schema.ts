import { z } from "zod";

export const gridItemSchema = z.object({
  title: z.string().trim().min(1, "Título é obrigatório"),
  description: z.string().trim().optional().nullable(),
  icon: z.string().trim().optional().nullable(),
  linkHref: z.string().trim().optional().nullable(),
  linkLabel: z.string().trim().optional().nullable(),
});

export const gridSectionSchema = z.object({
  eyebrow: z.string().trim().optional().nullable(),
  title: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  items: z.array(gridItemSchema).default([]),
  columns: z.enum(["2", "3", "4", "5", "6"]).default("3"),
  variant: z.enum(["default", "white", "gray", "primary"]).default("default"),
});

export type GridSectionProps = z.infer<typeof gridSectionSchema>;
export type GridItemProps = z.infer<typeof gridItemSchema>;
