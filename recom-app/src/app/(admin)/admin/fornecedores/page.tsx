import Link from "next/link";
import { Plus } from "lucide-react";

import { DataTable, EmptyState, PageHeader, StatusBadge } from "@/components/admin/admin-kit";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getSuppliers } from "@/lib/services/supabase-data";

function formatDate(value?: string | null) {
  if (!value) return "Sem revisao";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(value));
}

export default async function AdminSuppliersPage() {
  const suppliers = await getSuppliers({ allowFallback: false });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catalogo"
        title="Fornecedores"
        description="Inventario operacional de marcas, catalogos, processos relacionados, SEO e publicacao. Pendencias aparecem sem abrir o registro."
        actions={
          <Button asChild size="sm">
            <Link href="/admin/fornecedores/novo">
              <Plus className="h-4 w-4" /> Novo fornecedor
            </Link>
          </Button>
        }
      />

      {suppliers.length === 0 ? (
        <EmptyState title="Nenhum fornecedor cadastrado" description="Cadastre o primeiro fornecedor para montar o catalogo publico e relacionar processos." action={<Button asChild size="sm"><Link href="/admin/fornecedores/novo">Criar fornecedor</Link></Button>} />
      ) : (
        <DataTable columns={["Fornecedor", "Catalogo", "Processos", "SEO", "Status", "Ultima revisao", "Acoes"]}>
          {suppliers.map((supplier) => {
            const catalogCount = supplier.catalogs.length;
            const seoOk = Boolean(supplier.seo?.title && supplier.seo?.description);
            const processCount = supplier.relatedProcesses.length;

            return (
              <TableRow key={supplier.id || supplier.slug} className="border-slate-100 hover:bg-slate-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-14 items-center justify-center border border-slate-200 bg-white">
                      {supplier.logoUrl ? (
                        <img src={supplier.logoUrl} alt="" className="max-h-8 w-auto object-contain" />
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-400">Logo</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{supplier.name}</p>
                      <p className="text-xs text-slate-500">/{supplier.slug}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{catalogCount > 0 ? <StatusBadge status="success" label={`${catalogCount} links`} /> : <StatusBadge status="warning" label="Sem catalogo" />}</TableCell>
                <TableCell className="text-sm text-slate-700">{processCount > 0 ? `${processCount} processos` : "Sem vinculo"}</TableCell>
                <TableCell>{seoOk ? <StatusBadge status="success" label="Completo" /> : <StatusBadge status="warning" label="Pendente" />}</TableCell>
                <TableCell><StatusBadge status={supplier.status === "active" ? "active" : supplier.status} /></TableCell>
                <TableCell className="text-sm text-slate-600">{formatDate(supplier.updatedAt)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline"><Link href={`/admin/fornecedores/${supplier.slug}/editar`}>Editar fornecedor</Link></Button>
                    <Button asChild size="sm" variant="ghost"><Link href={`/fornecedores/${supplier.slug}`} target="_blank">Ver pagina</Link></Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </DataTable>
      )}
    </div>
  );
}
