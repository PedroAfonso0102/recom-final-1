import Link from "next/link";
import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { EmptyState } from "@/design-system/components/empty-state";
import { PromotionCard } from "@/design-system/components/promotion-card";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomSection } from "@/design-system/components/recom-section";
import { RenderPage } from "@/cms/render-page";
import { getPromotions, getSuppliers } from "@/lib/services/supabase-data";
import { getPageBySlug } from "@/cms/queries";

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getPageBySlug("promocoes");
  
  return {
    title: cmsPage?.page.seo_title || "Promoções e Itens em Destaque | RECOM",
    description: cmsPage?.page.seo_description || "Acompanhe as ofertas vigentes e itens promocionais para o setor de usinagem.",
  };
}

export default async function PromocoesPage() {
  const [promotions, suppliers, cmsPage] = await Promise.all([
    getPromotions(),
    getSuppliers(),
    getPageBySlug("promocoes")
  ]);

  const getSupplierName = (id?: string | null) => {
    if (!id) {
      return undefined;
    }

    return suppliers.find((supplier) => supplier.id === id)?.name;
  };

  const getCardStatus = (promotion: (typeof promotions)[number]) => {
    const status = String(promotion.status);
    const isVisible = status === "active" || status === "published";
    if (!isVisible) return "archived" as const;
    return "active" as const;
  };

  const sortedPromotions = [...promotions].sort((a, b) => {
    const aStatus = getCardStatus(a);
    const bStatus = getCardStatus(b);

    if (aStatus === "active" && bStatus !== "active") return -1;
    if (aStatus !== "active" && bStatus === "active") return 1;
    return 0;
  });

  return (
    <div className="flex flex-col">
      {cmsPage && <RenderPage pageData={cmsPage} context={{ promotions, suppliers }} />}

      {!cmsPage && (
        <section className="border-b border-recom-border bg-recom-gray-50 py-8 md:py-10">
          <div className="container-recom space-y-4">
            <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Promoções" }]} />
            <div className="max-w-4xl">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-recom-red">
                Oportunidades industriais
              </span>
              <h1 className="text-recom-graphite">
                Promoções e <span className="text-recom-blue">itens em destaque</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                Acompanhe as ofertas vigentes e itens promocionais para o setor de usinagem. Fale com a equipe comercial para confirmar validade e estoque disponível.
              </p>
            </div>
          </div>
        </section>
      )}

      <RecomSection
        data-hook="public.promotions.hub"
        title="Itens promocionais"
        description="Ofertas vigentes para o setor industrial e lotes em destaque."
        className="bg-white py-16 md:py-20"
      >
        {sortedPromotions.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedPromotions.map((promo) => (
              <PromotionCard
                key={promo.id}
                title={promo.title}
                description={promo.description}
                endsAt={promo.endsAt}
                status={getCardStatus(promo)}
                supplierName={getSupplierName(promo.supplierId)}
                ctaLabel={promo.ctaLabel || undefined}
                ctaLink={promo.ctaUrl || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="Sem ofertas ativas no momento"
              description="Assine nossa lista prioritária para ser avisado sobre novos lotes técnicos e condições comerciais."
              primaryCta={{ label: "Quero receber avisos", href: "/contato" }}
            />
          </div>
        )}
      </RecomSection>

      <section className="relative overflow-hidden bg-recom-graphite py-16 text-white md:py-20">
        <div className="absolute right-0 top-0 p-12 opacity-5 pointer-events-none">
          <Tag className="h-64 w-64 rotate-12 text-white" />
        </div>

        <div className="container-recom relative z-10 text-center">
          <div className="mx-auto max-w-3xl">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-recom-red">
              Lista de transmissão
            </span>
            <h2 className="text-white">Avisos sobre promoções</h2>
            <p className="mb-10 mt-6 text-[17px] leading-relaxed text-white/64">
              Deseja receber avisos sobre novos lotes e itens em destaque? Entre em contato e solicite sua inclusão em nossa lista de avisos.
            </p>
            <div className="flex justify-center">
              <RecomButton asChild size="lg" intent="accent" className="h-12 px-12">
                <Link href="/contato">Quero receber avisos</Link>
              </RecomButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
