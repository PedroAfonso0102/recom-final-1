/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "../supabase/server";
import { createStaticClient } from "../supabase/static";
import { createAdminClient } from "../supabase/admin";
import { unstable_noStore as noStore } from "next/cache";
import { Supplier, SupplierSchema, normalizeSupplier } from "@/cms/schemas/supplier.schema";
import { Process, ProcessSchema } from "@/cms/schemas/process.schema";
import { Promotion, PromotionSchema } from "@/cms/schemas/promotion.schema";

type DataOptions = {
  allowFallback?: boolean;
};

async function getDataClient(allowFallback: boolean) {
  return allowFallback ? await createClient() : createAdminClient();
}

function isActivePromotionStatus(status: string | null | undefined, endsAt?: string | null) {
  const isVisibleStatus = status === "active" || status === "published";
  if (!isVisibleStatus) return false;
  if (!endsAt) return true;
  return new Date(endsAt).getTime() >= Date.now();
}

const FALLBACK_SUPPLIERS: Supplier[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Mitsubishi Materials",
    slug: "mitsubishi",
    logoUrl: "/assets/images/mitsubishi-logo.png",
    shortDescription: "Distribuição de ferramentas de corte e insertos de metal duro para usinagem.",
    description: "A Mitsubishi Materials produz materiais e revestimentos de alta durabilidade.",
    status: "active",
    sortOrder: 1,
    catalogs: [],
    media: [],
    productLines: [],
    layout: { theme: "industrial", heroMode: "image", showCatalogs: true, showMediaGallery: true, showProductLines: true, catalogLayout: "grid" } as any,
    relatedProcesses: ["00000000-0000-0000-0000-000000000010"],
    createdAt: new Date().toISOString(),
  } as any,
];

export async function getSuppliers(options: DataOptions = {}): Promise<Supplier[]> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("suppliers").select("*").order("sort_order", { ascending: true });

  const { data, error } = allowFallback ? await query.in("status", ["active", "published"]) : await query;

  if (error || !data || data.length === 0) {
    return allowFallback ? FALLBACK_SUPPLIERS : [];
  }

  return data.map((item: Record<string, any>) => {
    const dbSettings: Record<string, any> = (item.settings as Record<string, any>) || {};
    
    return normalizeSupplier({
      ...item,
      logoUrl: item.logo_url,
      websiteUrl: item.catalog_url, 
      contactEmail: item.e_catalog_url, 
      description: item.long_description,
      shortDescription: item.short_description,
      relatedProcesses: item.related_processes,
      sortOrder: item.sort_order,
      catalogs: item.catalogs,
      media: dbSettings.media || [],
      productLines: dbSettings.productLines || [],
      layout: {
        theme: dbSettings.theme || "industrial",
        heroMode: dbSettings.heroMode || "image",
        showCatalogs: dbSettings.show_menu ?? dbSettings.show_catalogs ?? true,
        showMediaGallery: dbSettings.show_media_gallery ?? true,
        showProductLines: dbSettings.show_product_lines ?? true,
        catalogLayout: dbSettings.catalogLayout || "grid",
        overlayColor: dbSettings.overlayColor || "#111827",
        overlayOpacity: dbSettings.overlayOpacity ?? 0.45,
      },
      seo: {
        title: item.seo_title,
        description: item.seo_description,
      },
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    });
  });
}

export async function getSupplierBySlug(slug: string, options: DataOptions = {}): Promise<Supplier | null> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("suppliers").select("*").eq("slug", slug);
  const { data, error } = allowFallback ? await query.in("status", ["active", "published"]).single() : await query.maybeSingle();

  if (error || !data) {
    const fallback = FALLBACK_SUPPLIERS.find((supplier) => supplier.slug === slug);
    return allowFallback && fallback ? fallback : null;
  }

  const dbSettings: Record<string, any> = (data.settings as Record<string, any>) || {};

  return normalizeSupplier({
    ...data,
    logoUrl: data.logo_url,
    websiteUrl: data.catalog_url,
    contactEmail: data.e_catalog_url,
    description: data.long_description,
    shortDescription: data.short_description,
    relatedProcesses: data.related_processes,
    sortOrder: data.sort_order,
    catalogs: data.catalogs,
    media: dbSettings.media || [],
    productLines: dbSettings.productLines || [],
    layout: {
      theme: dbSettings.theme || "industrial",
      heroMode: dbSettings.heroMode || "image",
      showCatalogs: dbSettings.show_menu ?? dbSettings.show_catalogs ?? true,
      showMediaGallery: dbSettings.show_media_gallery ?? true,
      showProductLines: dbSettings.show_product_lines ?? true,
      catalogLayout: dbSettings.catalogLayout || "grid",
      overlayColor: dbSettings.overlayColor || "#111827",
      overlayOpacity: dbSettings.overlayOpacity ?? 0.45,
    },
    seo: {
      title: data.seo_title,
      description: data.seo_description,
    },
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  });
}

