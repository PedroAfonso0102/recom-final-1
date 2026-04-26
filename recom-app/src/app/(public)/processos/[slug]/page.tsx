import { getProcessBySlug, getProcesses } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

interface ProcessPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProcessPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const process = await getProcessBySlug(resolvedParams.slug);
  
  if (!process) {
    return {
      title: "Processo não encontrado | RECOM",
    };
  }

  return {
    title: `${process.name} | RECOM Metal Duro`,
    description: process.description,
  };
}

export async function generateStaticParams() {
  const processes = await getProcesses();
  return processes.map((process) => ({
    slug: process.slug,
  }));
}

export default async function ProcessDetailPage({ params }: ProcessPageProps) {
  const resolvedParams = await params;
  const process = await getProcessBySlug(resolvedParams.slug);

  if (!process) {
    notFound();
  }

  return (
    <main className="pb-24">
      {/* Hero Section */}
      <section className="bg-muted py-12 md:py-20 border-b">
        <div className="container">
          <Link 
            href="/processos" 
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Processos
          </Link>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{process.name}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {process.content.hero}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Applications */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">{process.content.applications.title}</h2>
              <p className="text-lg text-muted-foreground">
                {process.content.applications.text}
              </p>
              
              <ul className="space-y-4 mt-8">
                {process.content.applications.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mr-3 mt-0.5" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-border" />

            {/* Brands */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Principais Parceiros para {process.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {process.content.brands.map((brand, index) => (
                  <div key={index} className="bg-card border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-2">{brand.name}</h4>
                    <p className="text-sm text-muted-foreground">{brand.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Perguntas Frequentes</h3>
              <div className="space-y-4">
                {process.content.faq.map((faq, index) => (
                  <div key={index} className="bg-card border rounded-lg p-6">
                    <h4 className="text-lg font-medium mb-3 flex items-start">
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2 mt-0.5" />
                      {faq.q}
                    </h4>
                    <p className="text-muted-foreground pl-7">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Precisa de suporte técnico?</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Nossos engenheiros estão prontos para indicar a melhor solução de {process.name.toLowerCase()} para o seu equipamento.
              </p>
              <Link 
                href="/sobre#contato" 
                className="flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full"
              >
                Falar com Especialista
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
