import { PageHeader, SkeletonTable } from "@/components/admin/admin-kit";

export default function LeadsLoading() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Comercial"
        title="Leads"
        description="Carregando pipeline comercial, filtros e distribuicao."
      />
      <SkeletonTable columns={6} rows={8} />
    </div>
  );
}
