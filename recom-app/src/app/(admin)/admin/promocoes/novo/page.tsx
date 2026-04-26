import React from 'react';
import { PromotionForm } from '@/components/admin/PromotionForm';

export default function NewPromotionPage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Nova Promoção</h1>
        <p className="text-slate-500">Crie uma nova campanha promocional.</p>
      </div>

      <PromotionForm />
    </div>
  );
}
