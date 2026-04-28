import type { Metadata } from "next";
import { ExternalLink, Globe, Mail, MapPin, Phone, Settings2 } from "lucide-react";

import { PageHeader, StatusBadge } from "@/components/admin/admin-kit";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard } from "@/design-system/components/recom-card";
import { getSiteSettings } from "@/cms/queries";

export const metadata: Metadata = {
  title: "Configuracoes | Painel RECOM",
  description: "Fonte unica de verdade para dados institucionais e canais oficiais da RECOM.",
};

export default async function AdminConfiguracoesPage() {
  const settings = await getSiteSettings();
  const configItems = [
    { label: "Razao social", value: settings.company.fullName },
    { label: "Marca", value: settings.company.name },
    { label: "Desde", value: settings.company.since },
    { label: "Titulo SEO padrao", value: settings.seo.defaultTitle },
  ];

  const contactItems = [
    { label: "Telefone", value: settings.contact.phone, href: `tel:${settings.contact.phone.replace(/\D/g, "")}`, icon: Phone },
    { label: "E-mail", value: settings.contact.email, href: `mailto:${settings.contact.email}`, icon: Mail },
    { label: "WhatsApp", value: settings.contact.whatsapp, href: `https://wa.me/${settings.contact.whatsapp}`, icon: ExternalLink },
    { label: "Endereco", value: `${settings.contact.address} - CEP ${settings.contact.cep}`, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.contact.address)}`, icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sistema"
        title="Configuracoes do site"
        description="Dados institucionais que alimentam header, footer, contato, SEO defaults e canais comerciais. A leitura prioriza a tabela site_settings e usa fallback seguro quando ela ainda nao existe."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecomCard className="rounded-none border-slate-200 p-6 shadow-none">
          <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Empresa</h2>
            </div>
            <StatusBadge status="published" label="Fonte publica" />
          </div>
          <dl className="grid gap-4 text-sm">
            {configItems.map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-6 border-b border-dashed border-border pb-3 last:border-0 last:pb-0">
                <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</dt>
                <dd className="text-right font-medium text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </RecomCard>

        <RecomCard className="rounded-none border-slate-200 p-6 shadow-none">
          <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
            <Phone className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Contato oficial</h2>
          </div>
          <div className="space-y-3">
            {contactItems.map((item) => (
              <a key={item.label} href={item.href} target={item.label === "WhatsApp" || item.label === "Endereco" ? "_blank" : undefined} rel={item.label === "WhatsApp" || item.label === "Endereco" ? "noopener noreferrer" : undefined} className="flex items-center justify-between gap-4 rounded-md border border-border bg-muted/20 px-4 py-3 transition-colors hover:border-primary/20 hover:bg-primary/5">
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</span>
                </div>
                <span className="text-right text-sm font-medium text-slate-900">{item.value}</span>
              </a>
            ))}
          </div>
        </RecomCard>
      </div>

      <RecomCard className="rounded-none border-slate-200 p-6 shadow-none">
        <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
          <Settings2 className="h-4 w-4 text-slate-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Proximo passo</h2>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
          Para editar estes dados pelo admin, o proximo batch deve adicionar um formulario com `siteSettingsSchema` e server action gravando em `site_settings`.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <RecomButton asChild intent="outline" className="h-11 rounded-md border-slate-200 px-6">
            <a href={`mailto:${settings.contact.email}`}>Abrir e-mail institucional</a>
          </RecomButton>
          <RecomButton asChild className="h-11 rounded-md bg-slate-900 px-6 text-white hover:bg-slate-800">
            <a href="/" target="_blank" rel="noopener noreferrer">Ver site publico</a>
          </RecomButton>
        </div>
      </RecomCard>
    </div>
  );
}
