import { notFound } from "next/navigation";
import { CmsPageEditor } from "@/components/admin/cms/page-editor";
import { getAdminCmsPageById } from "@/server/queries/cms-pages";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPageEditorPage({ params }: PageProps) {
  const { id } = await params;
  const pageData = await getAdminCmsPageById(id);

  if (!pageData) {
    notFound();
  }

  return <CmsPageEditor pageData={pageData} showPageMeta />;
}

