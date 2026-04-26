import { getProcessBySlug, getStaticProcessSlugs } from "@/lib/services/supabase-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

interface ProcessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProcessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const process = await getProcessBySlug(slug);

  if (!process) {
    return { title: "Processo não encontrado | RECOM" };
  }

  return {
    title: process.seoTitle || `${process.name} | RECOM Metal Duro`,
    description: process.seoDescription || process.shortDescription,
  };
}

export async function generateStaticParams() {
  return await getStaticProcessSlugs();
}

export default async function ProcessDetailPage({ params }: ProcessPageProps) {
  const { slug } = await params;
  const process = await getProcessBySlug(slug);

  if (!process) {
    notFound();
  }

  // Split longDescription into paragraphs for display
  const paragraphs = process.longDescription
    .split('\n')
    .filter((p) => p.trim().length > 0);

  return (    <main className="pb-24">
      {/* Hero Section */}
      <section className="bg-muted/20 py-16 md:py-24 border-b-2 border-foreground">
        <div className="container mx-auto px-4">
          <Link
            href="/processos"
            className="inline-flex items-center text-[10px] font-black text-muted-foreground hover:text-primary mb-12 transition-all uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-4 h-4 mr-3" />
            Voltar para Processos
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest w-fit mb-8">
              Engenharia de Aplicação
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 uppercase text-foreground">{process.name}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-2xl">
              {process.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column (Content) */}
          <div className="lg:col-span-8 space-y-16">

            {/* Description */}
            <div className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-foreground border-l-4 border-primary pl-4">Análise do Processo</h2>
              <div className="prose prose-slate max-w-none">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-lg text-muted-foreground leading-relaxed font-medium">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Process image if available */}
            <div className="border-2 border-foreground rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              {process.imageUrl ? (
                <img
                  src={process.imageUrl}
                  alt={process.name}
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              ) : process.slug === 'torneamento' ? (
                <img
                  src="/assets/images/koudoe.jpg"
                  alt={process.name}
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              ) : process.slug === 'fresamento' ? (
                <img
                  src="/assets/images/recom-editorial-2.jpg"
                  alt={process.name}
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              ) : process.slug === 'furacao' ? (
                <img
                  src="/assets/images/recom-editorial-3.jpg"
                  alt={process.name}
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              ) : null}
            </div>

            {/* CTA Card */}
            <div className="bg-foreground text-background border-2 border-foreground rounded-2xl p-10 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Atendimento Técnico Comercial</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase">
                  Ferramentas para {process.name}
                </h3>
                <p className="text-lg text-background/70 font-medium leading-relaxed max-w-xl">
                  A RECOM® oferece consultoria técnica especializada e fornece as melhores geometrias e coberturas para o seu processo de {process.name.toLowerCase()}.
                </p>
                <div className="pt-4">
                  <Link
                    href="/sobre#contato"
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-12 px-10 text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all"
                  >
                    Solicitar Orçamento
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="border-2 border-foreground rounded-2xl p-8 bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sticky top-24">
              <h3 className="text-xl font-black tracking-tight mb-4 uppercase">Contato Direto</h3>
              <p className="text-sm text-muted-foreground mb-8 font-medium leading-relaxed">
                Nossos engenheiros estão prontos para indicar a melhor solução de {process.name.toLowerCase()} para o seu equipamento e material.
              </p>
              <Link
                href="/contato"
                className="flex items-center justify-center rounded-md h-12 px-8 w-full bg-foreground text-background text-xs font-black uppercase tracking-widest hover:bg-foreground/90 transition-all"
              >
                Falar com a RECOM
              </Link>
            </div>

            <div className="border-2 border-foreground rounded-2xl p-8 bg-muted/30">
              <h4 className="text-[10px] font-black mb-6 text-foreground uppercase tracking-[0.2em] border-b border-foreground/10 pb-4">Exploração Adicional</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/fornecedores" className="group flex items-center justify-between text-sm font-black uppercase tracking-tight text-muted-foreground hover:text-primary transition-all">
                  Nossos Fornecedores
                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
                <Link href="/processos" className="group flex items-center justify-between text-sm font-black uppercase tracking-tight text-muted-foreground hover:text-primary transition-all">
                  Todos os Processos
                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
                <Link href="/sobre#contato" className="group flex items-center justify-between text-sm font-black uppercase tracking-tight text-muted-foreground hover:text-primary transition-all">
                  Solicitar Cotação
                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </nav>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}
