import Link from "next/link";
import { FilePlus2, Settings, Layout, Eye, Trash2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { listCmsPages } from "@/server/queries/cms-pages";

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

  const PageRow = ({ page }: { page: any }) => {
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
      <TableRow key={page.id}>
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium">{page.title}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{page.template_key}</span>
          </div>
        </TableCell>
        <TableCell className="font-mono text-xs text-muted-foreground">{page.slug}</TableCell>
        <TableCell>
          <Badge variant={typeVariant} className="text-[10px] font-bold uppercase tracking-wider">
            {typeLabel}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge variant={page.status === 'published' ? 'default' : 'secondary'} className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
            {page.status}
          </Badge>
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">{formatDate(page.updated_at)}</TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button asChild variant="ghost" size="icon" title="Configurações">
              <Link href={`/admin/pages/${page.id}`}>
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" title="Seções">
              <Link href={`/admin/pages/${page.id}/sections`}>
                <Layout className="h-4 w-4" />
              </Link>
            </Button>
            {isTemplate ? (
              <Button variant="ghost" size="icon" disabled title="Templates não podem ser visualizados diretamente">
                <Eye className="h-4 w-4 opacity-20" />
              </Button>
            ) : (
              <Button asChild variant="ghost" size="icon" title="Preview">
                <Link href={`/admin/preview/${page.slug}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {!isSystem && (
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">CMS</p>
          <h1 className="text-3xl font-bold tracking-tight">Inventário Editorial</h1>
          <p className="text-sm text-muted-foreground">Gerencie as páginas e templates do site.</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/pages/new">
            <FilePlus2 className="mr-2 h-4 w-4" />
            Nova página extra
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Sistema</h2>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Página</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Atualizada</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemPages.map(page => <PageRow key={page.id} page={page} />)}
              </TableBody>
            </Table>
          </Card>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layout className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Dinâmicas (Templates)</h2>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template</TableHead>
                  <TableHead>Padrão de Rota</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Atualizada</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
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
            <div className="flex items-center gap-2 mb-4">
              <FilePlus2 className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Extras</h2>
            </div>
            <Card>
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


