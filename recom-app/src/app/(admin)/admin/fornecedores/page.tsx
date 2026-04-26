import React from 'react';
import Link from 'next/link';
import { Plus, ArrowLeft, MoreVertical, Edit2 } from 'lucide-react';
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
import { getSuppliers } from '@/lib/services/supabase-data';

export default async function AdminSuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Gestão de Portfólio</span>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Fornecedores</h1>
          <p className="text-muted-foreground max-w-2xl text-sm font-medium">
            Gerenciamento de fábricas parceiras, catálogos técnicos e logos oficiais.
          </p>
        </div>
        <Link href="/admin/fornecedores/novo">
          <RecomButton className="gap-2 uppercase font-bold text-xs tracking-widest">
            <Plus className="h-4 w-4" />
            Novo Registro
          </RecomButton>
        </Link>
      </div>

      <RecomCard className="overflow-hidden border-border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-foreground py-4">Fábrica / Marca</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-foreground py-4">slug_id</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-foreground py-4 text-center">Status Operacional</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-foreground py-4 text-center">Prioridade</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-foreground py-4 text-right px-6">Gerenciamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Nenhum registro encontrado no sistema.
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((supplier) => (
                <TableRow key={supplier.id || supplier.slug} className="border-border hover:bg-muted/30 transition-colors">
                  <TableCell className="py-4">
                    <span className="font-bold text-sm uppercase tracking-tight">{supplier.name}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <code className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                      {supplier.slug}
                    </code>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-none border ${
                      supplier.status === 'active' 
                        ? 'bg-primary/5 text-primary border-primary/20' 
                        : supplier.status === 'archived' 
                        ? 'bg-destructive/5 text-destructive border-destructive/20' 
                        : 'bg-muted text-muted-foreground border-border'
                    }`}>
                      {supplier.status === 'active' ? 'Ativo' : supplier.status === 'archived' ? 'Arquivado' : 'Rascunho'}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-center text-xs font-bold text-muted-foreground">
                    {String(supplier.sortOrder).padStart(2, '0')}
                  </TableCell>
                  <TableCell className="py-4 text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/fornecedores/${supplier.slug}/editar`}>
                        <RecomButton variant="secondary" size="sm" className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest border-border">
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

