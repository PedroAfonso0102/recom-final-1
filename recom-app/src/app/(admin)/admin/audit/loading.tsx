import { PageHeader, SkeletonTable } from "@/components/admin/admin-kit";

export default function AuditLoading() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Trilha de auditoria"
        title="Historico de alteracoes"
        description="Carregando os eventos administrativos mais recentes."
      />
      <SkeletonTable columns={4} rows={6} />
    </div>
  );
}
