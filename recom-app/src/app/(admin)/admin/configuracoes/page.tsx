import type { Metadata } from "next";
import { getSiteSettings } from "@/cms/queries";
import { SettingsForm } from "@/components/admin/settings-form";
import { PageHeader } from "@/components/admin/admin-kit";

export const metadata: Metadata = {
  title: "Configuracoes | Painel RECOM",
  description: "Gerencie as informações institucionais e canais oficiais da RECOM.",
};

export default async function AdminConfiguracoesPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sistema"
        title="Configurações do Site"
        description="Gerencie os dados institucionais que alimentam o cabeçalho, rodapé, SEO e canais de contato."
      />

      <SettingsForm initialData={settings} />
    </div>
  );
}
