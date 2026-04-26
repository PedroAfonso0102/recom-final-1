import { getSuppliers } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowRight, Download, Factory } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fornecedores e Marcas Parceiras",
  description: "Distribuidor oficial Mitsubishi Materials, 7Leaders, BT Fixo e Kifix em Campinas. Catálogos técnicos e suporte oficial.",
};

export default async function FornecedoresPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      {/* Header da Página */}
      <section className="container mx-auto px-4 pt-12 md:pt-24">
        <div className="max-w-[800px]">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6" data-hook="content-title">
            Marcas & Fornecedores
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" data-hook="content-text">
            A RECOM® trabalha exclusivamente com fabricantes que são referência global em tecnologia de usinagem, garantindo a procedência e a alta performance de cada ferramenta.
          </p>
        </div>
      </section>

      {/* Suppliers Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-hook="public.suppliers.hub">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="flex flex-col border border-border rounded-xl bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="p-8 flex-1 flex flex-col gap-4">
                <div className="h-16 flex items-center mb-4">
                  {/* Se houvesse imagem real: <img src={supplier.logo} alt={supplier.name} className="max-h-full max-w-[200px] object-contain" /> */}
                  {/* Placeholder */}
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Factory className="w-8 h-8" />
                    <span className="font-bold text-xl tracking-tight">{supplier.name}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {supplier.description}
                </p>
              </div>
              <div className="bg-muted/30 p-6 border-t border-border flex flex-col gap-4">
                <Link 
                  href={`/fornecedores/${supplier.slug}`}
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm w-full"
                >
                  Ver Soluções
                </Link>
                {supplier.catalogLink && (
                  <a 
                    href={supplier.catalogLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
                  >
                    Site Oficial <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog Section */}
      <section className="container mx-auto px-4">
        <div className="p-8 md:p-12 border border-dashed border-border rounded-xl bg-muted/10">
          <div className="mb-8 max-w-[800px]">
            <h2 className="text-2xl font-bold tracking-tight mb-2" data-hook="content-subtitle">Acesso Direto aos Catálogos</h2>
            <p className="text-muted-foreground">Se você já conhece a linha de produtos, acesse o PDF oficial:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-hook="catalog-links-container">
            {suppliers.map(supplier => (
              <div key={`cat-${supplier.id}`} className="flex flex-col gap-3 p-4 bg-background border border-border rounded-lg">
                <h4 className="text-sm font-bold">{supplier.name}</h4>
                {supplier.content?.catalogs?.[0] ? (
                  <a 
                    href={supplier.content.catalogs[0].link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Catálogo Geral (PDF)
                  </a>
                ) : (
                  <span className="mt-auto text-sm text-muted-foreground italic">Catálogo sob consulta</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
