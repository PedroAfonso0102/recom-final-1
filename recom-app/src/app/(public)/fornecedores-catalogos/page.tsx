import type { Metadata } from "next";
import { getPageBySlug } from "@/cms/queries";
import { RenderPage } from "@/cms/render-page";
import { getProcesses, getSuppliers } from "@/lib/services/supabase-data";
import FornecedoresPage, { generateMetadata as generateFornecedoresMetadata } from "../fornecedores/page";

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getPageBySlug("fornecedores-catalogos");

  if (!cmsPage) {
    return generateFornecedoresMetadata();
  }

  return {
    title: cmsPage.page.seo_title || "Fornecedores e Catálogos | RECOM",
    description: cmsPage.page.seo_description || "Acesse catálogos técnicos de nossas marcas parceiras.",
  };
}

export default async function FornecedoresCatalogosPage() {
  const [cmsPage, suppliers, processes] = await Promise.all([
    getPageBySlug("fornecedores-catalogos"),
    getSuppliers(),
    getProcesses()
  ]);
  
  const hasCmsContent = cmsPage && cmsPage.sections.length > 0;
  
  if (hasCmsContent) {
    return <RenderPage pageData={cmsPage} context={{ suppliers, processes }} />;
  }

  return <FornecedoresPage />;
}
