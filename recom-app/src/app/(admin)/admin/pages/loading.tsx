import { PageHeader, SkeletonTable } from "@/components/admin/admin-kit";

export default function PagesLoading() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="CMS"
        title="Paginas"
        description="Carregando inventario editorial e status de publicacao."
      />
      <SkeletonTable columns={8} rows={6} />
    </div>
  );
}
