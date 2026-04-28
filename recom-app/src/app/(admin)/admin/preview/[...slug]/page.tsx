import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LivePreviewClient } from "@/cms/live-preview-client";
import { getAdminCmsPageBySlug } from "@/server/queries/cms-pages";
import { HOME_CMS_SLUG } from "@/cms/utils";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ minimal?: string }>;
};

export default async function AdminPreviewPage({ params, searchParams }: PageProps) {
  const { slug: slugArray } = await params;
  const { minimal } = await searchParams;
  const isMinimal = minimal === "true";
  const fullSlug = slugArray.join("/");
  const pageData = await getAdminCmsPageBySlug(fullSlug === "home" ? HOME_CMS_SLUG : fullSlug);

  if (!pageData) {
    notFound();
  }

  const publicPath = pageData.page.slug === HOME_CMS_SLUG ? "/" : `/${pageData.page.slug}`;

  return (
    <div className={cn("space-y-6", isMinimal && "space-y-0 p-0")}>
      {!isMinimal && (
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
      )}

      <LivePreviewClient initialData={pageData} />
    </div>
  );
}
