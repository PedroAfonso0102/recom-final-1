import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, FileText, Package, ShieldCheck, Tag, Users } from "lucide-react";

import { DataTable, EmptyState, PageHeader, StatusBadge } from "@/components/admin/admin-kit";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDashboardStats, getRecentLeads } from "@/lib/services/dashboard";
import { listCmsPages } from "@/server/queries/cms-pages";
import { getPromotions, getSuppliers } from "@/lib/services/supabase-data";

function daysUntil(value?: string | null) {
  if (!value) return null;
  const diff = new Date(value).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default async function AdminDashboard() {
  const [stats, recentLeads, suppliers, promotions, pages] = await Promise.all([
    getDashboardStats(),
    getRecentLeads(8),
    getSuppliers({ allowFallback: false }),
    getPromotions({ allowFallback: false }),
    listCmsPages(),
  ]);

  const leadsSemResposta = recentLeads.filter((lead) => lead.status === "new" || !lead.notified_at);
  const promocoesVencendo = promotions.filter((promotion) => {
    const days = daysUntil(promotion.endsAt);
    return days !== null && days >= 0 && days <= 30;
  });
  const fornecedoresSemCatalogo = suppliers.filter((supplier) => !supplier.catalogUrl && !supplier.eCatalogUrl && supplier.catalogs.length === 0);
  const fornecedoresSemSeo = suppliers.filter((supplier) => !supplier.seoTitle || !supplier.seoDescription);
  const paginasComRascunho = pages.filter((page) => page.status === "draft");

  const workItems = [
    {
      label: "Leads sem resposta",
      count: leadsSemResposta.length,
      href: "/admin/leads",
      action: "Responder leads",
      icon: Users,
      tone: leadsSemResposta.length > 0 ? "text-blue-800" : "text-slate-600",
    },
    {
      label: "Promocoes vencendo",
      count: promocoesVencendo.length,
      href: "/admin/promocoes",
      action: "Revisar vigencia",
      icon: Tag,
      tone: promocoesVencendo.length > 0 ? "text-amber-800" : "text-slate-600",
    },
    {
      label: "Fornecedores sem catalogo",
      count: fornecedoresSemCatalogo.length,
      href: "/admin/fornecedores",
      action: "Completar catalogo",
      icon: Package,
      tone: fornecedoresSemCatalogo.length > 0 ? "text-rose-800" : "text-slate-600",
    },
    {
      label: "Paginas em rascunho",
      count: paginasComRascunho.length,
      href: "/admin/pages",
      action: "Continuar edicao",
      icon: FileText,
      tone: paginasComRascunho.length > 0 ? "text-indigo-800" : "text-slate-600",
    },
  ];

  const supabase = createAdminClient();
  const healthCheck = await supabase.from("pages").select("id", { count: "exact", head: true });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Visao geral"
        title="Painel operacional"
        description="Priorize o que precisa de resposta, revisao editorial ou complemento de catalogo. Metricas de saude ficam como suporte, nao como centro da tela."
      />

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {workItems.map((item) => (
          <Link key={item.label} href={item.href} className="group border border-slate-200 bg-white p-4 transition-colors hover:border-slate-400">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-600">{item.label}</p>
                <p className={`mt-2 text-3xl font-semibold ${item.tone}`}>{item.count}</p>
              </div>
              <item.icon className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-950">
              {item.action}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-950">Fila comercial</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/leads">Ver todos os leads</Link>
            </Button>
          </div>

          {leadsSemResposta.length === 0 ? (
            <EmptyState title="Sem leads pendentes" description="Todos os leads recentes tem algum encaminhamento registrado. Proximo passo: revisar fornecedores sem catalogo." action={<Button asChild size="sm"><Link href="/admin/fornecedores">Ver fornecedores</Link></Button>} />
          ) : (
            <DataTable columns={["Lead", "Empresa", "Status", "Entrada", "Proximo passo"]}>
              {leadsSemResposta.slice(0, 5).map((lead) => (
                <TableRow key={lead.id} className="border-slate-100">
                  <TableCell className="font-medium text-slate-950">{lead.name}</TableCell>
                  <TableCell className="text-sm text-slate-600">{lead.company || lead.email}</TableCell>
                  <TableCell><StatusBadge status={lead.status || "new"} /></TableCell>
                  <TableCell className="text-sm text-slate-600">{new Date(lead.created_at).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <Button asChild size="sm" variant="outline">
                      <Link href="/admin/leads">Responder</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </DataTable>
          )}
        </div>

        <aside className="space-y-3">
          <section className="border border-slate-200 bg-white p-4">
            <h2 className="text-base font-semibold text-slate-950">Saude do sistema</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Supabase</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Operando</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">CMS Pages</span>
                <span className="font-semibold text-slate-950">{healthCheck.count ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Permissoes</span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700"><ShieldCheck className="h-4 w-4" /> Ativas</span>
              </div>
            </div>
          </section>

          <section className="border border-slate-200 bg-white p-4">
            <h2 className="text-base font-semibold text-slate-950">Pendencias editoriais</h2>
            <div className="mt-4 space-y-3 text-sm">
              <Link href="/admin/fornecedores" className="flex items-center justify-between hover:text-slate-950">
                <span className="text-slate-600">Fornecedores sem SEO</span>
                <strong>{fornecedoresSemSeo.length}</strong>
              </Link>
              <Link href="/admin/promocoes" className="flex items-center justify-between hover:text-slate-950">
                <span className="text-slate-600">Promocoes em 30 dias</span>
                <strong>{promocoesVencendo.length}</strong>
              </Link>
              <Link href="/admin/pages" className="flex items-center justify-between hover:text-slate-950">
                <span className="text-slate-600">Paginas rascunho</span>
                <strong>{paginasComRascunho.length}</strong>
              </Link>
            </div>
          </section>

          <section className="border border-slate-200 bg-white p-4">
            <h2 className="text-base font-semibold text-slate-950">Base</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-slate-500">Fornecedores</p><strong>{stats.suppliers}</strong></div>
              <div><p className="text-slate-500">Processos</p><strong>{stats.processes}</strong></div>
              <div><p className="text-slate-500">Promocoes</p><strong>{stats.promotions}</strong></div>
              <div><p className="text-slate-500">Leads</p><strong>{stats.leads}</strong></div>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
