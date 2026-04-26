import Link from "next/link";
import { ArrowRight, CheckCircle2, Factory, Wrench, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-12 md:pt-24" data-hook="public.home.hero">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight" data-hook="content-title">
              Soluções em Metal Duro para Usinagem de Alta Performance
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[600px]" data-hook="content-text">
              Distribuidor oficial Mitsubishi Materials e parceiro técnico das maiores indústrias de Campinas e região há mais de 30 anos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/fornecedores" 
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-12 px-8 font-medium hover:bg-primary/90 transition-colors shadow-sm"
                data-hook="public.home.hero.cta.primary"
              >
                Ver Catálogos Técnicos
              </Link>
              <Link 
                href="/contato" 
                className="inline-flex items-center justify-center rounded-md border border-input bg-background h-12 px-8 font-medium hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
                data-hook="public.home.hero.cta.secondary"
              >
                Falar com Consultor
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-video relative rounded-lg border border-border bg-muted overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-muted-foreground/10 flex items-center justify-center text-muted-foreground flex-col gap-4">
                <Factory className="w-12 h-12 opacity-50" />
                <span className="text-sm font-medium tracking-wide uppercase opacity-70">Imagem da Indústria / Koudoe</span>
              </div>
              {/* <img src="/assets/images/optimized/koudoe.jpg" alt="Ferramentas de Usinagem RECOM" data-hook="hero-image" className="object-cover w-full h-full" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Partners Banner */}
      <section className="container mx-auto px-4">
        <div className="p-8 md:p-12 bg-muted/50 border-l-4 border-primary rounded-r-lg">
          <div className="flex flex-col gap-3 max-w-[900px]">
            <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight" data-hook="public.home.trust-proof.title">
              Distribuidor autorizado
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed" data-hook="public.home.trust-proof.description">
              Parceria direta com fabricantes líderes mundiais para garantir produtividade e suporte técnico especializado no chão de fábrica.
            </p>
          </div>
        </div>
      </section>

      {/* Features / Catalog Preview */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-[800px] mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Soluções Industriais</h2>
          <p className="text-lg text-muted-foreground">Acesso a tecnologias globais com suporte técnico local especializado.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-6 p-8 rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md" data-hook="public.home.suppliers-preview.card">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Factory className="w-4 h-4" /> Parceiros
              </span>
              <h3 className="text-xl font-bold mt-2">Fornecedores e Catálogos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Mitsubishi Materials, 7Leaders, BT Fixo e Kifix. Acesso direto aos catálogos oficiais.</p>
            </div>
            <div className="mt-auto pt-6 border-t border-border">
              <Link href="/fornecedores" className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider hover:text-primary/80 transition-colors">
                Acessar catálogos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-8 rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md" data-hook="public.home.processes-preview.card">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Wrench className="w-4 h-4" /> Aplicações CNC
              </span>
              <h3 className="text-xl font-bold mt-2">Processos de Usinagem</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Torneamento, fresamento e furação. Orientação técnica para cada tipo de material e máquina.</p>
            </div>
            <div className="mt-auto pt-6 border-t border-border">
              <Link href="/processos" className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider hover:text-primary/80 transition-colors">
                Ver processos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-8 rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md" data-hook="public.home.contact-preview.card">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Regional
              </span>
              <h3 className="text-xl font-bold mt-2">Suporte Comercial</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Atendimento personalizado em Campinas, RMC e principais polos industriais do estado.</p>
            </div>
            <div className="mt-auto pt-6 border-t border-border">
              <Link href="/contato" className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider hover:text-primary/80 transition-colors">
                Solicitar visita <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact / CTA */}
      <section className="container mx-auto px-4">
        <div className="p-8 md:p-16 bg-card border border-border rounded-xl shadow-sm">
          <div className="text-center max-w-[800px] mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Otimize sua produção hoje</h2>
            <p className="text-lg text-muted-foreground">Nossa equipe técnica está pronta para analisar seu processo e recomendar a melhor ferramenta.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            <div className="flex flex-col p-6 bg-muted/50 rounded-lg">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Orçamentos Rápidos
              </h4>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground pl-7">
                <li className="list-disc">Cotações em até 24h para itens de estoque.</li>
                <li className="list-disc">Acompanhamento de pedidos em tempo real.</li>
              </ul>
            </div>
            <div className="flex flex-col p-6 bg-muted/50 rounded-lg">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Suporte Técnico
              </h4>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground pl-7">
                <li className="list-disc">Visitas técnicas para melhoria de processo.</li>
                <li className="list-disc">Testes de ferramentas com relatório de performance.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
