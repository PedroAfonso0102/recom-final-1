import { getSuppliers } from "@/lib/services/supabase-data";
import Link from "next/link";
import { ArrowRight, Factory, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { RecomSection } from "@/design-system/components/recom-section";
import { SupplierCard } from "@/design-system/components/supplier-card";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard, RecomCardHeader, RecomCardTitle, RecomCardContent } from "@/design-system/components/recom-card";

export const metadata: Metadata = {
  title: "Fornecedores e Marcas Parceiras | RECOM Metal Duro",
  description: "Distribuidor oficial Mitsubishi Materials, 7Leaders, BT Fixo e Kifix em Campinas. Catálogos técnicos e suporte oficial.",
};

export default async function FornecedoresPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="flex flex-col">
      {/* Header da Página */}
      <section className="bg-background border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary mb-4">
              Parceiros de Tecnologia
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8">
              Fornecedores e <span className="text-primary">Catálogos</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A RECOM facilita o acesso a fornecedores e catálogos oficiais para ferramentas de corte. Atuamos como distribuidor autorizado em Campinas e região.
            </p>
          </div>
        </div>
      </section>

      {/* Suppliers Grid */}
      <RecomSection
        title="Acesso direto aos principais fornecedores"
        description="Encontre marcas, catálogos oficiais e caminhos de atendimento com a RECOM."
        className="bg-muted/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {suppliers.length === 0 ? (
            <div className="col-span-full text-center py-24 border border-dashed border-border rounded-xl bg-background text-muted-foreground">
              Nenhum fornecedor cadastrado no momento.
            </div>
          ) : (
            suppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id ?? supplier.slug}
                name={supplier.name}
                description={supplier.shortDescription || ""}
                internalLink={`/fornecedores/${supplier.slug}`}
                externalCatalogLink={supplier.catalogUrl || undefined}
                catalogAvailable={!!supplier.catalogUrl}
                processes={[]} // Can be populated if data allows
              />
            ))
          )}
        </div>
      </RecomSection>

      {/* Central de Documentação Section */}
      <RecomSection
        eyebrow="Central de Documentação"
        title="Catálogos oficiais de usinagem"
        description="Consulte especificações técnicas, parâmetros de corte e geometrias diretamente nas fontes oficiais."
        className="bg-background border-t border-border"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {suppliers.map(supplier => (
            <RecomCard key={`doc-${supplier.id ?? supplier.slug}`} className="group">
              <RecomCardHeader className="pb-4">
                <RecomCardTitle className="text-base font-bold uppercase tracking-wider">
                  {supplier.name}
                </RecomCardTitle>
              </RecomCardHeader>
              <RecomCardContent>
                {supplier.catalogUrl ? (
                  <RecomButton asChild intent="link" className="px-0 h-auto font-semibold">
                    <a href={supplier.catalogUrl} target="_blank" rel="noopener noreferrer">
                      Ver PDF Oficial <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </RecomButton>
                ) : (
                  <span className="text-sm italic text-muted-foreground">Sob consulta</span>
                )}
              </RecomCardContent>
            </RecomCard>
          ))}
        </div>
      </RecomSection>

      {/* Contact CTA */}
      <section className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Não encontrou o catálogo que precisava?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Nossa equipe técnica pode enviar a documentação específica para o seu processo de usinagem.
          </p>
          <RecomButton asChild size="lg" intent="secondary">
            <Link href="/sobre#contato">Falar com a RECOM</Link>
          </RecomButton>
        </div>
      </section>
    </div>
  );
}

