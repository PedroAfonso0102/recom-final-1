import React from 'react';
import { PromotionForm } from '@/components/admin/PromotionForm';
import { getSuppliers } from '@/lib/services/supabase-data';

export default async function NewPromotionPage() {
  const suppliers = await getSuppliers({ allowFallback: false });

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Nova Promoção</h1>
        <p className="text-slate-500">Crie uma nova campanha promocional.</p>
      </div>

      <PromotionForm suppliers={suppliers} />
    </div>
  );
}
