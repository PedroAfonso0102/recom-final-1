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
      {/* Header da Página */}
      <section className="bg-background border-b border-border py-10 md:py-14">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
              Engenharia de Aplicação
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Ferramentas para processos de <span className="text-primary">usinagem</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Facilitamos o acesso a ferramentas de corte para torneamento, fresamento, furação e fixação. Atendimento técnico comercial em Campinas e região.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Processos */}
      <RecomSection
        title="Nossas Soluções por Processo"
        description="Encontre as melhores ferramentas e tecnologias para cada etapa da sua produção."
        className="bg-muted/10 py-10 md:py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {processes.length === 0 ? (
            <div className="col-span-full text-center py-24 border border-dashed border-border rounded-xl bg-background text-muted-foreground">
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

      {/* CTA Final */}
      <section className="bg-primary py-10 md:py-12">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-primary-foreground mb-3">
              Precisa de uma análise técnica?
            </h2>
            <p className="text-primary-foreground/80 text-sm md:text-base mb-6">
              A RECOM® auxilia na escolha da melhor ferramenta para o seu material e máquina, otimizando o setup e reduzindo o tempo de ciclo.
            </p>
            <RecomButton asChild size="md" intent="secondary" className="rounded-md">
              <Link href="/sobre#contato">Falar com suporte técnico</Link>
            </RecomButton>
          </div>
        </div>
      </section>
    </div>
  );
}

