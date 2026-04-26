import { getSupplierBySlug, getStaticSupplierSlugs } from "@/lib/services/supabase-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Factory } from "lucide-react";
import type { Metadata } from "next";
import { RecomButton } from "@/design-system/components/recom-button";

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
  const supplier = await getSupplierBySlug(slug);

  if (!supplier) {
    notFound();
  }

  return (
    <div className="flex flex-col pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-muted/10 border-b border-border py-4 md:py-5">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="/fornecedores" className="hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Fornecedores
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-foreground">{supplier.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-[1180px] px-4 md:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          <div className="w-full lg:w-[280px] aspect-square bg-white border border-border rounded-md flex items-center justify-center shrink-0 p-8 shadow-sm group">
            {supplier.logoUrl ? (
              <img src={supplier.logoUrl} alt={supplier.name} className="w-full h-full object-contain" />
            ) : supplier.slug === 'mitsubishi-materials' ? (
              <img src="/assets/images/Mitsubishi.png" alt={supplier.name} className="w-full h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center gap-4 text-muted-foreground/30">
                <Factory className="w-12 h-12 opacity-50" />
                <span className="font-bold tracking-widest uppercase text-[10px]">{supplier.name}</span>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest w-fit">
                Distribuidor Autorizado
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground uppercase leading-tight">{supplier.name}</h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {supplier.shortDescription}
            </p>
            
            <div className="prose prose-slate max-w-none border-l-2 border-primary/20 pl-6">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {supplier.longDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <RecomButton asChild size="lg" intent="primary" className="rounded-md">
                <Link href="/sobre#contato">Solicitar Cotação</Link>
              </RecomButton>
              {supplier.catalogUrl && (
                <RecomButton asChild size="lg" intent="outline" className="rounded-md">
                  <a href={supplier.catalogUrl} target="_blank" rel="noopener noreferrer">
                    Acessar Catálogo Oficial <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </RecomButton>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-[1180px] px-4 md:px-8 py-10 md:py-12">
        <div className="p-8 md:p-12 border border-border bg-slate-900 text-white rounded-md shadow-recom text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 uppercase">Atendimento Técnico Comercial</h2>
            <p className="text-base text-white/70 mb-8 leading-relaxed">
              Atendimento direto de nossa sede em Campinas para indicar ferramentas de metal duro e catálogos técnicos para sua usinagem.
            </p>
            <RecomButton asChild size="lg" intent="accent" className="rounded-md px-10">
              <Link href="/sobre#contato">Falar com a RECOM</Link>
            </RecomButton>
          </div>
        </div>
      </section>
    </div>
  );
}
