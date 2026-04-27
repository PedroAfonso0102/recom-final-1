import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RenderPage } from "@/cms/render-page";
import { getPublicCmsPageBySlug, getPreviewCmsPageBySlug } from "@/server/queries/cms-pages";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ preview?: string }>;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const path = slug.join("/");
  
  const isPreview = preview === "true";
  const pageData = isPreview 
    ? await getPreviewCmsPageBySlug(path)
    : await getPublicCmsPageBySlug(path);

  if (!pageData) {
    return {};
  }

  return {
    title: (isPreview ? "[PREVIEW] " : "") + (pageData.page.seo_title || pageData.page.title),
    description: pageData.page.seo_description || pageData.page.description || undefined,
  };
}

export default async function CmsPublicPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const path = slug.join("/");
  
  const isPreview = preview === "true";
  const pageData = isPreview 
    ? await getPreviewCmsPageBySlug(path)
    : await getPublicCmsPageBySlug(path);

  if (!pageData) {
    notFound();
  }

  return <RenderPage pageData={pageData} />;
}


