import { getPromotions } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowRight, Calendar, Tag, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

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
    <main>
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Promoções Ativas</h1>
          <p className="text-xl text-muted-foreground">
            Confira as ofertas vigentes e lotes promocionais de ferramentas de corte. Oportunidades por tempo limitado para otimizar seus custos sem perder performance.
          </p>
        </div>
      </section>

      <section className="container pb-24">
        {sortedPromotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPromotions.map((promo) => {
              const isActive = promo.status === "active";
              
              return (
                <div 
                  key={promo.id} 
                  className={`flex flex-col bg-card rounded-lg overflow-hidden border ${isActive ? 'border-primary/30 shadow-sm' : 'opacity-75 bg-muted/50'}`}
                >
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                        <Tag className="w-3 h-3 mr-1" />
                        Oferta
                      </span>
                      {!isActive && (
                        <span className="inline-flex items-center text-xs font-medium text-destructive">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Encerrada
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-semibold mb-3">
                      {promo.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {promo.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-6">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Válido até: {new Date(promo.endsAt).toLocaleDateString("pt-BR")}</span>
                    </div>

                    {isActive ? (
                      <Link 
                        href={promo.ctaUrl || "/sobre#contato"}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 w-full"
                      >
                        {promo.ctaLabel || "Saiba mais"}
                      </Link>
                    ) : (
                      <button 
                        disabled
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-muted text-muted-foreground h-10 px-4 w-full cursor-not-allowed"
                      >
                        Promoção Encerrada
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-muted rounded-lg border border-dashed">
            <h3 className="text-xl font-medium mb-2">Nenhuma promoção ativa no momento</h3>
            <p className="text-muted-foreground">Assine nossa newsletter para ser avisado sobre novas ofertas.</p>
          </div>
        )}
      </section>

      <section className="container pb-24">
        <div className="bg-muted rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Receba ofertas por E-mail ou WhatsApp</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Quer ser o primeiro a saber de lotes promocionais e liquidação de estoque? Entre para nossa lista de transmissão industrial.
          </p>
          <Link 
            href="/sobre#contato" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
          >
            Quero entrar na lista
          </Link>
        </div>
      </section>
    </main>
  );
}
