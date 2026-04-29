import type { MetadataRoute } from "next";

import { getStaticProcessSlugs, getStaticSupplierSlugs } from "@/lib/services/supabase-data";
import { getPublishedPageSlugs } from "@/cms/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://recom.com.br";
  const now = new Date();
  const [suppliers, processes, cmsPages] = await Promise.all([
    getStaticSupplierSlugs(), 
    getStaticProcessSlugs(),
    getPublishedPageSlugs()
  ]);

  const staticRoutes = ["/", "/a-recom", "/fornecedores-catalogos", "/solucoes", "/promocoes", "/contato"];
  const supplierRoutes = suppliers.map((supplier) => `/fornecedores-catalogos/${supplier.slug}`);
  const processRoutes = processes.map((process) => `/solucoes/${process.slug}`);
  const cmsRoutes = cmsPages
    .filter(page => !staticRoutes.includes(`/${page.slug}`)) // Evitar duplicar rotas estáticas que já existem no CMS
    .map(page => `/${page.slug}`);

  return [...staticRoutes, ...supplierRoutes, ...processRoutes, ...cmsRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
