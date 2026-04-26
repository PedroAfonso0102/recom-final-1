import { getPromotions } from "@/lib/services/supabase-data";
import Link from "next/link";
import { Tag } from "lucide-react";
import type { Metadata } from "next";
import { RecomSection } from "@/design-system/components/recom-section";
import { PromotionCard } from "@/design-system/components/promotion-card";
import { RecomButton } from "@/design-system/components/recom-button";

export const metadata: Metadata = {
  title: "Promoções e Itens em Destaque | RECOM",
  description: "Acompanhe as ofertas vigentes e itens promocionais para o setor de usinagem.",
};

export default async function PromocoesPage() {
  const [promotions, suppliers] = await Promise.all([
    getPromotions(),
    getSuppliers()
  ]);

  const getSupplierName = (id?: string | null) => {
    if (!id) return undefined;
    return suppliers.find(s => s.id === id)?.name;
  };

  // Sort: active first, then archived
  const sortedPromotions = [...promotions].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    return 0;
  });

  return (
    <div className="flex flex-col">
      {/* Page Header - Industrial Opportunities */}
      <section className="bg-recom-gray-50 border-b border-recom-border py-12 md:py-16">
        <div className="container-recom">
          <div className="max-w-4xl">
            <span className="text-recom-red font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block">Oportunidades Industriais</span>
            <h1 className="text-recom-graphite mb-6">
              Promoções e <span className="text-recom-blue">itens em destaque</span>
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl">
              Acompanhe as ofertas vigentes e itens promocionais para o setor de usinagem. Fale com a equipe comercial para confirmar validade e estoque disponível.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Promoções */}
      <RecomSection
        title="Itens promocionais"
        description="Ofertas vigentes para o setor industrial e lotes em destaque."
        className="bg-white py-16"
      >
        {sortedPromotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
            {sortedPromotions.map((promo) => (
              <PromotionCard
                key={promo.id}
                title={promo.title}
                description={promo.description}
                endsAt={promo.endsAt}
                status={promo.status as "active" | "archived"}
                supplierName={getSupplierName(promo.supplierId)}
                ctaLabel={promo.ctaLabel || undefined}
                ctaLink={promo.ctaUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-recom-gray-50 rounded-lg border border-dashed border-recom-border mt-10">
            <Tag className="w-12 h-12 mx-auto mb-6 text-slate-300" />
            <h3 className="text-[16px] font-bold uppercase tracking-widest text-recom-graphite mb-2">Sem ofertas ativas no momento</h3>
            <p className="text-[14px] text-muted-foreground">Assine nossa lista prioritária para ser avisado sobre novos lotes técnicos.</p>
          </div>
        )}
      </RecomSection>

      {/* Informativo Industrial CTA */}
      <section className="bg-recom-graphite py-16 md:py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Tag className="w-64 h-64 rotate-12 text-white" />
        </div>
        
        <div className="container-recom text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <span className="text-recom-red font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block">Lista de Transmissão</span>
            <h2 className="text-white mb-6 uppercase tracking-tight">
              Avisos sobre promoções
            </h2>
            <p className="text-[17px] text-white/60 mb-10 leading-relaxed">
              Deseja receber avisos sobre novos lotes e itens em destaque? Entre em contato e solicite sua inclusão em nossa lista de avisos.
            </p>
            <div className="flex justify-center">
              <RecomButton asChild size="lg" intent="accent" className="h-12 px-12">
                <Link href="/sobre#contato">Quero Receber Avisos</Link>
              </RecomButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

