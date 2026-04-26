import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HOME_CMS_SLUG } from "@/cms/utils";
import type { CmsPageWithSections } from "@/cms/types";
import { CmsPageForm } from "./page-form";
import { CmsSectionForm } from "./section-form";
import { SectionReorderButtons } from "./section-reorder-buttons";
import { PublishPageButton } from "./publish-page-button";

type CmsPageEditorProps = {
  pageData: CmsPageWithSections;
  showPageMeta?: boolean;
};

export function CmsPageEditor({ pageData, showPageMeta = true }: CmsPageEditorProps) {
  const { page, sections } = pageData;
  const publicPath = page.slug === HOME_CMS_SLUG ? "/" : `/${page.slug}`;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">CMS</span>
          <span className="rounded-full border border-border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {page.status}
          </span>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{page.title}</h1>
            <p className="text-sm text-muted-foreground">Slug público: {publicPath}</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <PublishPageButton pageId={page.id} />
            <Button asChild variant="outline">
              <Link href={`/admin/preview/${page.slug}`}>Preview</Link>
            </Button>
          </div>
        </div>
      </div>

      {showPageMeta && <CmsPageForm page={page} mode="edit" />}

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base uppercase tracking-[0.2em]">Adicionar seção</CardTitle>
        </CardHeader>
        <CardContent>
          <CmsSectionForm pageId={page.id} sortOrder={sections.length} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Seções</h2>
        {sections.length === 0 ? (
          <Card className="border-dashed border-border">
            <CardContent className="py-10 text-sm text-muted-foreground">
              Nenhuma seção adicionada.
            </CardContent>
          </Card>
        ) : (
          sections.map((section, index) => {
            const ids = sections.map((item) => item.id);
            const moveUpOrder =
              index > 0 ? ids.map((id, currentIndex) => (currentIndex === index - 1 ? ids[index] : currentIndex === index ? ids[index - 1] : id)) : undefined;
            const moveDownOrder =
              index < sections.length - 1
                ? ids.map((id, currentIndex) =>
                    currentIndex === index + 1 ? ids[index] : currentIndex === index ? ids[index + 1] : id
                  )
                : undefined;

            return (
              <Card key={section.id} className="border-border">
                <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-border/60">
                  <div className="space-y-1">
                    <CardTitle className="text-sm uppercase tracking-[0.18em]">{section.component_type}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      #{index + 1} • {section.status} • {section.visibility}
                    </p>
                  </div>
                  <SectionReorderButtons pageId={page.id} moveUpOrder={moveUpOrder} moveDownOrder={moveDownOrder} />
                </CardHeader>
                <CardContent className="pt-6">
                  <CmsSectionForm pageId={page.id} section={section} sortOrder={section.sort_order} />
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

