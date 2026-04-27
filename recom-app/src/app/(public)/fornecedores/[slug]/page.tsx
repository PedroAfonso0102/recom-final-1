import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Factory } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { CTASection } from "@/design-system/components/cta-section";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomSection } from "@/design-system/components/recom-section";
import { getProcesses, getStaticSupplierSlugs, getSupplierBySlug } from "@/lib/services/supabase-data";

interface SupplierDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SupplierDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);

  if (!supplier) {
    return { title: "Fornecedor não encontrado | RECOM" };
  }

  return {
    title: supplier.seoTitle || `${supplier.name} | RECOM Metal Duro`,
    description: supplier.seoDescription || supplier.shortDescription,
  };
}

export async function generateStaticParams() {
  return await getStaticSupplierSlugs();
}

export default async function SupplierDetailPage({ params }: SupplierDetailPageProps) {
  const { slug } = await params;
  const [supplier, processes] = await Promise.all([getSupplierBySlug(slug), getProcesses()]);

  if (!supplier) {
    notFound();
  }

  const relatedProcesses = supplier.relatedProcesses
    .map((processId) => processes.find((process) => process.id === processId)?.name)
    .filter(Boolean) as string[];

  return (
    <div className="flex flex-col pb-24">
      <div className="border-b border-recom-border bg-recom-gray-50 py-4 md:py-5">
        <div className="container-recom">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Fornecedores & Catálogos", href: "/fornecedores" },
              { label: supplier.name },
            ]}
          />
        </div>
      </div>

      <section data-hook="public.suppliers.detail.hero" className="container-recom py-12 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex w-full shrink-0 items-center justify-center rounded-xl border border-border bg-white p-8 shadow-recom-card lg:w-[280px]">
            {supplier.logoUrl && supplier.logoUrl.trim() !== "" ? (
              <img src={supplier.logoUrl} alt={supplier.name} className="h-full w-full object-contain" />
            ) : supplier.slug === "mitsubishi" || supplier.slug === "mitsubishi-materials" ? (
              <img src="/assets/images/mitsubishi-logo.png" alt={supplier.name} className="h-full w-full object-contain" />
            ) : (
              <div className="flex flex-col items-center gap-4 text-muted-foreground/35">
                <Factory className="h-12 w-12" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{supplier.name}</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                Distribuidor autorizado
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase leading-tight md:text-4xl lg:text-5xl">
                {supplier.name}
              </h1>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              {supplier.shortDescription}
            </p>

            <div className="border-l-2 border-primary/20 pl-6">
              <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line md:text-lg">
                {supplier.longDescription}
              </p>
            </div>

            {relatedProcesses.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/55">
                  Processos relacionados
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedProcesses.map((process) => (
                    <span
                      key={process}
                      className="inline-flex items-center rounded-md border border-recom-border/40 bg-recom-gray-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/75"
                    >
                      {process}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              <RecomButton asChild size="lg" intent="primary" className="h-12 px-8">
                <Link href="/sobre#contato">
                  Solicitar cotação
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </RecomButton>
              {supplier.catalogUrl && (
                <RecomButton asChild size="lg" intent="outline" className="h-12 px-8">
                  <a href={supplier.catalogUrl} target="_blank" rel="noopener noreferrer">
                    Acessar catálogo oficial
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </RecomButton>
              )}
              {supplier.catalogs && supplier.catalogs.length > 0 && (
                <div className="w-full pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/55 mb-3">
                    Catálogos Adicionais
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {supplier.catalogs.map((cat, idx) => (
                      <RecomButton key={idx} asChild size="sm" intent="outline" className="h-10 px-4 text-xs">
                        <a href={cat.url} target="_blank" rel="noopener noreferrer">
                          {cat.label}
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </RecomButton>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <RecomSection
        data-hook="public.suppliers.detail.resolves"
        eyebrow="Apoio comercial"
        title={`O que a ${supplier.name} resolve na sua produção`}
        description="Resumo da aplicação e da presença técnica da marca atendida pela RECOM."
        className="bg-recom-gray-50 py-16 md:py-20"
        containerSize="editorial"
      >
        <div className="space-y-6">
          <p className="text-[16px] leading-relaxed text-muted-foreground whitespace-pre-line">
            {supplier.longDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            <RecomButton asChild intent="outline" className="h-11 px-6">
              <Link href="/fornecedores">
                Ver todos os fornecedores
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </RecomButton>
            <RecomButton asChild intent="ghost" className="h-11 px-6">
              <Link href="/processos">Explorar processos</Link>
            </RecomButton>
          </div>
        </div>
      </RecomSection>

      <CTASection
        dataHook="public.suppliers.detail.final-cta"
        eyebrow="Atendimento técnico comercial"
        title="Precisa de uma cotação ou de uma orientação técnica?"
        description="Atendimento direto de nossa sede em Campinas para indicar ferramentas de metal duro e catálogos técnicos para sua usinagem."
        primaryCta={{ label: "Falar com a RECOM", href: "/sobre#contato" }}
        secondaryCta={{ label: "Voltar para fornecedores", href: "/fornecedores" }}
        note="Compra assistida, catalogação oficial e contato humano na mesma jornada."
      />
    </div>
  );
}
