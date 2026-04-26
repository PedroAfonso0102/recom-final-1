import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ProcessForm } from "@/components/admin/ProcessForm";
import { getProcessBySlug } from "@/lib/services/supabase-data";

interface ProcessEditPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProcessEditPageProps): Promise<Metadata> {
  const { slug } = await params;
  const process = await getProcessBySlug(slug, { allowFallback: false });

  if (!process) {
    return { title: "Processo não encontrado | Admin RECOM" };
  }

  return {
    title: `Editar ${process.name} | Admin RECOM`,
    description: `Atualize os dados de ${process.name}.`,
  };
}

export default async function EditProcessPage({ params }: ProcessEditPageProps) {
  const { slug } = await params;
  const process = await getProcessBySlug(slug, { allowFallback: false });

  if (!process) {
    notFound();
  }

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div className="space-y-3">
        <Link href="/admin/processos" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-3 w-3" />
          Voltar para processos
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editar processo</h1>
        <p className="text-slate-500">Atualize a descrição técnica, a imagem e o status de publicação.</p>
      </div>

      <ProcessForm initialData={process} />
    </div>
  );
}
