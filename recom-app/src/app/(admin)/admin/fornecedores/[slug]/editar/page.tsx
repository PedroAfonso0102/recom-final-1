import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { SupplierForm } from "@/components/admin/SupplierForm";
import { getSupplierBySlug } from "@/lib/services/supabase-data";

interface SupplierEditPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SupplierEditPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug, { allowFallback: false });

  if (!supplier) {
    return { title: "Fornecedor não encontrado | Admin RECOM" };
  }

  return {
    title: `Editar ${supplier.name} | Admin RECOM`,
    description: `Atualize os dados de ${supplier.name}.`,
  };
}

export default async function EditSupplierPage({ params }: SupplierEditPageProps) {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug, { allowFallback: false });

  if (!supplier) {
    notFound();
  }

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div className="space-y-3">
        <Link href="/admin/fornecedores" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-3 w-3" />
          Voltar para fornecedores
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editar fornecedor</h1>
        <p className="text-slate-500">Atualize a marca, o catálogo oficial e a descrição institucional.</p>
      </div>

      <SupplierForm initialData={supplier} />
    </div>
  );
}
