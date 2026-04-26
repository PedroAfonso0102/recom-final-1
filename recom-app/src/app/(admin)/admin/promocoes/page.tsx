import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getPromotions } from '@/lib/services/supabase-data';

export default async function AdminPromotionsPage() {
  const promotions = await getPromotions({ allowFallback: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Promoções</h1>
          <p className="text-slate-500">Gerencie campanhas de descontos e queimas de estoque.</p>
        </div>
        <Link href="/admin/promocoes/novo">
          <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900">
            <Plus className="h-4 w-4" />
            Nova Promoção
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Fim em</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                  Nenhuma promoção encontrada.
                </TableCell>
              </TableRow>
            ) : (
              promotions.map((promo) => (
                <TableRow key={promo.id || promo.slug}>
                  <TableCell className="font-medium">{promo.title}</TableCell>
                  <TableCell className="text-slate-500">{new Date(promo.endsAt).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      promo.status === 'active' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' :
                      promo.status === 'archived' ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10' :
                      'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/10'
                    }`}>
                      {promo.status === 'active' ? 'Ativa' : promo.status === 'archived' ? 'Encerrada' : 'Rascunho'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/promocoes/${promo.slug}/editar`}>
                      <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                        Editar
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
