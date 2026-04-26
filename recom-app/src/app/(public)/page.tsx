import Link from "next/link";
import { ArrowRight, Factory, Wrench, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { RecomHero } from "@/design-system/components/recom-hero";
import { RecomSection } from "@/design-system/components/recom-section";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard, RecomCardHeader, RecomCardTitle, RecomCardDescription, RecomCardContent, RecomCardFooter } from "@/design-system/components/recom-card";
import { getSuppliers } from "@/lib/services/supabase-data";
import { HeroCarousel } from "@/components/public/HeroCarousel";

export default async function Home() {
  const suppliers = await getSuppliers();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <RecomHero
        eyebrow="Distribuidor de ferramentas de corte em Campinas"
        title={
          <>
            Ferramentas para usinagem <br className="hidden md:block" />
            <span className="text-recom-red">industrial de precisão</span>
          </>
        }
        description="A RECOM atende clientes industriais com fornecedores reconhecidos, catálogos oficiais e contato comercial direto para orçamento e orientação técnica."
        primaryCta={{ label: "Solicitar Orçamento", href: "/sobre#contato" }}
        secondaryCta={{ label: "Ver Fornecedores", href: "/fornecedores" }}
        image={
          <div className="relative w-full h-full">
            <HeroCarousel />
          </div>
        }
      />

      {/* Partner Logos Strip - Refined 2026 */}
      <section className="border-b border-recom-gray-100 bg-white py-12">
        <div className="container-recom">
          <p className="text-center text-[10px] uppercase tracking-[0.4em] font-bold text-recom-graphite/30 mb-10">
            Fabricantes e Parceiros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-40 transition-all hover:grayscale-0 hover:opacity-100 duration-700">
            {suppliers.map(supplier => (
              <img 
                key={supplier.id || supplier.slug}
                src={supplier.logoUrl || ""} 
                alt={supplier.name} 
                className="h-6 md:h-7 w-auto object-contain recom-tooltip" 
                data-tooltip={supplier.name} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Authority Block */}
      <RecomSection
        title="Distribuidor de ferramentas de corte desde 1990"
        description="Atendimento comercial especializado para a indústria metal-mecânica em Campinas e região."
        className="bg-recom-gray-50 py-16 md:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="group flex gap-6 p-8 rounded-lg border border-recom-border bg-white transition-all duration-300 hover:border-recom-blue/20 hover:shadow-recom-card">
            <div className="bg-recom-gray-50 p-4 rounded-md shrink-0 group-hover:bg-recom-blue group-hover:text-white transition-all duration-500 border border-recom-border/50 recom-tooltip" data-tooltip="Origem Certificada">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-recom-graphite mb-2">Garantia de Procedência</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                Produtos originais faturados diretamente dos fabricantes, garantindo total rastreabilidade, suporte técnico oficial e segurança para sua produção.
              </p>
            </div>
          </div>
          <div className="group flex gap-6 p-8 rounded-lg border border-recom-border bg-white transition-all duration-300 hover:border-recom-blue/20 hover:shadow-recom-card">
            <div className="bg-recom-gray-50 p-4 rounded-md shrink-0 group-hover:bg-recom-blue group-hover:text-white transition-all duration-500 border border-recom-border/50 recom-tooltip" data-tooltip="Experiência Técnica">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-recom-graphite mb-2">Suporte de Engenharia</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                Nossa equipe técnica atua diretamente na otimização de processos, auxiliando na escolha da melhor geometria e classe para maximizar sua produtividade.
              </p>
            </div>
          </div>
        </div>
      </RecomSection>

      {/* Main Solutions - Using Cards */}
      <RecomSection
        eyebrow="Processos de Usinagem"
        title="Ferramentas para torneamento, fresamento e furação"
        description="Encontre fornecedores e catálogos oficiais para cada aplicação industrial."
        className="bg-white py-16 md:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="group flex flex-col p-8 rounded-lg border border-recom-border bg-white hover:border-recom-blue/20 hover:shadow-recom-card transition-all">
            <div className="bg-recom-gray-50 w-12 h-12 rounded-md flex items-center justify-center text-recom-blue mb-6 border border-recom-border/50 group-hover:bg-recom-blue group-hover:text-white transition-all duration-500 recom-tooltip" data-tooltip="Links Oficiais">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="mb-3">Fornecedores & Catálogos</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 flex-grow">
              Acesso direto aos principais fabricantes globais como Mitsubishi Materials e 7Leaders. Consulte especificações técnicas e manuais oficiais.
            </p>
            <RecomButton asChild intent="outline" className="w-full h-11 text-[11px] group-hover:bg-recom-graphite group-hover:text-white border-recom-border">
              <Link href="/fornecedores">
                Explorar Catálogos <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </RecomButton>
          </div>

          <div className="group flex flex-col p-8 rounded-lg border border-recom-border bg-white hover:border-recom-blue/20 hover:shadow-recom-card transition-all">
            <div className="bg-recom-gray-50 w-12 h-12 rounded-md flex items-center justify-center text-recom-blue mb-6 border border-recom-border/50 group-hover:bg-recom-blue group-hover:text-white transition-all duration-500 recom-tooltip" data-tooltip="Soluções Completas">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="mb-3">Processos de Usinagem</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 flex-grow">
              Soluções completas para torneamento, fresamento, furação e fixação. Orientação técnica personalizada para cada desafio de usinagem.
            </p>
            <RecomButton asChild intent="outline" className="w-full h-11 text-[11px] group-hover:bg-recom-graphite group-hover:text-white border-recom-border">
              <Link href="/processos">
                Ver Soluções por Processo <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </RecomButton>
          </div>

          <div className="group flex flex-col p-8 rounded-lg border border-recom-border bg-white hover:border-recom-blue/20 hover:shadow-recom-card transition-all">
            <div className="bg-recom-gray-50 w-12 h-12 rounded-md flex items-center justify-center text-recom-blue mb-6 border border-recom-border/50 group-hover:bg-recom-blue group-hover:text-white transition-all duration-500 recom-tooltip" data-tooltip="Campinas & Região">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="mb-3">Logística & Atendimento</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 flex-grow">
              Presença constante nos principais polos industriais paulistas. Entrega ágil e visitas técnicas para setup de máquinas e testes in-loco.
            </p>
            <RecomButton asChild intent="outline" className="w-full h-11 text-[11px] group-hover:bg-recom-graphite group-hover:text-white border-recom-border">
              <Link href="/sobre#contato">
                Agendar Visita Técnica <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </RecomButton>
          </div>
        </div>
      </RecomSection>

      {/* Industrial Footer CTA */}
      <section className="py-20 bg-recom-graphite text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-recom-red/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container-recom relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-recom-red font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block">Atendimento Comercial</span>
              <h2 className="text-white mb-6 uppercase tracking-tight">Solicite orçamento com a equipe RECOM®</h2>
              <p className="text-[17px] text-white/60 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Envie sua solicitação informando a marca, o processo de usinagem ou o código do item para agilizar o retorno comercial.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <RecomButton asChild size="lg" intent="accent" className="h-12 px-10">
                  <Link href="/sobre#contato">Enviar Solicitação</Link>
                </RecomButton>
                <RecomButton asChild size="lg" intent="outline" className="h-12 px-10 border-white/20 text-white hover:bg-white/5">
                  <Link href="tel:+551932564235">Ligar Agora</Link>
                </RecomButton>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm group hover:bg-white/10 transition-all">
                <h4 className="font-bold text-[16px] text-white mb-2">Orçamentos Rápidos</h4>
                <p className="text-[13px] text-white/40 leading-relaxed">Cotações técnicas detalhadas para itens em estoque em tempo recorde.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm group hover:bg-white/10 transition-all">
                <h4 className="font-bold text-[16px] text-white mb-2">Engenharia de Aplicação</h4>
                <p className="text-[13px] text-white/40 leading-relaxed">Acompanhamento técnico para testes de performance e redução de custos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

