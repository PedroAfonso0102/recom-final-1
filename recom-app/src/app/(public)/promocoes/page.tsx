import { getPromotions } from "@/lib/mock-data";
import Link from "next/link";
import { Tag } from "lucide-react";
import type { Metadata } from "next";
import { RecomSection } from "@/design-system/components/recom-section";
import { PromotionCard } from "@/design-system/components/promotion-card";
import { RecomButton } from "@/design-system/components/recom-button";

export const metadata: Metadata = {
  title: "Promoções e Lotes Especiais | RECOM",
  description: "Confira as ofertas vigentes e lotes promocionais de ferramentas de corte. Oportunidades por tempo limitado.",
};

export default async function PromocoesPage() {
  const promotions = await getPromotions();

  // Sort: active first, then archived
  const sortedPromotions = [...promotions].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    return 0;
  });

  return (
    <div className="flex flex-col">
      {/* Header da Página */}
      <section className="bg-background border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary mb-4">
              Oportunidades Industriais
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8">
              Promoções e <span className="text-primary">Lotes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Confira as ofertas vigentes e lotes de ferramentas de corte com condições especiais. Oportunidades com validade e disponibilidade limitadas.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Promoções */}
      <RecomSection
        title="Ofertas em Destaque"
        description="Lotes especiais e liquidação de estoque para parceiros cadastrados."
        className="bg-muted/20"
      >
        {sortedPromotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {sortedPromotions.map((promo) => (
              <PromotionCard
                key={promo.id}
                title={promo.title}
                description={promo.description}
                endsAt={promo.endsAt}
                status={promo.status as "active" | "archived"}
                ctaLabel={promo.ctaLabel}
                ctaLink={promo.ctaUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-background rounded-xl border border-dashed border-border">
            <Tag className="w-12 h-12 mx-auto mb-6 text-muted-foreground/30" />
            <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Sem ofertas no momento</h3>
            <p className="text-muted-foreground">Assine nossa lista técnica para ser avisado sobre novos lotes.</p>
          </div>
        )}
      </RecomSection>

      {/* Newsletter/Contact Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Tag className="w-64 h-64 rotate-12 text-white" />
          </div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 uppercase tracking-tight">
              Informativo Industrial RECOM
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed">
              Quer receber avisos sobre lotes e liquidação de estoque? Fale com a RECOM e solicite sua inclusão em nossa lista direta.
            </p>
            <RecomButton asChild size="lg" intent="secondary">
              <Link href="/sobre#contato">Quero receber avisos</Link>
            </RecomButton>
          </div>
        </div>
      </section>
    </div>
  );
}

