import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { PromotionForm } from "@/components/admin/PromotionForm";
import { getPromotionBySlug } from "@/lib/services/supabase-data";

interface PromotionEditPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PromotionEditPageProps): Promise<Metadata> {
  const { slug } = await params;
  const promotion = await getPromotionBySlug(slug, { allowFallback: false });

  if (!promotion) {
    return { title: "Promoção não encontrada | Admin RECOM" };
  }

  return {
    title: `Editar ${promotion.title} | Admin RECOM`,
    description: `Atualize os dados de ${promotion.title}.`,
  };
}

export default async function EditPromotionPage({ params }: PromotionEditPageProps) {
  const { slug } = await params;
  const promotion = await getPromotionBySlug(slug, { allowFallback: false });

  if (!promotion) {
    notFound();
  }

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div className="space-y-3">
        <Link href="/admin/promocoes" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-3 w-3" />
          Voltar para promoções
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editar promoção</h1>
        <p className="text-slate-500">Atualize a campanha, o período de vigência e o CTA comercial.</p>
      </div>

      <PromotionForm initialData={promotion} />
    </div>
  );
}
