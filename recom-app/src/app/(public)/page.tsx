import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Factory, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { getHomePage } from "@/cms/queries";
import { RenderPage } from "@/cms/render-page";
import { getSuppliers } from "@/lib/services/supabase-data";
import { HeroCarousel } from "@/components/public/HeroCarousel";
import { CTASection } from "@/design-system/components/cta-section";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomHero } from "@/design-system/components/recom-hero";
import { RecomSection } from "@/design-system/components/recom-section";

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getHomePage();

  if (!cmsPage) {
    return {
      title: "RECOM",
      description: "Distribuidor de ferramentas de corte em Campinas.",
    };
  }

  return {
    title: cmsPage.page.seo_title || cmsPage.page.title,
    description: cmsPage.page.seo_description || cmsPage.page.description || undefined,
  };
}

export default async function Home() {
  const cmsPage = await getHomePage();

  if (cmsPage) {
    return <RenderPage pageData={cmsPage} />;
  }

  const suppliers = await getSuppliers();

  return (
    <div className="flex flex-col">
      <RecomHero
        dataHook="public.home.hero"
        eyebrow="Distribuidor de ferramentas de corte em Campinas"
        title={
          <>
            Ferramentas para usinagem <br className="hidden md:block" />
            <span className="text-recom-red">industrial de precisão</span>
          </>
        }
        description="A RECOM atende clientes industriais com fornecedores reconhecidos, catálogos oficiais e contato comercial direto para orçamento e orientação técnica."
        primaryCta={{ label: "Solicitar orçamento", href: "/sobre#contato" }}
        secondaryCta={{ label: "Ver fornecedores", href: "/fornecedores" }}
        image={
          <div className="relative h-full w-full">
            <HeroCarousel />
          </div>
        }
      />

      <section data-hook="public.home.trust-proof" className="border-b border-recom-gray-100 bg-white py-12">
        <div className="container-recom">
          <p className="mb-10 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-recom-graphite/30">
            Fabricantes e parceiros
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-45 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0 md:gap-20">
            {suppliers.map((supplier) => 
              supplier.logoUrl ? (
                <div key={supplier.id || supplier.slug} className="relative h-7 w-28 md:h-8 md:w-32">
                  <Image
                    src={supplier.logoUrl}
                    alt={supplier.name}
                    fill
                    sizes="(max-width: 768px) 112px, 128px"
                    className="object-contain"
                    data-tooltip={supplier.name}
                  />
                </div>
              ) : (
                <div
                  key={supplier.id || supplier.slug}
                  className="inline-flex items-center gap-2 rounded-full border border-recom-border bg-recom-gray-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-recom-graphite/55"
                >
                  <Factory className="h-3.5 w-3.5" />
                  {supplier.name}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <RecomSection
        data-hook="public.home.trust-section"
        title="Distribuidor de ferramentas de corte desde 1990"
        description="Atendimento comercial especializado para a indústria metal-mecânica em Campinas e região."
        className="bg-recom-gray-50 py-16 md:py-20"
      >
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="group flex gap-6 rounded-xl border border-recom-border bg-white p-8 transition-all duration-300 hover:border-recom-blue/20 hover:shadow-recom-card">
            <div
              className="shrink-0 rounded-md border border-recom-border/50 bg-recom-gray-50 p-4 transition-all duration-500 group-hover:bg-recom-blue group-hover:text-white"
              data-tooltip="Origem certificada"
            >
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h3 className="mb-2 text-recom-graphite">Garantia de procedência</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Produtos originais faturados diretamente dos fabricantes, garantindo total rastreabilidade, suporte técnico oficial e segurança para sua produção.
              </p>
            </div>
          </div>

          <div className="group flex gap-6 rounded-xl border border-recom-border bg-white p-8 transition-all duration-300 hover:border-recom-blue/20 hover:shadow-recom-card">
            <div
              className="shrink-0 rounded-md border border-recom-border/50 bg-recom-gray-50 p-4 transition-all duration-500 group-hover:bg-recom-blue group-hover:text-white"
              data-tooltip="Experiência técnica"
            >
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <h3 className="mb-2 text-recom-graphite">Suporte de engenharia</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Nossa equipe técnica atua diretamente na otimização de processos, auxiliando na escolha da melhor geometria e classe para maximizar sua produtividade.
              </p>
            </div>
          </div>
        </div>
      </RecomSection>

      <RecomSection
        data-hook="public.home.processes-section"
        eyebrow="Processos de usinagem"
        title="Ferramentas para torneamento, fresamento e furação"
        description="Encontre fornecedores e catálogos oficiais para cada aplicação industrial."
        className="bg-white py-16 md:py-20"
      >
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group flex h-full flex-col rounded-xl border border-recom-border bg-white p-8 transition-all hover:border-recom-blue/20 hover:shadow-recom-card">
            <div
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-recom-border/50 bg-recom-gray-50 text-recom-blue transition-all duration-500 group-hover:bg-recom-blue group-hover:text-white"
              data-tooltip="Links oficiais"
            >
              <Factory className="h-6 w-6" />
            </div>
            <h3 className="mb-3">Fornecedores & catálogos</h3>
            <p className="mb-8 flex-grow text-[15px] leading-relaxed text-muted-foreground">
              Acesso direto aos principais fabricantes globais como Mitsubishi Materials e 7Leaders. Consulte especificações técnicas e manuais oficiais.
            </p>
            <RecomButton asChild intent="outline" className="h-11 w-full justify-center border-recom-border">
              <Link href="/fornecedores">
                Explorar catálogos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </RecomButton>
          </div>

          <div className="group flex h-full flex-col rounded-xl border border-recom-border bg-white p-8 transition-all hover:border-recom-blue/20 hover:shadow-recom-card">
            <div
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-recom-border/50 bg-recom-gray-50 text-recom-blue transition-all duration-500 group-hover:bg-recom-blue group-hover:text-white"
              data-tooltip="Soluções completas"
            >
              <Wrench className="h-6 w-6" />
            </div>
            <h3 className="mb-3">Processos de usinagem</h3>
            <p className="mb-8 flex-grow text-[15px] leading-relaxed text-muted-foreground">
              Soluções completas para torneamento, fresamento, furação e fixação. Orientação técnica personalizada para cada desafio de usinagem.
            </p>
            <RecomButton asChild intent="outline" className="h-11 w-full justify-center border-recom-border">
              <Link href="/processos">
                Ver soluções por processo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </RecomButton>
          </div>

          <div className="group flex h-full flex-col rounded-xl border border-recom-border bg-white p-8 transition-all hover:border-recom-blue/20 hover:shadow-recom-card">
            <div
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-recom-border/50 bg-recom-gray-50 text-recom-blue transition-all duration-500 group-hover:bg-recom-blue group-hover:text-white"
              data-tooltip="Campinas e região"
            >
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mb-3">Logística & atendimento</h3>
            <p className="mb-8 flex-grow text-[15px] leading-relaxed text-muted-foreground">
              Presença constante nos principais polos industriais paulistas. Entrega ágil e visitas técnicas para setup de máquinas e testes in loco.
            </p>
            <RecomButton asChild intent="outline" className="h-11 w-full justify-center border-recom-border">
              <Link href="/sobre#contato">
                Agendar visita técnica
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </RecomButton>
          </div>
        </div>
      </RecomSection>

      <CTASection
        dataHook="public.home.final-cta"
        eyebrow="Atendimento comercial"
        title="Solicite orçamento com a equipe RECOM"
        description="Envie sua solicitação informando a marca, o processo de usinagem ou o código do item para agilizar o retorno comercial."
        primaryCta={{ label: "Enviar solicitação", href: "/sobre#contato" }}
        secondaryCta={{ label: "Ligar agora", href: "tel:+551932564235" }}
        note="Retorno comercial em horário útil e com orientação humana."
      />
    </div>
  );
}
