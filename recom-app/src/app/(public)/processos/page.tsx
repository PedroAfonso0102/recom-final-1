import { getProcesses } from "@/lib/services/supabase-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { RecomSection } from "@/design-system/components/recom-section";
import { ProcessCard } from "@/design-system/components/process-card";
import { RecomButton } from "@/design-system/components/recom-button";

export const metadata: Metadata = {
  title: "Processos de Usinagem e Soluções Técnicas | RECOM",
  description: "Especialistas em torneamento, fresamento e furação. Consultoria técnica para otimização de processos industriais.",
};

export default async function ProcessosPage() {
  const processes = await getProcesses();

  return (
    <div className="flex flex-col">
      {/* Page Header - Industrial Context */}
      <section className="bg-recom-gray-50 border-b border-recom-border py-12 md:py-16">
        <div className="container-recom">
          <div className="max-w-3xl">
            <span className="text-recom-red font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block">Engenharia de Aplicação</span>
            <h1 className="text-recom-graphite mb-6">
              Caminhos por <span className="text-recom-blue">processo de usinagem</span>
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed">
              Encontre fornecedores e catálogos para torneamento, fresamento, furação e fixação. Identifique as marcas e as ferramentas adequadas para cada operação industrial.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Processos */}
      <RecomSection
        title="Processos atendidos"
        description="Marcas e catálogos organizados por aplicação de usinagem."
        className="bg-white py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {processes.length === 0 ? (
            <div className="col-span-full text-center py-24 border border-dashed border-recom-border rounded-lg bg-recom-gray-50 text-muted-foreground">
              Nenhum processo cadastrado no momento.
            </div>
          ) : (
            processes.map((process) => (
              <ProcessCard
                key={process.id ?? process.slug}
                name={process.name}
                description={process.shortDescription || ""}
                imageUrl={process.imageUrl || undefined}
                link={`/processos/${process.slug}`}
              />
            ))
          )}
        </div>
      </RecomSection>

      {/* Industrial Footer CTA */}
      <section className="py-20 bg-recom-graphite text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-recom-red/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container-recom relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-recom-red font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block">Consultoria Técnica</span>
              <h2 className="text-white mb-6 uppercase tracking-tight">Fale com a RECOM</h2>
              <p className="text-[17px] text-white/60 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Nossa equipe está disponível para orientar sua cotação e indicar o ferramental correto para seu processo de usinagem.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <RecomButton asChild size="lg" intent="accent" className="h-12 px-10">
                  <Link href="/sobre#contato">Entrar em contato</Link>
                </RecomButton>
                <RecomButton asChild size="lg" intent="outline" className="h-12 px-10 border-white/20 text-white hover:bg-white/5">
                  <Link href="/fornecedores">Ver Catálogos</Link>
                </RecomButton>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm group hover:bg-white/10 transition-all">
                <h4 className="font-bold text-[16px] text-white mb-2">Setup Assistido</h4>
                <p className="text-[13px] text-white/40 leading-relaxed">Acompanhamento técnico presencial para garantir a máxima performance.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm group hover:bg-white/10 transition-all">
                <h4 className="font-bold text-[16px] text-white mb-2">Redução de Custos</h4>
                <p className="text-[13px] text-white/40 leading-relaxed">Análise técnica detalhada focada em produtividade e economia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

