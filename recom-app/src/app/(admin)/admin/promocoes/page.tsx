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
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Marketing Comercial</span>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Promoções</h1>
          <p className="text-muted-foreground max-w-2xl text-sm font-medium">
            Gerenciamento de campanhas sazonais, queimas de estoque e ofertas exclusivas.
          </p>
        </div>
        <Link href="/admin/promocoes/novo">
          <RecomButton className="gap-2 uppercase font-bold text-xs tracking-widest">
            <Plus className="h-4 w-4" />
            Lançar Campanha
          </RecomButton>
        </Link>
      </div>

      <RecomCard className="overflow-hidden border-border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-foreground py-4">Título da Campanha</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-foreground py-4">Término</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-foreground py-4 text-center">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-foreground py-4 text-right px-6">Gerenciamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-48 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Nenhuma campanha ativa no momento.
                </TableCell>
              </TableRow>
            ) : (
              promotions.map((promo) => (
                <TableRow key={promo.id || promo.slug} className="border-border hover:bg-muted/30 transition-colors">
                  <TableCell className="py-4">
                    <span className="font-bold text-sm uppercase tracking-tight">{promo.title}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs font-medium text-muted-foreground">
                      {new Date(promo.endsAt).toLocaleDateString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-none border ${
                      promo.status === 'active' 
                        ? 'bg-primary/5 text-primary border-primary/20' 
                        : promo.status === 'archived' 
                        ? 'bg-destructive/5 text-destructive border-destructive/20' 
                        : 'bg-muted text-muted-foreground border-border'
                    }`}>
                      {promo.status === 'active' ? 'Ativa' : promo.status === 'archived' ? 'Encerrada' : 'Rascunho'}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/promocoes/${promo.slug}/editar`}>
                        <RecomButton intent="secondary" size="sm" className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest border-border">
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

