import { getProcessBySlug, getStaticProcessSlugs } from "@/lib/services/supabase-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
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

  return (    <main className="pb-16">
      {/* Hero Section */}
      <section className="bg-muted/10 py-12 md:py-16 border-b border-border">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <Link
            href="/processos"
            className="inline-flex items-center text-[10px] font-bold text-muted-foreground hover:text-primary mb-10 transition-all uppercase tracking-widest"
          >
            <ArrowLeft className="w-3 h-3 mr-2" />
            Voltar para Processos
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest w-fit mb-6">
              Engenharia de Aplicação
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-foreground uppercase">{process.name}</h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {process.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-[1180px] px-4 md:px-8 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column (Content) */}
          <div className="lg:col-span-8 space-y-12">

            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary border-l-2 border-primary pl-4">Análise do Processo</h2>
              <div className="prose prose-slate max-w-none">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Process image if available */}
            <div className="border border-border rounded-md overflow-hidden bg-white shadow-sm">
              {process.imageUrl ? (
                <img
                  src={process.imageUrl}
                  alt={process.name}
                  className="w-full h-auto object-cover grayscale transition-all duration-700"
                />
              ) : process.slug === 'torneamento' ? (
                <img
                  src="/assets/images/koudoe.jpg"
                  alt={process.name}
                  className="w-full h-auto object-cover grayscale transition-all duration-700"
                />
              ) : process.slug === 'fresamento' ? (
                <img
                  src="/assets/images/recom-editorial-2.jpg"
                  alt={process.name}
                  className="w-full h-auto object-cover grayscale transition-all duration-700"
                />
              ) : process.slug === 'furacao' ? (
                <img
                  src="/assets/images/recom-editorial-3.jpg"
                  alt={process.name}
                  className="w-full h-auto object-cover grayscale transition-all duration-700"
                />
              ) : null}
            </div>

            {/* CTA Card */}
            <div className="bg-slate-900 text-white border border-border rounded-md p-8 md:p-10 shadow-recom">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Atendimento Técnico Comercial</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight uppercase">
                  Ferramentas para {process.name}
                </h3>
                <p className="text-base text-white/70 leading-relaxed max-w-xl">
                  A RECOM® oferece consultoria técnica especializada e fornece as melhores geometrias e coberturas para o seu processo de {process.name.toLowerCase()}.
                </p>
                <div className="pt-2">
                  <Link
                    href="/sobre#contato"
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-11 px-8 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
                  >
                    Solicitar Orçamento
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="border border-border rounded-md p-8 bg-white shadow-recom sticky top-24">
              <h3 className="text-lg font-bold tracking-tight mb-4 uppercase">Contato Direto</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Nossos engenheiros estão prontos para indicar a melhor solução de {process.name.toLowerCase()} para o seu equipamento e material.
              </p>
              <Link
                href="/sobre#contato"
                className="flex items-center justify-center rounded-md h-11 px-6 w-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
              >
                Falar com a RECOM
              </Link>
            </div>

            <div className="border border-border rounded-md p-8 bg-muted/30">
              <h4 className="text-[10px] font-bold mb-6 text-foreground uppercase tracking-widest border-b border-border pb-4">Exploração Adicional</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/fornecedores" className="group flex items-center justify-between text-[10px] font-bold uppercase tracking-tight text-muted-foreground hover:text-primary transition-all">
                  Nossos Fornecedores
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
                <Link href="/processos" className="group flex items-center justify-between text-[10px] font-bold uppercase tracking-tight text-muted-foreground hover:text-primary transition-all">
                  Todos os Processos
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
                <Link href="/sobre#contato" className="group flex items-center justify-between text-[10px] font-bold uppercase tracking-tight text-muted-foreground hover:text-primary transition-all">
                  Solicitar Cotação
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </nav>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}
