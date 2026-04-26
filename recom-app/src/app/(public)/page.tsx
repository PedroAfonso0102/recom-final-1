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
        eyebrow="Distribuidor Oficial Mitsubishi Materials"
        title={
          <>
            Ferramentas de Corte para <span className="text-primary">Usinagem Industrial</span>
          </>
        }
        description="Desde 1990 entregando soluções de precisão em metal duro para a indústria metal-mecânica em Campinas e região."
        primaryCta={{ label: "Acessar Catálogos", href: "/fornecedores" }}
        secondaryCta={{ label: "Solicitar Orçamento", href: "/sobre#contato" }}
        image={<HeroCarousel />}
      />

      {/* Partner Logos Strip */}
      <section className="border-y border-border bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-[10px] uppercase tracking-wider font-bold text-muted-foreground/40 mb-6">
            Marcas e Fornecedores Parceiros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40">
            <img src="/assets/images/Mitsubishi.png" alt="Mitsubishi" className="h-6 md:h-7 w-auto object-contain grayscale" />
            <img src="/assets/images/logo-7leaders.svg" alt="7Leaders" className="h-6 md:h-7 w-auto object-contain grayscale" />
            <img src="/assets/images/logo_btfixo.png" alt="BT Fixo" className="h-6 md:h-7 w-auto object-contain grayscale" />
            <img src="/assets/images/logo-kifix.png" alt="Kifix" className="h-6 md:h-7 w-auto object-contain grayscale" />
          </div>
        </div>
      </section>

      {/* Trust Proof Section */}
      <RecomSection
        title="Distribuidor Autorizado e Certificado"
        description="Parceria direta com fabricantes para garantir o suporte técnico comercial necessário no chão de fábrica."
        className="bg-background py-12 md:py-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="group flex gap-5 p-6 rounded-md border border-border/60 bg-muted/5 transition-all duration-300 hover:bg-white hover:shadow-premium hover:border-primary/20">
            <div className="bg-primary/5 p-3 rounded-md shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-base tracking-tight text-slate-900">Garantia de Procedência</h4>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                Produtos originais faturados diretamente dos fabricantes, garantindo total rastreabilidade e segurança.
              </p>
            </div>
          </div>
          <div className="group flex gap-5 p-6 rounded-md border border-border/60 bg-muted/5 transition-all duration-300 hover:bg-white hover:shadow-premium hover:border-primary/20">
            <div className="bg-primary/5 p-3 rounded-md shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-base tracking-tight text-slate-900">Suporte de Engenharia</h4>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
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
        description="Distribuição técnica de ferramentas de corte com foco em produtividade."
        className="bg-muted/30 border-y border-border py-12 md:py-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <RecomCard className="flex flex-col group border-border/40 shadow-sm hover:shadow-recom-card p-2 rounded-md transition-all duration-500">
            <RecomCardHeader>
              <div className="bg-primary/5 w-10 h-10 rounded-md flex items-center justify-center text-primary mb-3 transition-colors group-hover:bg-primary group-hover:text-white duration-500">
                <Factory className="w-5 h-5" />
              </div>
              <RecomCardTitle className="text-base font-bold text-slate-900">Fornecedores & Catálogos</RecomCardTitle>
              <RecomCardDescription className="mt-1.5 text-xs leading-relaxed">
                Mitsubishi Materials, 7Leaders e BT Fixo. Acesso total aos manuais e especificações técnicas de cada parceiro.
              </RecomCardDescription>
            </RecomCardHeader>
            <RecomCardFooter className="mt-auto">
              <RecomButton asChild intent="outline" className="w-full rounded-full h-9 text-[10px] group-hover:bg-primary group-hover:text-white">
                <Link href="/fornecedores">
                  Ver Fornecedores <ArrowRight className="w-3 h-3 ml-2" />
                </Link>
              </RecomButton>
            </RecomCardFooter>
          </RecomCard>

          <RecomCard className="flex flex-col group border-border/40 shadow-sm hover:shadow-recom-card p-2 rounded-md transition-all duration-500">
            <RecomCardHeader>
              <div className="bg-primary/5 w-10 h-10 rounded-md flex items-center justify-center text-primary mb-3 transition-colors group-hover:bg-primary group-hover:text-white duration-500">
                <Wrench className="w-5 h-5" />
              </div>
              <RecomCardTitle className="text-base font-bold text-slate-900">Processos de Usinagem</RecomCardTitle>
              <RecomCardDescription className="mt-1.5 text-xs leading-relaxed">
                Torneamento, fresamento e furação. Orientação técnica para otimizar tempo de máquina e vida útil.
              </RecomCardDescription>
            </RecomCardHeader>
            <RecomCardFooter className="mt-auto">
              <RecomButton asChild intent="outline" className="w-full rounded-full h-9 text-[10px] group-hover:bg-primary group-hover:text-white">
                <Link href="/processos">
                  Ver Processos <ArrowRight className="w-3 h-3 ml-2" />
                </Link>
              </RecomButton>
            </RecomCardFooter>
          </RecomCard>

          <RecomCard className="flex flex-col group border-border/40 shadow-sm hover:shadow-recom-card p-2 rounded-md transition-all duration-500">
            <RecomCardHeader>
              <div className="bg-primary/5 w-10 h-10 rounded-md flex items-center justify-center text-primary mb-3 transition-colors group-hover:bg-primary group-hover:text-white duration-500">
                <MapPin className="w-5 h-5" />
              </div>
              <RecomCardTitle className="text-base font-bold text-slate-900">Suporte Comercial</RecomCardTitle>
              <RecomCardDescription className="mt-1.5 text-xs leading-relaxed">
                Atendimento ágil focado nos principais polos industriais paulistas, com visitas técnicas presenciais.
              </RecomCardDescription>
            </RecomCardHeader>
            <RecomCardFooter className="mt-auto">
              <RecomButton asChild intent="outline" className="w-full rounded-full h-9 text-[10px] group-hover:bg-primary group-hover:text-white">
                <Link href="/sobre#contato">
                  Falar com a RECOM <ArrowRight className="w-3 h-3 ml-2" />
                </Link>
              </RecomButton>
            </RecomCardFooter>
          </RecomCard>
        </div>
      </RecomSection>

      {/* CTA / Quick Contact */}
      <section className="py-12 md:py-16 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-accent font-bold uppercase tracking-wider text-[10px] mb-3 block">Contato Comercial</span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">Atendimento comercial em Campinas</h2>
              <p className="text-base text-background/60 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Nossa equipe está pronta para analisar sua necessidade técnica e indicar o melhor ferramental com o melhor custo-benefício.
              </p>
              <RecomButton asChild size="md" intent="accent" className="rounded-full px-8 h-11 text-xs">
                <Link href="/sobre#contato">Enviar Mensagem</Link>
              </RecomButton>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="p-5 bg-white/5 border border-white/10 rounded-md backdrop-blur-sm transition-all hover:bg-white/10">
                <h4 className="font-bold text-base mb-1">Orçamentos Técnicos</h4>
                <p className="text-xs text-background/50">Cotações detalhadas em até 24h para itens em estoque.</p>
              </div>
              <div className="p-5 bg-white/5 border border-white/10 rounded-md backdrop-blur-sm transition-all hover:bg-white/10">
                <h4 className="font-bold text-base mb-1">Visitas Técnicas</h4>
                <p className="text-xs text-background/50">Setup de máquinas e otimização in-loco.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

