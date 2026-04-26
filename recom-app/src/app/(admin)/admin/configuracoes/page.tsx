import type { Metadata } from "next";
import { ExternalLink, Globe, Mail, MapPin, Phone, Settings2 } from "lucide-react";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard } from "@/design-system/components/recom-card";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Configurações | Painel RECOM",
  description: "Fonte única de verdade para dados institucionais e canais oficiais da RECOM.",
};

const configItems = [
  {
    label: "Razão social",
    value: siteConfig.company.fullName,
  },
  {
    label: "Marca",
    value: siteConfig.company.name,
  },
  {
    label: "Desde",
    value: siteConfig.company.since,
  },
  {
    label: "CNPJ",
    value: siteConfig.company.cnpj,
  },
];

const contactItems = [
  {
    label: "Telefone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\D/g, "")}`,
    icon: Phone,
  },
  {
    label: "E-mail",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: siteConfig.contact.whatsapp,
    href: `https://wa.me/${siteConfig.contact.whatsapp}`,
    icon: ExternalLink,
  },
  {
    label: "Endereço",
    value: `${siteConfig.contact.address} - CEP ${siteConfig.contact.cep}`,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address)}`,
    icon: MapPin,
  },
];

export default function AdminConfiguracoesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 border-b border-border pb-8">
        <div className="flex items-center gap-3">
          <Settings2 className="h-5 w-5 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Fonte única</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Configurações</h1>
        <p className="max-w-3xl text-slate-500">
          Os dados institucionais e os canais oficiais da RECOM são centralizados aqui para manter a consistência entre o admin e o site público.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecomCard className="p-6">
          <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
            <Globe className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">Empresa</h2>
          </div>
          <dl className="grid gap-4 text-sm">
            {configItems.map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-6 border-b border-dashed border-border pb-3 last:border-0 last:pb-0">
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</dt>
                <dd className="text-right font-medium text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </RecomCard>

        <RecomCard className="p-6">
          <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
            <Phone className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">Contato oficial</h2>
          </div>
          <div className="space-y-3">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "WhatsApp" || item.label === "Endereço" ? "_blank" : undefined}
                rel={item.label === "WhatsApp" || item.label === "Endereço" ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/20 px-4 py-3 transition-colors hover:border-primary/20 hover:bg-primary/5"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</span>
                </div>
                <span className="text-right text-sm font-medium text-slate-900">{item.value}</span>
              </a>
            ))}
          </div>
        </RecomCard>
      </div>

      <RecomCard className="p-6">
        <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
          <Settings2 className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">Direção da fonte única</h2>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
          Esta tela reflete os valores definidos em <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">src/lib/config.ts</code>. Quando a configuração central mudar, o admin e o site público permanecem alinhados sem depender de dados de fallback.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <RecomButton asChild intent="outline" className="h-11 px-5">
            <a href={`mailto:${siteConfig.contact.email}`}>
              Abrir e-mail institucional
            </a>
          </RecomButton>
          <RecomButton asChild intent="primary" className="h-11 px-5">
            <a href="/" target="_blank" rel="noopener noreferrer">
              Ver site público
            </a>
          </RecomButton>
        </div>
      </RecomCard>
    </div>
  );
}
