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
  const [suppliers, processes] = await Promise.all([
    getSuppliers(),
    getProcesses()
  ]);

  const getProcessNames = (ids: string[] = []) => {
    return ids
      .map(id => processes.find(p => p.id === id)?.name)
      .filter(Boolean) as string[];
  };

  return (
    <div className="flex flex-col">
      {/* Page Header - Industrial Context */}
      <section className="bg-recom-gray-50 border-b border-recom-border py-12 md:py-16">
        <div className="container-recom">
          <div className="max-w-3xl">
            <span className="text-recom-red font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block">Parceiros Globais</span>
            <h1 className="text-recom-graphite mb-6">
              Fornecedores e <span className="text-recom-blue">catálogos para usinagem</span>
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed">
              Consulte os fornecedores atendidos pela RECOM e acesse os catálogos oficiais de cada marca. Fale com a equipe comercial para confirmar disponibilidade e orientar sua cotação.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <RecomSection
        title="Marcas e fornecedores atendidos"
        description="Parcerias diretas com os fabricantes para garantir procedência e suporte em Campinas e região."
        className="bg-white py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {suppliers.length === 0 ? (
            <div className="col-span-full text-center py-24 border border-dashed border-recom-border rounded-lg bg-recom-gray-50 text-muted-foreground">
              Nenhum fornecedor cadastrado no momento.
            </div>
          ) : (
            suppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id ?? supplier.slug}
                name={supplier.name}
                description={supplier.shortDescription || ""}
                logoUrl={supplier.logoUrl || ""}
                internalLink={`/fornecedores/${supplier.slug}`}
                externalCatalogLink={supplier.catalogUrl || undefined}
                eCatalogLink={supplier.eCatalogUrl || undefined}
                catalogAvailable={!!supplier.catalogUrl}
                processes={getProcessNames(supplier.relatedProcesses)}
              />
            ))
          )}
        </div>
      </RecomSection>

      {/* Documentation Central - Professional List */}
      <RecomSection
        eyebrow="Central Técnica"
        title="Acesso Rápido a Catálogos"
        description="Documentação técnica completa e manuais de parâmetros de corte."
        className="bg-recom-gray-50 border-t border-recom-border py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {suppliers.map(supplier => (
            <div key={`doc-${supplier.id ?? supplier.slug}`} className="group bg-white border border-recom-border p-6 rounded-lg hover:border-recom-blue/20 hover:shadow-recom-card transition-all">
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-recom-graphite mb-4">
                {supplier.name}
              </h4>
              <div className="flex flex-col gap-2">
                {supplier.catalogUrl ? (
                  <RecomButton asChild intent="link" className="px-0 h-auto font-bold text-[11px] uppercase tracking-[0.1em] text-recom-blue hover:text-recom-red justify-start">
                    <a href={supplier.catalogUrl} target="_blank" rel="noopener noreferrer">
                      Download PDF <ExternalLink className="w-3.5 h-3.5 ml-2" />
                    </a>
                  </RecomButton>
                ) : (
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">PDF sob consulta</span>
                )}

                {supplier.eCatalogUrl && (
                  <RecomButton asChild intent="link" className="px-0 h-auto font-bold text-[10px] uppercase tracking-[0.1em] text-recom-blue/60 hover:text-recom-red justify-start">
                    <a href={supplier.eCatalogUrl} target="_blank" rel="noopener noreferrer">
                      Catálogo Online <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </RecomButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </RecomSection>

      {/* Specialized Support CTA */}
      <section className="bg-recom-graphite py-16 md:py-20 text-white">
        <div className="container-recom text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-white mb-4 uppercase tracking-tight">
              Orientação comercial e técnica
            </h2>
            <p className="text-white/60 text-[16px] mb-10 leading-relaxed">
              Deseja confirmar uma linha ou aplicação específica? Nossa equipe pode enviar a documentação técnica oficial para sua necessidade.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <RecomButton asChild size="lg" intent="accent" className="h-12 px-10">
                <Link href="/sobre#contato">Falar com Consultor</Link>
              </RecomButton>
              <RecomButton asChild size="lg" intent="outline" className="h-12 px-10 border-white/20 text-white hover:bg-white/5">
                <Link href="mailto:contato@recom.com.br">Solicitar Catálogo</Link>
              </RecomButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