export async function getProcesses(options: DataOptions = {}): Promise<Process[]> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("processes").select("*").order("sort_order", { ascending: true });
  const { data, error } = allowFallback ? await query.in("status", ["active", "published"]) : await query;

  if (error || !data || data.length === 0) {
    return allowFallback ? [] : []; // Simplified for brevity
  }

  return data.map((item: Record<string, any>) =>
    ProcessSchema.parse({
      ...item,
      imageUrl: item.image_url ?? undefined,
      shortDescription: item.short_description ?? "",
      longDescription: item.long_description ?? "",
      sortOrder: item.sort_order ?? 0,
      seoTitle: item.seo_title ?? undefined,
      seoDescription: item.seo_description ?? undefined,
      createdAt: item.created_at ?? undefined,
      updatedAt: item.updated_at ?? undefined,
    })
  );
}

export async function getProcessBySlug(slug: string, options: DataOptions = {}): Promise<Process | null> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("processes").select("*").eq("slug", slug);
  const { data, error } = allowFallback ? await query.in("status", ["active", "published"]).single() : await query.maybeSingle();

  if (error || !data) return null;

  return ProcessSchema.parse({
    ...data,
    imageUrl: data.image_url ?? undefined,
    shortDescription: data.short_description ?? "",
    longDescription: data.long_description ?? "",
    sortOrder: data.sort_order ?? 0,
    seoTitle: data.seo_title ?? undefined,
    seoDescription: data.seo_description ?? undefined,
    createdAt: data.created_at ?? undefined,
    updatedAt: data.updated_at ?? undefined,
  });
}

export async function getPromotions(options: DataOptions = {}): Promise<Promotion[]> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("promotions").select("*").order("starts_at", { ascending: false });
  const { data, error } = allowFallback ? await query.in("status", ["active", "published"]) : await query;

  if (error || !data || data.length === 0) return [];

  return data.filter((item: Record<string, any>) => !allowFallback || isActivePromotionStatus(item.status, item.ends_at)).map((item: Record<string, any>) =>
    PromotionSchema.parse({
      ...item,
      supplierId: item.supplier_id ?? undefined,
      imageUrl: item.image_url ?? undefined,
      description: item.description ?? "",
      startsAt: item.starts_at,
      endsAt: item.ends_at,
      ctaLabel: item.cta_label ?? undefined,
      ctaUrl: item.cta_url ?? undefined,
      createdAt: item.created_at ?? undefined,
      updatedAt: item.updated_at ?? undefined,
    })
  );
}

export async function getPromotionBySlug(slug: string, options: DataOptions = {}): Promise<Promotion | null> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("promotions").select("*").eq("slug", slug);
  const { data, error } = allowFallback ? await query.in("status", ["active", "published"]).single() : await query.maybeSingle();

  if (error || !data) return null;

  return PromotionSchema.parse({
    ...data,
    supplierId: data.supplier_id ?? undefined,
    imageUrl: data.image_url ?? undefined,
    description: data.description ?? "",
    startsAt: data.starts_at,
    endsAt: data.ends_at,
    ctaLabel: data.cta_label ?? undefined,
    ctaUrl: data.cta_url ?? undefined,
    createdAt: data.created_at ?? undefined,
    updatedAt: data.updated_at ?? undefined,
  });
}

export async function getStaticSupplierSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase.from("suppliers").select("slug").in("status", ["active", "published"]);
  if (error || !data) return [];
  return data.map((item: Record<string, any>) => ({ slug: String(item.slug) }));
}

export async function getStaticProcessSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase.from("processes").select("slug").in("status", ["active", "published"]);
  if (error || !data) return [];
  return data.map((item: Record<string, any>) => ({ slug: String(item.slug) }));
}
