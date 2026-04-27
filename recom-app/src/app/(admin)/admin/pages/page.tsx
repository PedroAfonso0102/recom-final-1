import Link from "next/link";
import { FilePlus2, Settings, Layout, Eye, Trash2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { listCmsPages } from "@/server/queries/cms-pages";
import { cn } from "@/lib/utils";

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminPagesPage() {
  const pages = await listCmsPages();

  // Group pages by category for better organization as suggested
  const systemPages = pages.filter(p => p.is_system && p.page_type !== 'dynamic_template');
  const dynamicTemplates = pages.filter(p => p.page_type === 'dynamic_template');
  const extraPages = pages.filter(p => !p.is_system && p.page_type !== 'dynamic_template');

  const PageRow = ({ page }: { page: { id: string; title: string; template_key: string | null; slug: string; status: string; updated_at: string | null; is_system: boolean; page_type: string } }) => {
    const isSystem = page.is_system;
    const isTemplate = page.page_type === 'dynamic_template';
    
    let typeLabel = "Extra";
    let typeVariant: "default" | "secondary" | "outline" | "destructive" = "outline";
    
    if (isSystem && !isTemplate) {
      typeLabel = "Sistema";
      typeVariant = "default";
    } else if (isTemplate) {
      typeLabel = "Template";
      typeVariant = "secondary";
    }

    return (
      <TableRow key={page.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
        <TableCell className="py-4">
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-sm text-slate-900">{page.title}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{page.template_key}</span>
          </div>
        </TableCell>
        <TableCell className="py-4 font-mono text-[11px] text-slate-500">/{page.slug}</TableCell>
        <TableCell className="py-4">
          <Badge variant={typeVariant} className="text-[10px] font-bold rounded-full px-2.5 py-0.5">
            {typeLabel}
          </Badge>
        </TableCell>
        <TableCell className="py-4">
          <Badge variant={page.status === 'published' ? 'default' : 'secondary'} className={cn(
            "text-[10px] font-bold rounded-full px-2.5 py-0.5",
            page.status === 'published' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-200"
          )}>
            {page.status}
          </Badge>
        </TableCell>
        <TableCell className="py-4 text-xs font-medium text-slate-400">{formatDate(page.updated_at)}</TableCell>
        <TableCell className="py-4 text-right">
          <div className="flex justify-end gap-1">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5" title="Configurações">
              <Link href={`/admin/pages/${page.id}`}>
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5" title="Seções">
              <Link href={`/admin/pages/${page.id}/sections`}>
                <Layout className="h-4 w-4" />
              </Link>
            </Button>
            {isTemplate ? (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-200 cursor-not-allowed" disabled title="Templates não podem ser visualizados diretamente">
                <Eye className="h-4 w-4" />
              </Button>
            ) : (
              <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5" title="Preview">
                <Link href={`/admin/preview/${page.slug}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {!isSystem && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/5">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inventário Editorial</h1>
          <p className="text-sm text-slate-500 font-medium">Gestão centralizada de páginas e templates do ecossistema RECOM.</p>
        </div>
        <Button asChild variant="outline" size="sm" className="h-10 px-6 text-xs font-bold border-slate-200 shadow-sm rounded-xl">
          <Link href="/admin/pages/new">
            <FilePlus2 className="mr-2 h-4 w-4" />
            Nova Página
          </Link>
        </Button>
      </div>

      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="h-4 w-1 bg-primary rounded-full" />
            <h2 className="text-sm font-bold text-slate-800">Canais do Sistema</h2>
          </div>
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="text-xs font-bold text-slate-500 py-4">Página</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 py-4">Slug</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 py-4">Tipo</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 py-4">Status</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 py-4">Última Atualização</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 py-4 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemPages.map(page => <PageRow key={page.id} page={page} />)}
              </TableBody>
            </Table>
          </Card>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="h-4 w-1 bg-slate-300 rounded-full" />
            <h2 className="text-sm font-bold text-slate-800">Templates Dinâmicos</h2>
          </div>
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="text-xs font-bold text-slate-500 py-4">Template</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 py-4">Slug</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 py-4">Tipo</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 py-4">Status</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 py-4">Última Atualização</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 py-4 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dynamicTemplates.map(page => <PageRow key={page.id} page={page} />)}
              </TableBody>
            </Table>
          </Card>
        </section>

        {extraPages.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="h-4 w-1 bg-emerald-400 rounded-full" />
              <h2 className="text-sm font-bold text-slate-800">Páginas Extras</h2>
            </div>
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <Table>
                <TableBody>
                  {extraPages.map(page => <PageRow key={page.id} page={page} />)}
                </TableBody>
              </Table>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}


