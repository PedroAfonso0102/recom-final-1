import { CmsPageForm } from "@/components/admin/cms/page-form";

export default function AdminNewPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">CMS</p>
        <h1 className="text-3xl font-bold tracking-tight">Nova página</h1>
        <p className="text-sm text-muted-foreground">Crie a página e depois adicione seções.</p>
      </div>

      <CmsPageForm mode="create" />
    </div>
  );
}

