import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

interface SeoOptions {
  title?: string | null;
  description?: string | null;
  slug?: string;
  image?: string | null;
  noIndex?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings?: any; // SiteSettings type from schemas
}

/**
 * Helper centralizado para construir metadados de SEO com fallbacks consistentes.
 */
export function buildSeoMetadata(options: SeoOptions): Metadata {
  const { title, description, slug, image, noIndex, siteSettings } = options;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://recom.com.br";
  const settings = siteSettings || siteConfig;
  
  // Resolvendo Title
  const siteTitle = settings.seo?.defaultTitle || siteConfig.company.name;
  const finalTitle = title ? `${title} | ${settings.company?.shortName || "RECOM"}` : siteTitle;

  // Resolvendo Description
  const finalDescription = description || settings.seo?.defaultDescription || siteConfig.company.subtitle;

  // Resolvendo Canonical
  const canonicalPath = slug ? (slug.startsWith("/") ? slug : `/${slug}`) : "";
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  // Resolvendo Robots
  const robots = noIndex ? { index: false, follow: false } : { index: true, follow: true };

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: settings.company?.name || "RECOM",
      type: "website",
      locale: "pt_BR",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: image ? [image] : undefined,
    },
  };
}

/**
 * Constrói o JSON-LD para Breadcrumbs (SEO Estruturado).
 */
export function buildBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://recom.com.br";
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `${baseUrl}${item.item.startsWith("/") ? item.item : `/${item.item}`}`,
    })),
  };

  return jsonLd;
}
