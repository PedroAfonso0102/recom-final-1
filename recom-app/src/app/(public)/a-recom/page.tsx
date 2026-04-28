import type { Metadata } from "next";
import { getPageBySlug, getSiteSettings } from "@/cms/queries";
import { RenderPage } from "@/cms/render-page";
import { siteConfig } from "@/lib/config";
import SobrePage, { generateMetadata as generateSobreMetadata } from "../sobre/page";

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getPageBySlug("a-recom");

  if (!cmsPage) {
    return generateSobreMetadata();
  }

  return {
    title: cmsPage.page.seo_title || "A RECOM | Distribuidor de Ferramentas de Corte",
    description: cmsPage.page.seo_description || "Saiba mais sobre a RECOM Metal Duro.",
  };
}

export default async function ARecomPage() {
  const [settings, cmsPage] = await Promise.all([getSiteSettings(), getPageBySlug("a-recom")]);
  
  const hasCmsContent = cmsPage && cmsPage.sections.length > 0;
  
  if (hasCmsContent) {
    return <RenderPage pageData={cmsPage} />;
  }

  // Fallback to the same content as "Sobre" if no CMS content for "a-recom"
  return <SobrePage />;
}
