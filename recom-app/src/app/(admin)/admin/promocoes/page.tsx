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
import { getPromotions } from '@/lib/services/supabase-data';

export default async function AdminPromotionsPage() {
  const promotions = await getPromotions({ allowFallback: false });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Marketing Comercial</span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Promoções</h1>
          <p className="text-slate-500 max-w-2xl text-sm font-medium">
            Gerenciamento de campanhas sazonais, queimas de estoque e ofertas exclusivas.
          </p>
        </div>
        <Link href="/admin/promocoes/novo">
          <RecomButton className="gap-2 font-bold text-xs tracking-tight rounded-xl">
            <Plus className="h-4 w-4" />
            Lançar Campanha
          </RecomButton>
        </Link>
      </div>

      <RecomCard className="overflow-hidden border-border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400 py-4">Título da Campanha</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400 py-4">Término</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400 py-4 text-center">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400 py-4 text-right px-6">Gerenciamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-48 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Nenhuma campanha ativa no momento.
                </TableCell>
              </TableRow>
            ) : (
              promotions.map((promo) => (
                <TableRow key={promo.id || promo.slug} className="border-border hover:bg-muted/30 transition-colors">
                  <TableCell className="py-4">
                    <span className="font-bold text-sm text-slate-900">{promo.title}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs font-medium text-muted-foreground">
                      {new Date(promo.endsAt).toLocaleDateString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                      promo.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : promo.status === 'archived' 
                        ? 'bg-slate-50 text-slate-600 border-slate-100' 
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {promo.status === 'active' ? 'Ativa' : promo.status === 'archived' ? 'Encerrada' : 'Rascunho'}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/promocoes/${promo.slug}/editar`}>
                        <RecomButton intent="secondary" size="sm" className="h-8 px-3 text-[10px] font-bold tracking-tight border-slate-200 rounded-lg">
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

