import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { CTASection } from "@/design-system/components/cta-section";
import { RecomButton } from "@/design-system/components/recom-button";
import { getProcessBySlug, getStaticProcessSlugs, getSuppliers } from "@/lib/services/supabase-data";

import { buildSeoMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/cms/queries";

interface ProcessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProcessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [process, settings] = await Promise.all([
    getProcessBySlug(slug),
    getSiteSettings()
  ]);

  if (!process) {
    return buildSeoMetadata({ title: "Processo não encontrado", noIndex: true, siteSettings: settings });
  }

  return buildSeoMetadata({
    title: process.seoTitle || `${process.name} | RECOM Metal Duro`,
    description: process.seoDescription || process.shortDescription,
    slug: `solucoes/${slug}`,
    image: process.imageUrl,
    siteSettings: settings
  });
}

export async function generateStaticParams() {
  return await getStaticProcessSlugs();
}

export default async function ProcessDetailPage({ params }: ProcessPageProps) {
  const { slug } = await params;
  const [process, suppliers] = await Promise.all([getProcessBySlug(slug), getSuppliers()]);

  if (!process) {
    notFound();
  }

  const relatedSuppliers = suppliers.filter((supplier) => supplier.relatedProcesses.includes(process.id || ""));
  const paragraphs = process.longDescription.split("\n").filter((paragraph) => paragraph.trim().length > 0);
  const visualImage = process.imageUrl && process.imageUrl.trim() !== "" ? process.imageUrl : null;
  const contactHref = `/contato?processo=${encodeURIComponent(process.slug)}&solucao=${encodeURIComponent(process.name)}`;

  return (
    <div className="flex flex-col pb-16">
      <div className="border-b border-recom-border bg-recom-gray-50 py-4 md:py-5">
        <div className="container-recom">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Soluções / Processos", href: "/solucoes" },
              { label: process.name },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-recom-border bg-white py-12 md:py-16">
        <div className="container-recom">
          <Link
            href="/solucoes"
            className="mb-10 inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-recom-blue"
          >
            <ArrowLeft className="mr-2 h-3 w-3" />
            Voltar para processos
          </Link>

          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Engenharia de aplicação
            </div>
            <h1 className="mb-6 text-3xl font-bold tracking-tight uppercase text-foreground md:text-4xl">
              {process.name}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {process.shortDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="container-recom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-12 lg:col-span-8">
            <div className="space-y-6">
              <h2 className="border-l-2 border-primary pl-4 text-[10px] font-bold uppercase tracking-widest text-primary">
                Análise do processo
              </h2>
              <div className="space-y-4">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[16px] leading-relaxed text-muted-foreground md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-recom-card">
              {visualImage ? (
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={visualImage}
                    alt={process.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover grayscale transition-all duration-700"
                  />
                </div>
              ) : (
                <div className="flex min-h-[240px] items-center justify-center bg-recom-gray-50 p-8 text-center">
                  <div className="max-w-sm space-y-3">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-recom-blue/45" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Imagem não definida
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Este processo ainda não tem imagem no CMS. Adicione uma mídia para enriquecer a página no desktop e no mobile.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-border bg-recom-graphite p-8 text-white shadow-recom">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Atendimento técnico comercial
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight uppercase md:text-2xl">
                  Ferramentas para {process.name}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-white/72">
                  A RECOM oferece consultoria técnica especializada e fornece as melhores geometrias e coberturas para o seu processo de {process.name.toLowerCase()}.
                </p>
                <div className="pt-2">
                  <RecomButton asChild size="lg" intent="accent" className="h-11 px-8">
                    <Link href={contactHref}>
                      Solicitar orçamento
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </RecomButton>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-border bg-white p-8 shadow-recom-card">
              <h3 className="mb-4 text-lg font-bold tracking-tight uppercase">Contato direto</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Nossos engenheiros estão prontos para indicar a melhor solução de {process.name.toLowerCase()} para o seu equipamento e material.
              </p>

              <div className="space-y-4">
                <RecomButton asChild intent="primary" className="h-11 w-full">
                  <Link href={contactHref}>Falar com a RECOM</Link>
                </RecomButton>
                <RecomButton asChild intent="outline" className="h-11 w-full">
                  <Link href="/fornecedores-catalogos">Ver fornecedores</Link>
                </RecomButton>
              </div>
            </div>

            {relatedSuppliers.length > 0 && (
              <div className="rounded-xl border border-border bg-recom-gray-50 p-8">
                <h4 className="mb-6 border-b border-border pb-4 text-[10px] font-bold uppercase tracking-widest text-foreground">
                  Fornecedores relacionados
                </h4>
                <div className="flex flex-wrap gap-2">
                  {relatedSuppliers.map((supplier) => (
                    <Link
                      key={supplier.id}
                      href={`/fornecedores-catalogos/${supplier.slug}`}
                      className="inline-flex items-center rounded-md border border-recom-border/40 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/75 transition-colors hover:border-recom-blue/25 hover:text-recom-blue"
                    >
                      {supplier.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl border border-border bg-recom-gray-50 p-8">
              <h4 className="mb-6 border-b border-border pb-4 text-[10px] font-bold uppercase tracking-widest text-foreground">
                Exploração adicional
              </h4>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/fornecedores-catalogos"
                  className="group flex items-center justify-between text-[10px] font-bold uppercase tracking-tight text-muted-foreground transition-colors hover:text-primary"
                >
                  Nossos fornecedores
                  <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                </Link>
                <Link
                  href="/solucoes"
                  className="group flex items-center justify-between text-[10px] font-bold uppercase tracking-tight text-muted-foreground transition-colors hover:text-primary"
                >
                  Todos os processos
                  <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                </Link>
                <Link
                  href={contactHref}
                  className="group flex items-center justify-between text-[10px] font-bold uppercase tracking-tight text-muted-foreground transition-colors hover:text-primary"
                >
                  Solicitar cotação
                  <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                </Link>
              </nav>
            </div>
          </aside>
        </div>
      </section>

      <CTASection
        dataHook="public.processes.detail.final-cta"
        eyebrow="Atendimento técnico comercial"
        title={`Ferramentas para ${process.name}`}
        description="A RECOM oferece consultoria técnica especializada e fornece as melhores geometrias e coberturas para o seu processo."
        primaryCta={{ label: "Solicitar orçamento", href: contactHref }}
        secondaryCta={{ label: "Explorar fornecedores", href: "/fornecedores-catalogos" }}
        note="Foco em produtividade, precisão e suporte humano."
      />
    </div>
  );
}
