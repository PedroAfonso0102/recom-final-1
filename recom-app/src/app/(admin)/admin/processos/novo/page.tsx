import React from 'react';
import { ProcessForm } from '@/components/admin/ProcessForm';

export default function NewProcessPage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Novo Processo</h1>
        <p className="text-slate-500">Cadastre uma nova categoria de usinagem industrial.</p>
      </div>

      <ProcessForm />
    </div>
  );
}
