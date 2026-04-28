import Link from "next/link";
import { FilePlus2 } from "lucide-react";

import { DataTable, EmptyState, PageHeader, StatusBadge } from "@/components/admin/admin-kit";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { createAdminClient } from "@/lib/supabase/admin";
import { listCmsPages } from "@/server/queries/cms-pages";

function formatDate(value: string | null) {
  if (!value) return "Sem alteracao";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function typeLabel(pageType: string, isSystem: boolean) {
  if (pageType === "dynamic_template") return "Template dinamico";
  if (isSystem) return "Sistema";
  return "Pagina livre";
}

export default async function AdminPagesPage() {
  const pages = await listCmsPages();
  const supabase = createAdminClient();
  const sectionCounts = await Promise.all(
    pages.map(async (page) => {
      const { count } = await supabase.from("page_sections").select("id", { count: "exact", head: true }).eq("page_id", page.id);
      return [page.id, count ?? 0] as const;
    })
  );
  const counts = new Map(sectionCounts);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Conteudo"
        title="Inventario editorial"
        description="Lista unica de URLs, tipos, status, SEO, blocos e ultima alteracao. Todas as acoes criticas usam texto, nao icones soltos."
        actions={
          <Button asChild size="sm" variant="outline">
            <Link href="/admin/pages/new">
              <FilePlus2 className="h-4 w-4" /> Nova pagina
            </Link>
          </Button>
        }
      />

      {pages.length === 0 ? (
        <EmptyState title="Nenhuma pagina cadastrada" description="Crie uma pagina para iniciar o inventario editorial." action={<Button asChild size="sm"><Link href="/admin/pages/new">Criar pagina</Link></Button>} />
      ) : (
        <DataTable columns={["Pagina", "URL", "Tipo", "Status", "SEO", "Blocos", "Ultima alteracao", "Acoes"]}>
          {pages.map((page) => {
            const seoOk = Boolean(page.seo_title && page.seo_description);
            const blockCount = counts.get(page.id) ?? 0;
            const publicPath = page.slug === "home" ? "/" : `/${page.slug}`;

            return (
              <TableRow key={page.id} className="border-slate-100 hover:bg-slate-50">
                <TableCell>
                  <p className="font-semibold text-slate-950">{page.title}</p>
                  <p className="text-xs text-slate-500">{page.template_key || "Sem template"}</p>
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-700">{publicPath}</TableCell>
                <TableCell className="text-sm text-slate-700">{typeLabel(page.page_type, page.is_system)}</TableCell>
                <TableCell><StatusBadge status={page.status} /></TableCell>
                <TableCell>{seoOk ? <StatusBadge status="success" label="Completo" /> : <StatusBadge status="warning" label="Pendente" />}</TableCell>
                <TableCell>{blockCount > 0 ? <StatusBadge status="success" label={`${blockCount} blocos`} /> : <StatusBadge status="warning" label="Sem blocos" />}</TableCell>
                <TableCell className="text-sm text-slate-600">{formatDate(page.updated_at)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline"><Link href={`/admin/pages/${page.id}`}>Editar pagina</Link></Button>
                    <Button asChild size="sm" variant="outline"><Link href={`/admin/pages/${page.id}/sections`}>Editar blocos</Link></Button>
                    {page.page_type !== "dynamic_template" ? <Button asChild size="sm" variant="ghost"><Link href={`/admin/preview/${page.slug}`} target="_blank">Preview</Link></Button> : null}
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
