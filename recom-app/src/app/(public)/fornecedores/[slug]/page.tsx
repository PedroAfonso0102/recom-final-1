import { getSupplierBySlug, getStaticSupplierSlugs } from "@/lib/services/supabase-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Factory } from "lucide-react";
import type { Metadata } from "next";

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
      <div className="bg-muted/10 border-b-2 border-foreground py-6">
        <div className="container mx-auto px-4 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          <Link href="/fornecedores" className="hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Fornecedores
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-foreground">{supplier.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24" data-hook="suppliers.detail-hero">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <div className="w-full lg:w-[400px] aspect-square bg-white border-2 border-foreground rounded-2xl flex items-center justify-center shrink-0 p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group">
            {supplier.logoUrl ? (
              <img src={supplier.logoUrl} alt={supplier.name} className="w-full h-full object-contain grayscale transition-all duration-700 group-hover:grayscale-0" />
            ) : supplier.slug === 'mitsubishi-materials' ? (
              <img src="/assets/images/Mitsubishi.png" alt={supplier.name} className="w-full h-full object-contain grayscale transition-all duration-700 group-hover:grayscale-0" />
            ) : (
              <div className="flex flex-col items-center gap-4 text-muted-foreground/30">
                <Factory className="w-16 h-16 opacity-50" />
                <span className="font-black tracking-[0.3em] uppercase text-xs">{supplier.name}</span>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest w-fit">
                Distribuidor Autorizado
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground uppercase">{supplier.name}</h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
              {supplier.shortDescription}
            </p>
            
            <div className="prose prose-slate max-w-none border-l-4 border-foreground/10 pl-8">
              <p className="text-lg text-muted-foreground leading-relaxed font-medium whitespace-pre-line">
                {supplier.longDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-8">
              <Link
                href="/sobre#contato"
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-14 px-10 text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]"
              >
                Solicitar Cotação
              </Link>
              {supplier.catalogUrl && (
                <a
                  href={supplier.catalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 justify-center rounded-md border-2 border-foreground h-14 px-10 text-xs font-black uppercase tracking-widest hover:bg-muted/30 transition-all"
                >
                  Acessar Catálogo Oficial <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="p-10 md:p-20 border-2 border-foreground bg-foreground text-background rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none grayscale">
            <img src="/assets/images/carbide.png" alt="BG" className="object-cover w-full h-full" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 uppercase">Atendimento Técnico Comercial</h2>
            <p className="text-lg text-background/70 mb-12 font-medium leading-relaxed">
              Atendimento direto de nossa sede em Campinas para indicar ferramentas de metal duro e catálogos técnicos para sua usinagem.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-12 px-10 text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all"
            >
              Falar com a RECOM
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
