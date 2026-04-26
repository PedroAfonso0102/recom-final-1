import Link from "next/link";
import { ArrowRight, Factory, Wrench, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { RecomHero } from "@/design-system/components/recom-hero";
import { RecomSection } from "@/design-system/components/recom-section";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard, RecomCardHeader, RecomCardTitle, RecomCardDescription, RecomCardContent, RecomCardFooter } from "@/design-system/components/recom-card";
import { HeroCarousel } from "@/components/public/HeroCarousel";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <RecomHero
        eyebrow="Parceria Técnica Especializada"
        title={
          <>
            Ferramentas de Corte para <span className="text-primary">Usinagem Industrial</span>
          </>
        }
        description="Distribuidor oficial Mitsubishi Materials em Campinas e região. Fornecedores e catálogos técnicos para processos de usinagem desde 1990."
        primaryCta={{ label: "Acessar Catálogos", href: "/fornecedores" }}
        secondaryCta={{ label: "Solicitar Orçamento", href: "/sobre#contato" }}
        image={<HeroCarousel />}
      />

      {/* Partner Logos Strip */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] font-semibold text-muted-foreground mb-8">
            Marcas e Fornecedores Parceiros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="/assets/images/Mitsubishi.png" alt="Mitsubishi" className="h-6 md:h-8 w-auto object-contain" />
            <img src="/assets/images/logo-7leaders.svg" alt="7Leaders" className="h-6 md:h-8 w-auto object-contain" />
            <img src="/assets/images/logo_btfixo.png" alt="BT Fixo" className="h-6 md:h-8 w-auto object-contain" />
            <img src="/assets/images/logo-kifix.png" alt="Kifix" className="h-6 md:h-8 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Trust Proof Section */}
      <RecomSection
        title="Distribuidor Autorizado e Certificado"
        description="Parceria direta com fabricantes para garantir o suporte técnico comercial necessário no chão de fábrica. Ferramentas reais com procedência e suporte de engenharia."
        className="bg-background"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="flex gap-4 p-6 rounded-xl border border-border bg-muted/20">
            <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Garantia de Procedência</h4>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Produtos originais faturados diretamente dos fabricantes parceiros, garantindo total rastreabilidade.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-6 rounded-xl border border-border bg-muted/20">
            <CheckCircle2 className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Suporte de Engenharia</h4>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Equipe técnica capacitada para auxiliar na escolha da melhor geometria e classe para sua aplicação.
              </p>
            </div>
          </div>
        </div>
      </RecomSection>

      {/* Solutions / Features */}
      <RecomSection
        eyebrow="Soluções & Atendimento"
        title="Atendimento técnico especializado em Campinas"
        description="Distribuição técnica de ferramentas de corte com foco em produtividade e redução de custos operacionais."
        className="bg-muted/30 border-y border-border"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <RecomCard className="flex flex-col">
            <RecomCardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4">
                <Factory className="w-6 h-6" />
              </div>
              <RecomCardTitle>Fornecedores & Catálogos</RecomCardTitle>
              <RecomCardDescription className="mt-2">
                Mitsubishi Materials, 7Leaders, BT Fixo e Kifix. Acesso total aos manuais e especificações.
              </RecomCardDescription>
            </RecomCardHeader>
            <RecomCardFooter className="mt-auto">
              <RecomButton asChild intent="outline" className="w-full">
                <Link href="/fornecedores">
                  Ver Fornecedores <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </RecomButton>
            </RecomCardFooter>
          </RecomCard>

          <RecomCard className="flex flex-col">
            <RecomCardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4">
                <Wrench className="w-6 h-6" />
              </div>
              <RecomCardTitle>Processos de Usinagem</RecomCardTitle>
              <RecomCardDescription className="mt-2">
                Torneamento, fresamento e furação. Orientação especializada para otimizar tempo de máquina.
              </RecomCardDescription>
            </RecomCardHeader>
            <RecomCardFooter className="mt-auto">
              <RecomButton asChild intent="outline" className="w-full">
                <Link href="/processos">
                  Ver Processos <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </RecomButton>
            </RecomCardFooter>
          </RecomCard>

          <RecomCard className="flex flex-col">
            <RecomCardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <RecomCardTitle>Suporte Comercial</RecomCardTitle>
              <RecomCardDescription className="mt-2">
                Atendimento técnico-comercial ágil focado nos polos industriais paulistas.
              </RecomCardDescription>
            </RecomCardHeader>
            <RecomCardFooter className="mt-auto">
              <RecomButton asChild intent="outline" className="w-full">
                <Link href="/sobre#contato">
                  Falar com a RECOM <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </RecomButton>
            </RecomCardFooter>
          </RecomCard>
        </div>
      </RecomSection>

      {/* CTA / Quick Contact */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Atendimento comercial em Campinas</h2>
              <p className="text-lg md:text-xl text-background/70 mb-8 max-w-xl mx-auto lg:mx-0">
                Nossa equipe está pronta para analisar sua necessidade técnica e indicar o melhor ferramental.
              </p>
              <RecomButton asChild size="lg" intent="primary" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/sobre#contato">Enviar Mensagem</Link>
              </RecomButton>
            </div>
            
            <div className="flex-1 grid grid-cols-1 gap-4 w-full">
              <div className="p-6 bg-background/5 border border-background/10 rounded-xl">
                <h4 className="font-bold mb-2">Orçamentos Técnicos</h4>
                <p className="text-sm text-background/60">Cotações em até 24h para itens em estoque.</p>
              </div>
              <div className="p-6 bg-background/5 border border-background/10 rounded-xl">
                <h4 className="font-bold mb-2">Visitas Técnicas</h4>
                <p className="text-sm text-background/60">Setup de máquinas e ferramentas in-loco.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

