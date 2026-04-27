import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { CTASection } from "@/design-system/components/cta-section";
import { EmptyState } from "@/design-system/components/empty-state";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomSection } from "@/design-system/components/recom-section";
import { SupplierCard } from "@/design-system/components/supplier-card";
import { getProcesses, getSuppliers } from "@/lib/services/supabase-data";

import { getPageBySlug } from "@/cms/queries";

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getPageBySlug("fornecedores");
  
  return {
    title: cmsPage?.page.seo_title || "Fornecedores e Marcas Parceiras | RECOM Metal Duro",
    description: cmsPage?.page.seo_description || "Distribuidor oficial Mitsubishi Materials, 7Leaders, BT Fixo e Kifix em Campinas. Catálogos técnicos e suporte oficial.",
  };
}

export default async function FornecedoresPage() {
  const [suppliers, processes, cmsPage] = await Promise.all([
    getSuppliers(),
    getProcesses(),
    getPageBySlug("fornecedores")
  ]);

  const getProcessNames = (ids: string[] = []) =>
    ids.map((id) => processes.find((process) => process.id === id)?.name).filter(Boolean) as string[];

  return (
    <div className="flex flex-col">
      {cmsPage && <RenderPage pageData={cmsPage} />}
      
      {!cmsPage && (
        <section className="border-b border-recom-border bg-recom-gray-50 py-8 md:py-10">
          <div className="container-recom space-y-4">
            <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Fornecedores & Catálogos" }]} />
            <div className="max-w-3xl">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-recom-red">
                Parceiros globais
              </span>
              <h1 className="text-recom-graphite">
                Fornecedores e <span className="text-recom-blue">catálogos para usinagem</span>
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground">
                Consulte os fornecedores atendidos pela RECOM e acesse os catálogos oficiais de cada marca. Fale com a equipe comercial para confirmar disponibilidade e orientar sua cotação.
              </p>
            </div>
          </div>
        </section>
      )}

      <RecomSection
        data-hook="public.suppliers.hub"
        title="Marcas e fornecedores atendidos"
        description="Parcerias diretas com os fabricantes para garantir procedência e suporte em Campinas e região."
        className="bg-white py-16 md:py-20"
      >
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {suppliers.length === 0 ? (
            <EmptyState
              title="Nenhum fornecedor cadastrado"
              description="Não encontramos fornecedores ativos agora. Você ainda pode falar com a equipe RECOM para solicitar suporte comercial."
              primaryCta={{ label: "Falar com a RECOM", href: "/sobre#contato" }}
              className="md:col-span-2 xl:col-span-3"
            />
          ) : (
            suppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id ?? supplier.slug}
                name={supplier.name}
                description={supplier.shortDescription || ""}
                logoUrl={supplier.logoUrl || ""}
                internalLink={`/fornecedores/${supplier.slug}`}
                externalCatalogLink={supplier.catalogUrl || undefined}
                catalogAvailable={!!supplier.catalogUrl}
                processes={getProcessNames(supplier.relatedProcesses)}
              />
            ))
          )}
        </div>
      </RecomSection>

      <RecomSection
        eyebrow="Central técnica"
        title="Acesso rápido a catálogos"
        description="Documentação técnica completa e manuais de parâmetros de corte."
        className="border-t border-recom-border bg-recom-gray-50 py-16 md:py-20"
      >
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {suppliers.map((supplier) => (
            <div
              key={`doc-${supplier.id ?? supplier.slug}`}
              className="group rounded-xl border border-recom-border bg-white p-6 transition-all hover:border-recom-blue/20 hover:shadow-recom-card"
            >
              <h4 className="mb-4 text-[14px] font-bold uppercase tracking-wider text-recom-graphite">
                {supplier.name}
              </h4>
              <div className="flex flex-col gap-2">
                {supplier.catalogUrl ? (
                  <RecomButton asChild intent="link" className="h-auto justify-start px-0 text-[11px] font-bold uppercase tracking-[0.1em] text-recom-blue">
                    <a href={supplier.catalogUrl} target="_blank" rel="noopener noreferrer">
                      Download PDF
                      <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </a>
                  </RecomButton>
                ) : (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    PDF sob consulta
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </RecomSection>

      <CTASection
        dataHook="public.suppliers.final-cta"
        eyebrow="Orientação comercial"
        title="Precisa confirmar uma linha ou aplicação específica?"
        description="Nossa equipe pode enviar a documentação técnica oficial para a sua necessidade e orientar a cotação com rapidez."
        primaryCta={{ label: "Falar com consultor", href: "/sobre#contato" }}
        secondaryCta={{ label: "Solicitar catálogo", href: "mailto:contato@recom.com.br" }}
        note="Atendimento comercial e técnico em uma única jornada."
      />
    </div>
  );
}
