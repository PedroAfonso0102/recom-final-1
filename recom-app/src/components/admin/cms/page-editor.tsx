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

const HOME_CMS_SLUG = "home";

type CmsPageEditorProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageData: any;
  showPageMeta?: boolean;
};

export function CmsPageEditor({ pageData, showPageMeta: _showPageMeta = true }: CmsPageEditorProps) {
  const { page, sections } = pageData;
  const publicPath = page.slug === HOME_CMS_SLUG ? "/" : `/${page.slug}`;

  const isPublished = page.status === 'published';

  return (
    <div className="space-y-10">
      {/* CMS TOP BAR - PREMIUM UX */}
      <div className="flex flex-col gap-6 border-b border-border pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest",
              isPublished ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
            )}>
              {isPublished ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
              {isPublished ? "Página Publicada" : "Modo Rascunho"}
            </div>
            {page.is_system && (
              <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest gap-2 bg-blue-50 text-blue-700 border-blue-200">
                Sistema
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="h-11 px-6 text-[10px] font-black uppercase tracking-widest gap-2">
              <Link href={`/admin/preview/${page.slug}`} target="_blank">
                <Eye className="h-4 w-4" /> Preview
              </Link>
            </Button>
            <PublishPageButton pageId={page.id} />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">{page.title}</h1>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <Globe className="h-3.5 w-3.5" /> 
            URL: <span className="text-primary">{publicPath}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="sections" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 rounded-xl h-auto self-start">
          <TabsTrigger value="sections" className="px-8 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Layout className="h-4 w-4" /> Conteúdo
          </TabsTrigger>
          <TabsTrigger value="config" className="px-8 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Settings className="h-4 w-4" /> Estrutura
          </TabsTrigger>
          <TabsTrigger value="seo" className="px-8 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Search className="h-4 w-4" /> SEO & Social
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-10">
          <Card className="border-border bg-slate-50/50 border-dashed">
            <CardHeader>
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary">Arquitetura de Blocos</CardTitle>
            </CardHeader>
            <CardContent>
              <CmsSectionForm pageId={page.id} sortOrder={sections.length} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Hierarquia Visual ({sections.length})</h2>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Arraste para reordenar (em breve)</p>
            </div>
            
            {sections.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl space-y-4">
                <Layout className="h-12 w-12 text-slate-200 mx-auto" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nenhuma seção definida para esta página.</p>
              </div>
            ) : (
              sections.map((section: any, index: number) => {
                const ids = sections.map((item: any) => item.id);
                const moveUpOrder = index > 0 ? ids.map((id: string, currentIndex: number) => (currentIndex === index - 1 ? ids[index] : currentIndex === index ? ids[index - 1] : id)) : undefined;
                const moveDownOrder = index < sections.length - 1 ? ids.map((id: string, currentIndex: number) => (currentIndex === index + 1 ? ids[index] : currentIndex === index ? ids[index + 1] : id)) : undefined;

                return (
                  <Card key={section.id} className="border-border shadow-sm overflow-hidden rounded-2xl group transition-all hover:shadow-xl hover:border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-slate-50 py-4 bg-slate-50/30">
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-[11px] font-black text-slate-400 shadow-sm">
                          {index + 1}
                        </div>
                        <div className="space-y-0.5">
                          <CardTitle className="text-[11px] font-black uppercase tracking-widest text-slate-900">{section.component_type}</CardTitle>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-[8px] font-black uppercase py-0 px-2 bg-white border-slate-200">{section.status}</Badge>
                            <span className="text-[8px] font-bold text-slate-300 uppercase">{section.visibility}</span>
                          </div>
                        </div>
                      </div>
                      <SectionReorderButtons pageId={page.id} moveUpOrder={moveUpOrder} moveDownOrder={moveDownOrder} />
                    </CardHeader>
                    <CardContent className="pt-8">
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

        <TabsContent value="seo" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CmsPageForm page={page} mode="edit" />
            
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Eye className="h-4 w-4" /> Google Search Preview
              </h3>
              
              <Card className="border-border bg-[#f8f9fa] p-8 rounded-2xl">
                <div className="space-y-2 max-w-[600px]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-white rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-bold">R</div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[#202124]">RECOM Industrial</span>
                      <span className="text-[10px] text-[#4d5156]">recom.com.br {publicPath}</span>
                    </div>
                  </div>
                  <h4 className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-tight">
                    {page.seo_title || page.title} | RECOM
                  </h4>
                  <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                    {page.seo_description || "Defina uma meta descrição nas configurações para melhorar o clique orgânico nos motores de busca..."}
                  </p>
                </div>
              </Card>

              <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-700 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Dica Técnica de SEO
                </h4>
                <p className="text-[11px] font-medium text-blue-600 leading-relaxed">
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


