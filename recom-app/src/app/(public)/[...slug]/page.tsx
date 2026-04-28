import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RenderPage } from "@/cms/render-page";
import { getPageBySlug } from "@/cms/queries";
import { resolveCmsPreviewRequest } from "@/cms/preview";
import { getCurrentAuthContext } from "@/lib/auth/utils";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ preview?: string }>;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const path = slug.join("/");
  const auth = await getCurrentAuthContext();
  const previewRequest = resolveCmsPreviewRequest({ requestedPreview: preview === "true", auth });
  const pageData = await getPageBySlug(path, { preview: previewRequest.usePreview });

  if (!pageData) {
    return {};
  }

  return {
    title: (previewRequest.usePreview ? "[PREVIEW] " : "") + (pageData.page.seo_title || pageData.page.title),
    description: pageData.page.seo_description || pageData.page.description || undefined,
    robots: previewRequest.usePreview ? { index: false, follow: false } : undefined,
  };
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

