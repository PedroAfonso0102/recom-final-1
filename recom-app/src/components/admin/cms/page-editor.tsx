import { PublishPageButton } from "./publish-page-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Layout, Search, Eye, Globe, Smartphone, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CmsPageForm } from "./page-form";
import { CmsSectionForm } from "./section-form";
import { SectionReorderButtons } from "./section-reorder-buttons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CmsPageRow, CmsSectionRow } from "@/cms/types";

const HOME_CMS_SLUG = "home";

type CmsPageEditorProps = {
  pageData: {
    page: CmsPageRow;
    sections: CmsSectionRow[];
  };
  showPageMeta?: boolean;
};

export function CmsPageEditor({ pageData, showPageMeta: _showPageMeta = true }: CmsPageEditorProps) {
  const { page, sections } = pageData;
  const publicPath = page.slug === HOME_CMS_SLUG ? "/" : `/${page.slug}`;

  const isPublished = page.status === 'published';

  return (
    <div className="space-y-8">
      {/* CMS TOP BAR - CLEAN SAAS UI */}
      <div className="flex flex-col gap-6 border-b border-border pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-medium",
              isPublished ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
            )}>
              {isPublished ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
              {isPublished ? "Publicada" : "Rascunho"}
            </div>
            {page.is_system && (
              <Badge variant="secondary" className="text-[11px] font-medium gap-1.5 bg-blue-50 text-blue-700 border-blue-100 px-2 py-0.5">
                Sistema
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="h-9 px-4 text-xs font-medium gap-2">
              <Link href={`/admin/preview/${page.slug}`} target="_blank">
                <Eye className="h-4 w-4" /> Visualizar
              </Link>
            </Button>
            <PublishPageButton pageId={page.id} />
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{page.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <Globe className="h-4 w-4 text-slate-400" /> 
            URL: <span className="text-primary/80">{publicPath}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList className="bg-slate-100/50 p-1 rounded-lg h-auto self-start border border-slate-200/50">
          <TabsTrigger value="sections" className="px-6 py-2 rounded-md text-xs font-semibold gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
            <Layout className="h-4 w-4" /> Conteúdo
          </TabsTrigger>
          <TabsTrigger value="config" className="px-6 py-2 rounded-md text-xs font-semibold gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
            <Settings className="h-4 w-4" /> Configurações
          </TabsTrigger>
          <TabsTrigger value="seo" className="px-6 py-2 rounded-md text-xs font-semibold gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
            <Search className="h-4 w-4" /> SEO & Meta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-8">
          <Card className="border-slate-200 bg-slate-50/30 border-dashed shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Novo Bloco</CardTitle>
            </CardHeader>
            <CardContent>
              <CmsSectionForm pageId={page.id} sortOrder={sections.length} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Estrutura da Página ({sections.length})</h2>
              <p className="text-[10px] font-medium text-slate-400">Reordene os blocos para alterar a exibição</p>
            </div>
            
            {sections.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-slate-200 rounded-2xl space-y-3 bg-slate-50/20">
                <Layout className="h-10 w-10 text-slate-200 mx-auto" />
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Página sem blocos de conteúdo.</p>
              </div>
            ) : (
              sections.map((section: CmsSectionRow, index: number) => {
                const ids = sections.map((item: CmsSectionRow) => item.id);
                const moveUpOrder = index > 0 ? ids.map((id: string, currentIndex: number) => (currentIndex === index - 1 ? ids[index] : currentIndex === index ? ids[index - 1] : id)) : undefined;
                const moveDownOrder = index < sections.length - 1 ? ids.map((id: string, currentIndex: number) => (currentIndex === index + 1 ? ids[index] : currentIndex === index ? ids[index + 1] : id)) : undefined;

                return (
                  <Card key={section.id} className="border-slate-200 shadow-sm overflow-hidden rounded-xl transition-all hover:border-slate-300">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 py-3 bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white border border-slate-200 text-xs font-bold text-slate-400 shadow-sm">
                          {index + 1}
                        </div>
                        <div className="space-y-0.5">
                          <CardTitle className="text-sm font-bold text-slate-900">{section.component_type}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[9px] font-semibold py-0 px-1.5 bg-white border-slate-200 lowercase">{section.status}</Badge>
                            <span className="text-[9px] font-medium text-slate-400 lowercase italic">{section.visibility}</span>
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

        <TabsContent value="seo" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <CmsPageForm page={page} mode="edit" />
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 px-1">
                <Eye className="h-4 w-4" /> Pré-visualização Google
              </h3>
              
              <Card className="border-slate-200 bg-white p-6 rounded-xl shadow-sm">
                <div className="space-y-1.5 max-w-[600px]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">R</div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-[#202124]">RECOM Industrial</span>
                      <span className="text-[10px] text-[#4d5156]">recom.com.br {publicPath}</span>
                    </div>
                  </div>
                  <h4 className="text-lg text-[#1a0dab] font-medium hover:underline cursor-pointer leading-tight">
                    {page.seo_title || page.title} | RECOM
                  </h4>
                  <p className="text-sm text-[#4d5156] leading-snug line-clamp-2">
                    {page.seo_description || "Defina uma meta descrição nas configurações para melhorar o clique orgânico nos motores de busca..."}
                  </p>
                </div>
              </Card>

              <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-blue-700 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Dica de SEO
                </h4>
                <p className="text-xs font-medium text-blue-600/80 leading-relaxed">
                  Títulos entre 50-60 caracteres e descrições entre 150-160 caracteres garantem que seu conteúdo não seja cortado nos resultados de busca do Google.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


