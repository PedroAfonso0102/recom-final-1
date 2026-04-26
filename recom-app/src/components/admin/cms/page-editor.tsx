import { PublishPageButton } from "./publish-page-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Layout, Search, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CmsPageForm } from "./page-form";
import { CmsSectionForm } from "./section-form";
import { SectionReorderButtons } from "./section-reorder-buttons";

const HOME_CMS_SLUG = "home";

type CmsPageEditorProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageData: any;
  showPageMeta?: boolean;
};

export function CmsPageEditor({ pageData, showPageMeta: _showPageMeta = true }: CmsPageEditorProps) {
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
            <p className="text-sm text-muted-foreground">URL Pública: {publicPath}</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <PublishPageButton pageId={page.id} />
            {page.page_type === 'dynamic_template' ? (
              <Button variant="outline" disabled title="Templates não podem ser visualizados diretamente">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href={`/admin/preview/${page.slug}`} target="_blank">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="sections" className="gap-2">
            <Layout className="h-4 w-4" />
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="config" className="gap-2">
            <Settings className="h-4 w-4" />
            Configuração
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Search className="h-4 w-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-8">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base uppercase tracking-[0.2em]">Adicionar nova seção</CardTitle>
            </CardHeader>
            <CardContent>
              <CmsSectionForm pageId={page.id} sortOrder={sections.length} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Seções da Página</h2>
            {sections.length === 0 ? (
              <Card className="border-dashed border-border">
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  Nenhuma seção adicionada ainda. Comece adicionando uma seção acima.
                </CardContent>
              </Card>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              sections.map((section: any, index: number) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const ids = sections.map((item: any) => item.id);
                const moveUpOrder =
                  index > 0 ? ids.map((id: string, currentIndex: number) => (currentIndex === index - 1 ? ids[index] : currentIndex === index ? ids[index - 1] : id)) : undefined;
                const moveDownOrder =
                  index < sections.length - 1
                    ? ids.map((id: string, currentIndex: number) =>
                        currentIndex === index + 1 ? ids[index] : currentIndex === index ? ids[index + 1] : id
                      )
                    : undefined;

                return (
                  <Card key={section.id} className="border-border shadow-sm transition-shadow hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-border/60 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {index + 1}
                        </div>
                        <div className="space-y-0.5">
                          <CardTitle className="text-[11px] font-bold uppercase tracking-wider">{section.component_type}</CardTitle>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span>{section.status}</span>
                            <span>•</span>
                            <span>{section.visibility}</span>
                          </div>
                        </div>
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
        </TabsContent>

        <TabsContent value="config">
          <CmsPageForm page={page} mode="edit" />
        </TabsContent>

        <TabsContent value="seo">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base uppercase tracking-[0.2em]">Metadados & SEO</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">A edição de SEO está integrada ao formulário de configuração.</p>
               <div className="mt-4">
                 <CmsPageForm page={page} mode="edit" />
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

