import type { Metadata } from "next";
import { getPageBySlug } from "@/cms/queries";
import { RenderPage } from "@/cms/render-page";
import { getProcesses, getSuppliers } from "@/lib/services/supabase-data";
import ProcessosPage, { generateMetadata as generateProcessosMetadata } from "../processos/page";

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getPageBySlug("solucoes");

  if (!cmsPage) {
    return generateProcessosMetadata();
  }

  return {
    title: cmsPage.page.seo_title || "Soluções e Processos | RECOM",
    description: cmsPage.page.seo_description || "Conheça nossas soluções em ferramentas de corte.",
  };
}

export default async function SolucoesPage() {
  const [cmsPage, processes, suppliers] = await Promise.all([
    getPageBySlug("solucoes"),
    getProcesses(),
    getSuppliers()
  ]);
  
  const hasCmsContent = cmsPage && cmsPage.sections.length > 0;
  
  if (hasCmsContent) {
    return <RenderPage pageData={cmsPage} context={{ processes, suppliers }} />;
  }

  return <ProcessosPage />;
}
