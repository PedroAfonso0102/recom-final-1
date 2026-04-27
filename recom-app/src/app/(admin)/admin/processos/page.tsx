import React from 'react';
import Link from 'next/link';
import { Plus, Edit2 } from 'lucide-react';
import { RecomButton } from '@/design-system/components/recom-button';
import { RecomCard } from '@/design-system/components/recom-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getProcesses } from '@/lib/services/supabase-data';

export default async function AdminProcessesPage() {
  const processes = await getProcesses({ allowFallback: false });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-primary">Arquitetura Industrial</span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Processos</h1>
          <p className="text-slate-500 max-w-2xl text-sm font-medium">
            Gerenciamento de categorias técnicas de usinagem, descrições e ativos visuais.
          </p>
        </div>
        <Link href="/admin/processos/novo">
          <RecomButton className="gap-2 font-bold text-xs shadow-sm">
            <Plus className="h-4 w-4" />
            Novo Registro
          </RecomButton>
        </Link>
      </div>

      <RecomCard className="overflow-hidden border-slate-200 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="text-xs font-bold text-slate-500 py-4">Processo</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 py-4">Slug ID</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 py-4 text-center">Status</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 py-4 text-center">Ordem</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 py-4 text-right px-6">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center text-sm font-medium text-slate-400">
                  Nenhum processo catalogado.
                </TableCell>
              </TableRow>
            ) : (
              processes.map((process) => (
                <TableRow key={process.id || process.slug} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="py-4">
                    <span className="font-bold text-sm text-slate-900">{process.name}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <code className="text-[11px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      {process.slug}
                    </code>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                      process.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : process.status === 'archived' 
                        ? 'bg-slate-50 text-slate-500 border-slate-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {process.status === 'active' ? 'Ativo' : process.status === 'archived' ? 'Arquivado' : 'Rascunho'}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-center text-xs font-semibold text-slate-400">
                    {String(process.sortOrder).padStart(2, '0')}
                  </TableCell>
                  <TableCell className="py-4 text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/processos/${process.slug}/editar`}>
                        <RecomButton intent="secondary" size="sm" className="h-8 px-4 text-xs font-bold border-slate-200 hover:bg-slate-50">
                          <Edit2 className="h-3 w-3 mr-1.5" />
                          Editar
                        </RecomButton>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </RecomCard>
    </div>
  );
}

