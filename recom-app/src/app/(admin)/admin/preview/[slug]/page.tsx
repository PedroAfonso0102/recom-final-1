import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RenderPage } from "@/cms/render-page";
import { getAdminCmsPageBySlug } from "@/server/queries/cms-pages";
import { HOME_CMS_SLUG } from "@/cms/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminPreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = await getAdminCmsPageBySlug(slug === "/" ? HOME_CMS_SLUG : slug);

  if (!pageData) {
    notFound();
  }

  const publicPath = pageData.page.slug === HOME_CMS_SLUG ? "/" : `/${pageData.page.slug}`;

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Preview</p>
            <h1 className="text-2xl font-bold tracking-tight">{pageData.page.title}</h1>
            <p className="text-sm text-muted-foreground">Rota pública: {publicPath}</p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/admin/pages/${pageData.page.id}`}>Voltar para edição</Link>
          </Button>
        </CardContent>
      </Card>

      <RenderPage pageData={pageData} preview />
    </div>
  );
}

