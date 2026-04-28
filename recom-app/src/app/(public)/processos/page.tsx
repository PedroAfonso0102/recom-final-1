import type { Metadata } from "next";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { CTASection } from "@/design-system/components/cta-section";
import { EmptyState } from "@/design-system/components/empty-state";
import { ProcessCard } from "@/design-system/components/process-card";
import { RecomSection } from "@/design-system/components/recom-section";
import { RenderPage } from "@/cms/render-page";
import { getProcesses, getSuppliers } from "@/lib/services/supabase-data";
import { getPageBySlug } from "@/cms/queries";

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getPageBySlug("processos");
  
  return {
    title: cmsPage?.page.seo_title || "Processos de Usinagem e Soluções Técnicas | RECOM",
    description: cmsPage?.page.seo_description || "Especialistas em torneamento, fresamento e furação. Consultoria técnica para otimização de processos industriais.",
  };
}

export default async function ProcessosPage() {
  const [processes, suppliers, cmsPage] = await Promise.all([
    getProcesses(),
    getSuppliers(),
    getPageBySlug("processos")
  ]);

  const getSupplierNames = (processId?: string | null) =>
    suppliers.filter((supplier) => supplier.relatedProcesses.includes(processId || "")).map((supplier) => supplier.name);

  return (
    <div className="flex flex-col">
      {cmsPage && <RenderPage pageData={cmsPage} context={{ processes, suppliers }} />}

      {!cmsPage && (
        <section className="border-b border-recom-border bg-recom-gray-50 py-8 md:py-10">
          <div className="container-recom space-y-4">
            <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Soluções / Processos" }]} />
            <div className="max-w-3xl">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-recom-red">
                Engenharia de aplicação
              </span>
              <h1 className="text-recom-graphite">
                Caminhos por <span className="text-recom-blue">processo de usinagem</span>
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground">
                Encontre fornecedores e catálogos para torneamento, fresamento, furação e fixação. Identifique as marcas e as ferramentas adequadas para cada operação industrial.
              </p>
            </div>
          </div>
        </section>
      )}

      <RecomSection
        data-hook="public.processes.hub"
        title="Processos atendidos"
        description="Marcas e catálogos organizados por aplicação de usinagem."
        className="bg-white py-16 md:py-20"
      >
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {processes.length === 0 ? (
            <EmptyState
              title="Nenhum processo cadastrado"
              description="Não encontramos processos ativos agora. Você ainda pode falar com a equipe RECOM para pedir orientação técnica."
              primaryCta={{ label: "Falar com a RECOM", href: "/contato" }}
              className="md:col-span-2 xl:col-span-3"
            />
          ) : (
            processes.map((process) => (
              <ProcessCard
                key={process.id ?? process.slug}
                name={process.name}
                description={process.shortDescription || ""}
                imageUrl={process.imageUrl || undefined}
                link={`/solucoes/${process.slug}`}
                suppliers={getSupplierNames(process.id)}
                contactLink={`/contato?processo=${encodeURIComponent(process.slug)}&solucao=${encodeURIComponent(process.name)}`}
              />
            ))
          )}
        </div>
      </RecomSection>

      <CTASection
        dataHook="public.processes.final-cta"
        eyebrow="Consultoria técnica"
        title="Fale com a RECOM"
        description="Nossa equipe está disponível para orientar sua cotação e indicar o ferramental correto para seu processo de usinagem."
        primaryCta={{ label: "Entrar em contato", href: "/contato" }}
        secondaryCta={{ label: "Ver fornecedores", href: "/fornecedores-catalogos" }}
        note="A decisão comercial e a orientação técnica começam no mesmo fluxo."
      />
    </div>
  );
}
