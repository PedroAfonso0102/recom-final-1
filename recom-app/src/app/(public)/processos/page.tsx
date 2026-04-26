import { getProcesses } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Processos de Usinagem e Soluções Técnicas | RECOM",
  description: "Especialistas em torneamento, fresamento e furação. Consultoria técnica para otimização de processos industriais.",
};

export default async function ProcessosPage() {
  const processes = await getProcesses();

  return (
    <main>
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Processos & Aplicações</h1>
          <p className="text-xl text-muted-foreground">
            Encontre ferramentas de corte por processo de usinagem. Torneamento, fresamento, furação e fixação com suporte comercial da RECOM em Campinas.
          </p>
        </div>
      </section>

      <section className="container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processes.map((process) => (
            <Link 
              key={process.id} 
              href={`/processos/${process.slug}`}
              className="group flex flex-col bg-card rounded-lg overflow-hidden border transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                {process.image ? (
                  <img 
                    src={process.image} 
                    alt={process.name} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Sem imagem
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {process.name}
                </h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                  {process.description}
                </p>
                <div className="flex items-center text-primary font-medium mt-auto">
                  Ver soluções
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <div className="bg-muted rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Precisa de uma análise técnica?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            A RECOM® auxilia na escolha da melhor ferramenta para o seu material e máquina.
          </p>
          <Link 
            href="/sobre#contato" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Falar com suporte técnico
          </Link>
        </div>
      </section>
    </main>
  );
}
