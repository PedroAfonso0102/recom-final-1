import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RenderPage } from "@/cms/render-page";
import { getPageBySlug, getSiteSettings } from "@/cms/queries";
import { resolveCmsPreviewRequest } from "@/cms/preview";
import { getCurrentAuthContext } from "@/lib/auth/utils";
import { getCurrentAuthContext as getAuth } from "@/lib/auth/utils";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ preview?: string }>;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const path = slug.join("/");
  const auth = await getAuth();
  
  const previewRequest = resolveCmsPreviewRequest({ requestedPreview: preview === "true", auth });
  const [pageData, settings] = await Promise.all([
    getPageBySlug(path, { preview: previewRequest.usePreview }),
    getSiteSettings()
  ]);

  if (!pageData) {
    return buildSeoMetadata({ title: "Página não encontrada", noIndex: true, siteSettings: settings });
  }

  const isNoIndex = previewRequest.usePreview || pageData.page.status !== "published";

  return buildSeoMetadata({
    title: pageData.page.seo_title || pageData.page.title,
    description: pageData.page.seo_description || pageData.page.description,
    slug: path,
    noIndex: isNoIndex,
    siteSettings: settings
  });
}

export default async function CmsPublicPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const path = slug.join("/");
  const auth = await getCurrentAuthContext();
  const previewRequest = resolveCmsPreviewRequest({ requestedPreview: preview === "true", auth });
  const pageData = await getPageBySlug(path, { preview: previewRequest.usePreview });

  if (!pageData) {
    notFound();
  }

  return <RenderPage pageData={pageData} preview={previewRequest.usePreview} />;
}
