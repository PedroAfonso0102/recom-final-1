"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FilePlus2, Search, MoreHorizontal, Eye, Layout, Clock } from "lucide-react";

import { StatusBadge } from "@/components/admin/admin-kit";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { AdminEntityListPage } from "@/components/admin/editor/AdminEntityListPage";
import { listCmsPages } from "@/server/queries/cms-pages";
import { CmsPageRow, CmsPageStatus } from "@/cms/types";
import { createClient } from "@/lib/supabase/client";

function formatDate(value: string | null) {
  if (!value) return "Sem alteração";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function typeLabel(pageType: string, isSystem: boolean) {
  if (pageType === "dynamic_template") return "Template dinâmico";
  if (isSystem) return "Sistema";
  return "Página livre";
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<CmsPageRow[]>([]);
  const [counts, setCounts] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await listCmsPages();
      setPages(data);
      
      const supabase = createClient();
      const sectionCounts = await Promise.all(
        data.map(async (page: CmsPageRow) => {
          const { count } = await supabase
            .from("page_sections")
            .select("id", { count: "exact", head: true })
            .eq("page_id", page.id);
          return [page.id, count ?? 0] as const;
        })
      );
      setCounts(new Map(sectionCounts));
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Carregando Inventário...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminEntityListPage<CmsPageRow>
      title="Inventário Editorial"
      description="Lista única de URLs, tipos, status, SEO, blocos e última alteração. Todas as ações críticas usam texto, não ícones soltos."
      primaryAction={{
        label: "Nova Página",
        href: "/admin/pages/new",
        icon: FilePlus2
      }}
      items={pages}
      searchFields={["title", "slug"]}
      statusField="status"
      columns={["Página", "URL", "Status", "Estrutura", "Última Alteração", "Ações"]}
      renderItem={(page) => {
        const seoOk = Boolean(page.seo_title && page.seo_description);
        const blockCount = counts.get(page.id) ?? 0;
        const publicPath = page.slug === "home" ? "/" : `/${page.slug}`;

        return (
          <TableRow key={page.id} className="group border-slate-100 hover:bg-slate-50 transition-colors">
            <TableCell>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 uppercase tracking-tight text-xs">
                  {page.title}
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">
                  {typeLabel(page.page_type, page.is_system)}
                </span>
              </div>
            </TableCell>
            
            <TableCell>
              <code className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                {publicPath}
              </code>
            </TableCell>
            
            <TableCell>
              <div className="flex flex-col gap-1.5">
                <StatusBadge status={page.status as CmsPageStatus} />
                <div className="flex items-center gap-1">
                  <Search className={cn("h-3 w-3", seoOk ? "text-emerald-500" : "text-amber-400")} />
                  <span className="text-[9px] font-bold uppercase tracking-tighter text-slate-400">
                    SEO: {seoOk ? 'OK' : 'PENDENTE'}
                  </span>
                </div>
              </div>
            </TableCell>
            
            <TableCell>
              <div className="flex items-center gap-2">
                <Layout className="h-3.5 w-3.5 text-slate-300" />
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  blockCount > 0 ? "text-slate-600" : "text-amber-500"
                )}>
                  {blockCount} blocos
                </span>
              </div>
            </TableCell>
            
            <TableCell>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="h-3.5 w-3.5 opacity-40" />
                <span className="text-[10px] font-medium uppercase">
                  {formatDate(page.updated_at)}
                </span>
              </div>
            </TableCell>
            
            <TableCell>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button asChild size="sm" variant="outline" className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm">
                  <Link href={`/admin/pages/${page.id}`}>
                    Editar
                  </Link>
                </Button>
                
                <Button asChild size="sm" variant="ghost" className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900">
                  <Link href={`/admin/preview/${page.slug}`} target="_blank">
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    Preview
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      }}
      emptyState={{
        title: "Nenhuma página cadastrada",
        description: "Crie sua primeira página para começar a gerenciar o conteúdo do site."
      }}
    />
  );
}

// Helper to use cn in the same file if needed, but we should import it or use standard strings
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
