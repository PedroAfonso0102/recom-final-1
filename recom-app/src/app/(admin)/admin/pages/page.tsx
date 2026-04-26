import Link from "next/link";
import { FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HOME_CMS_SLUG } from "@/cms/utils";
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">CMS</p>
          <h1 className="text-3xl font-bold tracking-tight">Páginas</h1>
          <p className="text-sm text-muted-foreground">Crie e publique páginas reais do site.</p>
        </div>
        <Button asChild>
          <Link href="/admin/pages/new">
            <FilePlus2 className="mr-2 h-4 w-4" />
            Nova página
          </Link>
        </Button>
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Página</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Atualizada</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                    Nenhuma página criada ainda.
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => {
                  const publicPath = page.slug === HOME_CMS_SLUG ? "/" : `/${page.slug}`;

                  return (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{publicPath}</TableCell>
                      <TableCell>
                        <span className="rounded-full border border-border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                          {page.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(page.updated_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/admin/pages/${page.id}`}>Editar</Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/admin/preview/${page.slug}`}>Preview</Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

