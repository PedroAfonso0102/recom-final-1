import { Database } from "../database.types";
import { Supplier, SupplierSchema } from "@/cms/schemas/supplier.schema";
import { Promotion, PromotionSchema } from "@/cms/schemas/promotion.schema";
import { Process, ProcessSchema } from "@/cms/schemas/process.schema";
import { Lead, LeadSchema } from "@/cms/schemas/lead.schema";

export type SupplierRow = Database["public"]["Tables"]["suppliers"]["Row"];
export type SupplierInsert = Database["public"]["Tables"]["suppliers"]["Insert"];
export type SupplierUpdate = Database["public"]["Tables"]["suppliers"]["Update"];

export type PromotionRow = Database["public"]["Tables"]["promotions"]["Row"];
export type PromotionInsert = Database["public"]["Tables"]["promotions"]["Insert"];
export type PromotionUpdate = Database["public"]["Tables"]["promotions"]["Update"];

export type ProcessRow = Database["public"]["Tables"]["processes"]["Row"];
export type ProcessInsert = Database["public"]["Tables"]["processes"]["Insert"];
export type ProcessUpdate = Database["public"]["Tables"]["processes"]["Update"];

export type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

/**
 * Normaliza valores de formulário para o banco.
 * Converte strings vazias para null em campos opcionais.
 */
function normalize<T>(value: T): T | null {
  if (typeof value === "string" && value.trim() === "") {
    return null;
  }
  return value;
}

function normalizeLegacyStatus<T extends "draft" | "active" | "archived" | undefined>(status: string): T {
  const normalized = status === "published" ? "active" : status === "scheduled" ? "draft" : status === "expired" ? "archived" : status;
  return normalized as T;
}

export function mapSupplierToInsert(data: Supplier): SupplierInsert {
  return {
    name: data.name,
    slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    short_description: data.shortDescription,
    long_description: data.longDescription,
    status: normalizeLegacyStatus<SupplierInsert["status"]>(data.status),
    sort_order: data.sortOrder,
    logo_url: normalize(data.logoUrl),
    catalog_url: normalize(data.catalogUrl),
    e_catalog_url: normalize(data.eCatalogUrl),
    catalogs: data.catalogs,
    settings: {
      show_menu: data.settings.showMenu,
      show_promotions: data.settings.showPromotions,
      show_processes: data.settings.showProcesses,
      featured: data.settings.featured,
    },
    seo_title: normalize(data.seoTitle),
    seo_description: normalize(data.seoDescription),
    related_processes: (data.relatedProcesses && data.relatedProcesses.length > 0) ? data.relatedProcesses : null,
  } satisfies SupplierInsert;
}

export function mapSupplierToUpdate(data: Supplier): SupplierUpdate {
  return {
    name: data.name,
    slug: data.slug,
    short_description: data.shortDescription,
    long_description: data.longDescription,
    status: normalizeLegacyStatus<SupplierUpdate["status"]>(data.status),
    sort_order: data.sortOrder,
    logo_url: normalize(data.logoUrl),
    catalog_url: normalize(data.catalogUrl),
    e_catalog_url: normalize(data.eCatalogUrl),
    catalogs: data.catalogs,
    settings: {
      show_menu: data.settings.showMenu,
      show_promotions: data.settings.showPromotions,
      show_processes: data.settings.showProcesses,
      featured: data.settings.featured,
    },
    seo_title: normalize(data.seoTitle),
    seo_description: normalize(data.seoDescription),
    related_processes: (data.relatedProcesses && data.relatedProcesses.length > 0) ? data.relatedProcesses : null,
    updated_at: new Date().toISOString(),
  } satisfies SupplierUpdate;
}

export function mapPromotionToInsert(data: Promotion): PromotionInsert {
  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    status: normalizeLegacyStatus<PromotionInsert["status"]>(data.status),
    image_url: normalize(data.imageUrl),
    starts_at: data.startsAt,
    ends_at: data.endsAt,
    cta_label: normalize(data.ctaLabel),
    cta_url: normalize(data.ctaUrl),
    supplier_id: normalize(data.supplierId),
  } satisfies PromotionInsert;
}

export function mapPromotionToUpdate(data: Promotion): PromotionUpdate {
  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    status: normalizeLegacyStatus<PromotionUpdate["status"]>(data.status),
    image_url: normalize(data.imageUrl),
    starts_at: data.startsAt,
    ends_at: data.endsAt,
    cta_label: normalize(data.ctaLabel),
    cta_url: normalize(data.ctaUrl),
    supplier_id: normalize(data.supplierId),
    updated_at: new Date().toISOString(),
  } satisfies PromotionUpdate;
}

export function mapProcessToInsert(data: Process): ProcessInsert {
  return {
    name: data.name,
    slug: data.slug,
    short_description: data.shortDescription,
    long_description: data.longDescription,
    status: normalizeLegacyStatus<ProcessInsert["status"]>(data.status),
    sort_order: data.sortOrder,
    image_url: normalize(data.imageUrl),
    seo_title: normalize(data.seoTitle),
    seo_description: normalize(data.seoDescription),
  } satisfies ProcessInsert;
}

export function mapProcessToUpdate(data: Process): ProcessUpdate {
  return {
    name: data.name,
    slug: data.slug,
    short_description: data.shortDescription,
    long_description: data.longDescription,
    status: normalizeLegacyStatus<ProcessUpdate["status"]>(data.status),
    sort_order: data.sortOrder,
    image_url: normalize(data.imageUrl),
    seo_title: normalize(data.seoTitle),
    seo_description: normalize(data.seoDescription),
    updated_at: new Date().toISOString(),
  } satisfies ProcessUpdate;
}

function normalizeRelationId(value: string | null | undefined): string | null {
  if (!value) return null;
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(value) ? value : null;
}

export function mapLeadToInsert(data: Lead): LeadInsert {
  return {
    name: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone,
    supplier_interest: normalizeRelationId(data.supplierInterest),
    process_interest: normalizeRelationId(data.processInterest),
    item_code: normalize(data.itemCode),
    message: normalize(data.message),
    source_page: normalize(data.sourcePage),
    status: data.status,
  } satisfies LeadInsert;
}

export type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"];
