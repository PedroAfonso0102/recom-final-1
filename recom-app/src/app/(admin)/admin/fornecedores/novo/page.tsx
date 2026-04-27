import React from 'react';
import { SupplierForm } from '@/components/admin/SupplierForm';
import { getProcesses } from '@/lib/services/supabase-data';

export default async function NewSupplierPage() {
  const processes = await getProcesses({ allowFallback: false });

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Novo Fornecedor</h1>
        <p className="text-slate-500">Adicione uma nova fábrica parceira ao catálogo da RECOM.</p>
      </div>

      <SupplierForm processes={processes} />
    </div>
  );
}
