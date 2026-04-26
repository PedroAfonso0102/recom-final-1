import { getSupplierBySlug, getSuppliers } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Factory } from "lucide-react";

export async function generateStaticParams() {
  const suppliers = await getSuppliers();
  return suppliers.map((supplier) => ({
    slug: supplier.slug,
  }));
}

export default async function SupplierDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);

  if (!supplier) {
    notFound();
  }

  const { content } = supplier;

  return (
    <div className="flex flex-col pb-16">
      {/* Breadcrumb Header */}
      <div className="bg-muted/30 border-b border-border py-4">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/fornecedores" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Fornecedores
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{supplier.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24" data-hook="suppliers.detail-hero">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-64 h-32 md:h-48 bg-muted border border-border rounded-xl flex items-center justify-center shrink-0 p-8 shadow-sm">
             {/* <img src={supplier.logo} alt={supplier.name} className="w-full h-full object-contain object-left-top" /> */}
             <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-50">
               <Factory className="w-12 h-12" />
               <span className="font-bold tracking-widest uppercase">{supplier.name}</span>
             </div>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{supplier.name}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{content?.hero || supplier.description}</p>
          </div>
        </div>
      </section>

      {/* Resolves Section */}
      {content?.resolves && (
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 border-l-4 border-primary rounded-r-xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-bold mb-8">{content.resolves.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.resolves.items.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <strong className="text-foreground">{item.label}</strong>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights Section */}
      {content?.highlights && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Linhas em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.highlights.map((h, index) => (
              <div key={index} className="flex flex-col gap-3 p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ / Selection Guide */}
      {content?.faq && (
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Guia de Seleção {supplier.name}</h2>
          <div className="flex flex-col gap-4">
            {content.faq.map((f, index) => (
              <details key={index} className="group p-6 border border-border rounded-xl bg-card [&_summary::-webkit-details-marker]:hidden">
                <summary className="font-bold cursor-pointer flex items-center justify-between">
                  {f.q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Quotation Guide */}
      {content?.quotationGuide && (
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="p-8 md:p-12 border border-border bg-card rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Como cotar itens {supplier.name}</h2>
            <p className="text-muted-foreground mb-6">Para agilizar seu orçamento, informe preferencialmente:</p>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground pl-6 list-disc mb-8">
              {content.quotationGuide.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div>
              <Link 
                href="/contato" 
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Solicitar orçamento
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Catalogs */}
      {content?.catalogs && (
        <section className="container mx-auto px-4 py-12 text-center max-w-3xl">
          <div className="pt-12 border-t border-border">
            <h3 className="text-2xl font-bold mb-4">Catálogos {supplier.name}</h3>
            <p className="text-muted-foreground mb-8">Acesse o material técnico oficial para selecionar sua ferramenta:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {content.catalogs.map((c, index) => (
                <a 
                  key={index}
                  href={c.link} 
                  className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-medium transition-colors shadow-sm ${
                    c.label.includes('Geral') 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-background border border-input hover:bg-accent hover:text-accent-foreground'
                  }`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {c.label} <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
