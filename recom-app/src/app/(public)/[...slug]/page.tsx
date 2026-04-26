import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RenderPage } from "@/cms/render-page";
import { getPublicCmsPageBySlug } from "@/server/queries/cms-pages";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const pageData = await getPublicCmsPageBySlug(path);

  if (!pageData) {
    return {};
  }

  return {
    title: pageData.page.seo_title || pageData.page.title,
    description: pageData.page.seo_description || pageData.page.description || undefined,
  };
}

export default async function CmsPublicPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");
  const pageData = await getPublicCmsPageBySlug(path);

  if (!pageData) {
    notFound();
  }

  return <RenderPage pageData={pageData} />;
}

