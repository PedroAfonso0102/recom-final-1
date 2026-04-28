import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { CTASection } from "@/design-system/components/cta-section";
import { RecomSection } from "@/design-system/components/recom-section";
import { RenderPage } from "@/cms/render-page";
import { siteConfig } from "@/lib/config";
import { getPageBySlug, getSiteSettings } from "@/cms/queries";

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getPageBySlug("sobre");

  return {
    title: cmsPage?.page.seo_title || "Sobre a RECOM Metal Duro | Distribuidor B2B",
    description:
      cmsPage?.page.seo_description ||
      "Conheca a historia da RECOM, distribuidor B2B de ferramentas de corte em Campinas, com fornecedores e catalogos oficiais.",
  };
}

export default async function SobrePage() {
  const [settings, cmsPage] = await Promise.all([getSiteSettings(), getPageBySlug("sobre")]);
  const hasCmsContent = cmsPage && cmsPage.sections.length > 0;
  const config = settings || siteConfig;

  return (
    <div className="flex flex-col">
      {hasCmsContent && <RenderPage pageData={cmsPage} />}

      {!hasCmsContent && (
        <>
          <section className="border-b border-recom-border bg-recom-gray-50 py-8 md:py-10">
            <div className="container-recom space-y-4">
              <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "A RECOM" }]} />
              <div className="max-w-4xl">
                <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-recom-red">
                  Nossa trajetoria
                </span>
                <h1 className="text-recom-graphite">
                  Distribuidor de ferramentas de corte <span className="text-recom-blue">desde 1990</span>
                </h1>
                <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                  Fundada em 1990, a RECOM Metal Duro atua em Campinas no fornecimento de ferramentas de corte para usinagem, atendendo clientes industriais com foco em relacionamento comercial e catalogos oficiais.
                </p>
              </div>
            </div>
          </section>

          <RecomSection data-hook="public.about.section" eyebrow="Atendimento comercial" className="bg-white py-16 md:py-20">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="space-y-8">
                <h2 className="text-recom-graphite">Atendimento comercial em Campinas e regiao</h2>
                <p className="text-[17px] leading-relaxed text-muted-foreground">
                  A RECOM constroi sua presenca no setor industrial aproximando clientes de fornecedores reconhecidos e catalogos oficiais, facilitando o contato para orcamento e orientacao comercial.
                </p>

                <div className="space-y-6 pt-4">
                  <h3 className="border-l-4 border-recom-red pl-4 text-[11px] font-bold uppercase tracking-[0.2em] text-recom-blue">
                    Diferenciais industriais
                  </h3>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {[
                      { title: "Comercial direto", desc: "Equipe preparada para orientar sua cotacao." },
                      { title: "Atendimento local", desc: "Presenca comercial em Campinas e regiao." },
                      { title: "Catalogos oficiais", desc: "Caminhos claros para materiais tecnicos de fornecedores." },
                      { title: "Tradicao B2B", desc: "Mais de tres decadas de experiencia no mercado." },
                    ].map((item) => (
                      <div key={item.title} className="space-y-2">
                        <h4 className="text-[13px] font-bold uppercase tracking-tight text-recom-graphite">{item.title}</h4>
                        <p className="text-[14px] leading-normal text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-recom-border shadow-recom-card">
                <div className="absolute inset-0 z-10 bg-recom-blue/10 transition-all duration-700 group-hover:bg-transparent" />
                <Image
                  src="/assets/images/escritorio.jpg"
                  alt="Escritorio RECOM Metal Duro"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
                  priority
                />
              </div>
            </div>
          </RecomSection>
        </>
      )}

      <CTASection
        dataHook="public.about.final-cta"
        eyebrow="Atendimento comercial"
        title="Fale com a RECOM sobre fornecedores, catalogos ou processos"
        description={`Atendimento direto em Campinas. Use a pagina de contato para registrar sua solicitacao ou fale pelo telefone ${config.contact.phone}.`}
        primaryCta={{ label: "Ir para contato / orcamento", href: "/contato" }}
        secondaryCta={{ label: "Ver fornecedores", href: "/fornecedores-catalogos" }}
        note={`Endereco: ${config.contact.address}`}
      />
    </div>
  );
}
