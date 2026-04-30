import React from "react";
import Link from "next/link";
import { Plus, ExternalLink, Edit3 } from "lucide-react";

import { AdminStatusBadge, AdminEntityListPage } from "@/components/admin/editor";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getSuppliers } from "@/lib/services/supabase-data";
import { Supplier } from "@/cms/schemas/supplier.schema";

function formatDate(value?: string | null) {
  if (!value) return "Sem revisão";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(value));
}

export default async function AdminSuppliersPage() {
  const suppliers = await getSuppliers({ allowFallback: false });

  return (
    <AdminEntityListPage<Supplier>
      title="Fornecedores"
      description="Inventário operacional de marcas, catálogos, processos relacionados, SEO e publicação. Pendências aparecem sem abrir o registro."
      eyebrow="Catálogo"
      primaryAction={{
        label: "Novo Fornecedor",
        href: "/admin/fornecedores/novo",
        icon: Plus
      }}
      items={suppliers as unknown as Supplier[]}
      searchFields={["name", "slug"]}
      statusField="status"
      columns={["Fornecedor", "Catálogo", "Processos", "SEO", "Status", "Última Revisão", "Ações"]}
      renderItem={(supplier) => {
        const catalogCount = supplier.catalogs?.length || 0;
        const seoOk = Boolean(supplier.seo?.title && supplier.seo?.description);
        const processCount = supplier.relatedProcesses?.length || 0;

        return (
          <TableRow key={supplier.id || supplier.slug} className="group border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
            <TableCell className="py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-16 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden p-2">
                  {supplier.logoUrl ? (
                    <img src={supplier.logoUrl} alt="" className="max-h-full w-auto object-contain" />
                  ) : (
                    <span className="text-[9px] font-black uppercase text-slate-300 tracking-tighter">Logo</span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-900 tracking-tight">{supplier.name}</p>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">/{supplier.slug}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              {catalogCount > 0 ? (
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-600">{catalogCount} links</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="text-xs font-bold text-slate-400">Vazio</span>
                </div>
              )}
            </TableCell>
            <TableCell>
              <span className="text-xs font-bold text-slate-600">
                {processCount > 0 ? `${processCount} processos` : "Nenhum"}
              </span>
            </TableCell>
            <TableCell>
              <AdminStatusBadge status={seoOk ? 'published' : 'draft'} />
            </TableCell>
            <TableCell>
              <AdminStatusBadge status={(supplier.status === 'active' || supplier.status === 'published') ? 'published' : 'draft'} />
            </TableCell>
            <TableCell>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {formatDate(supplier.updatedAt)}
              </p>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button asChild size="sm" variant="outline" className="h-8 rounded-lg border-slate-200 hover:bg-slate-50">
                  <Link href={`/admin/fornecedores/${supplier.slug}/editar`} className="flex items-center gap-2">
                    <Edit3 className="h-3 w-3" /> Editar
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost" className="h-8 rounded-lg hover:bg-slate-100">
                  <Link href={`/fornecedores/${supplier.slug}`} target="_blank" className="flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" /> Ver
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      }}
      emptyState={{
        title: "Nenhum fornecedor cadastrado",
        description: "Cadastre o primeiro fornecedor para montar o catálogo público e relacionar processos."
      }}
    />
  );
}
