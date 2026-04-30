import { z } from "zod";
import { SeoSchema } from "./seo.schema";

export const SupplierCatalogSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "O título do catálogo é obrigatório."),
  slug: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  fileUrl: z.string().url().optional().or(z.literal("")),
  productLineIds: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export const SupplierMediaItemSchema = z.object({
  id: z.string(),
  type: z.enum(["image", "video", "pdf", "technical_file"]),
  title: z.string().optional(),
  url: z.string().min(1, "A URL da mídia é obrigatória."),
  thumbnailUrl: z.string().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

export const SupplierProductLineSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "O nome da linha é obrigatório."),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  sortOrder: z.number().int().default(0),
});

export const SupplierLayoutSchema = z.object({
  theme: z.enum(["light", "dark", "industrial"]).default("industrial"),
  heroMode: z.enum(["image", "video", "carousel", "none"]).default("image"),
  heroImage: z.string().optional(),
  heroVideo: z.string().optional(),
  overlayColor: z.string().default("#111827"),
  overlayOpacity: z.number().min(0).max(1).default(0.45),
  showCatalogs: z.boolean().default(true),
  showMediaGallery: z.boolean().default(true),
  showProductLines: z.boolean().default(true),
  catalogLayout: z.enum(["grid", "list", "featured"]).default("grid"),
});

export const SupplierSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2, "O nome do fornecedor deve ter pelo menos 2 caracteres."),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hifens."),
  logoUrl: z.string().trim().optional().nullable().or(z.literal("")),
  shortDescription: z.string().trim().min(10, "A descrição curta deve ter pelo menos 10 caracteres."),
  description: z.string().trim().min(50, "A descrição longa deve ter pelo menos 50 caracteres."),
  segment: z.string().optional().nullable(),
  websiteUrl: z.string().url().optional().nullable().or(z.literal("")),
  contactEmail: z.string().email().optional().nullable().or(z.literal("")),
  contactPhone: z.string().optional().nullable(),
  status: z.enum(["draft", "active", "published", "scheduled", "archived"]).default("draft"),
  sortOrder: z.number().int().default(0),

  catalogs: z.array(SupplierCatalogSchema).default([]),
  media: z.array(SupplierMediaItemSchema).default([]),
  productLines: z.array(SupplierProductLineSchema).default([]),
   layout: SupplierLayoutSchema.default({
    theme: "industrial",
    heroMode: "image",
    overlayColor: "#111827",
    overlayOpacity: 0.45,
    showCatalogs: true,
    showMediaGallery: true,
    showProductLines: true,
    catalogLayout: "grid",
  }),
  seo: SeoSchema.optional(),
  
  relatedProcesses: z.array(z.string().uuid()).default([]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type SupplierCatalog = z.infer<typeof SupplierCatalogSchema>;
export type SupplierMediaItem = z.infer<typeof SupplierMediaItemSchema>;
export type SupplierProductLine = z.infer<typeof SupplierProductLineSchema>;
export type SupplierLayout = z.infer<typeof SupplierLayoutSchema>;
export type Supplier = z.infer<typeof SupplierSchema>;

export function normalizeSupplier(input: Partial<Supplier>): Supplier {
  return {
    id: input.id,
    name: input.name ?? "",
    slug: input.slug ?? "",
    logoUrl: input.logoUrl ?? "",
    shortDescription: input.shortDescription ?? "",
    description: input.description ?? "",
    segment: input.segment ?? "",
    websiteUrl: input.websiteUrl ?? "",
    contactEmail: input.contactEmail ?? "",
    contactPhone: input.contactPhone ?? "",
    status: input.status ?? "draft",
    sortOrder: input.sortOrder ?? 0,
    relatedProcesses: input.relatedProcesses ?? [],
    catalogs: (input.catalogs ?? []).map(c => ({
      id: c.id ?? crypto.randomUUID(),
      title: c.title ?? "",
      slug: c.slug ?? "",
      category: c.category ?? "",
      description: c.description ?? "",
      coverImage: c.coverImage ?? "",
      fileUrl: c.fileUrl ?? "",
      productLineIds: c.productLineIds ?? [],
      featured: c.featured ?? false,
      sortOrder: c.sortOrder ?? 0,
      status: c.status ?? "draft",
    })),
    media: (input.media ?? []).map(m => ({
      id: m.id ?? crypto.randomUUID(),
      type: m.type ?? "image",
      title: m.title ?? "",
      url: m.url ?? "",
      thumbnailUrl: m.thumbnailUrl ?? "",
      alt: m.alt ?? "",
      caption: m.caption ?? "",
      sortOrder: m.sortOrder ?? 0,
    })),
    productLines: (input.productLines ?? []).map(p => ({
      id: p.id ?? crypto.randomUUID(),
      name: p.name ?? "",
      description: p.description ?? "",
      imageUrl: p.imageUrl ?? "",
      sortOrder: p.sortOrder ?? 0,
    })),
    layout: {
      theme: "industrial",
      heroMode: "image",
      overlayColor: "#111827",
      overlayOpacity: 0.45,
      showCatalogs: true,
      showMediaGallery: true,
      showProductLines: true,
      catalogLayout: "grid",
      ...input.layout,
    },
    seo: input.seo ?? {
      title: "",
      description: "",
      ogImage: "",
      keywords: "",
    },
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
}
