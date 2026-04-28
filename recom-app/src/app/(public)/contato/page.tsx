import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { RecomSection } from "@/design-system/components/recom-section";
import { ContactForm } from "@/components/public/ContactForm";
import { RenderPage } from "@/cms/render-page";
import { getPageBySlug, getSiteSettings } from "@/cms/queries";
import { getProcesses, getSuppliers } from "@/lib/services/supabase-data";
import { siteConfig } from "@/lib/config";

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getPageBySlug("contato");

  return {
    title: cmsPage?.page.seo_title || "Contato / Orcamento | RECOM",
    description:
      cmsPage?.page.seo_description ||
      "Fale com a equipe comercial da RECOM para orcamentos, fornecedores, catalogos oficiais e orientacao para processos de usinagem.",
  };
}

export default async function ContatoPage() {
  const [cmsPage, settings, suppliers, processes] = await Promise.all([
    getPageBySlug("contato"),
    getSiteSettings(),
    getSuppliers(),
    getProcesses(),
  ]);
  const config = settings || siteConfig;

  return (
    <div className="flex flex-col">
      {cmsPage ? (
        <RenderPage pageData={cmsPage} context={{ settings: config, suppliers, processes }} />
      ) : (
        <section className="border-b border-recom-border bg-recom-gray-50 py-8 md:py-10">
          <div className="container-recom space-y-4">
            <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Contato / Orcamento" }]} />
            <div className="max-w-4xl">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-recom-red">
                Atendimento comercial
              </span>
              <h1 className="text-recom-graphite">
                Contato / <span className="text-recom-blue">Orcamento</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                Envie sua necessidade para a equipe RECOM. Informe a marca, o processo de usinagem ou o codigo do item para agilizar o retorno comercial.
              </p>
              <p className="mt-4 max-w-2xl text-[14px] font-semibold leading-relaxed text-recom-graphite">
                Voce tambem pode falar diretamente por telefone, WhatsApp ou e-mail.
              </p>
            </div>
          </div>
        </section>
      )}

      <RecomSection
        data-hook="public.contact.methods"
        eyebrow="Canais diretos"
        title="Fale com a equipe comercial"
        description="Escolha o canal mais pratico ou preencha o formulario para registrar sua solicitacao no atendimento."
        className="bg-white py-14 md:py-16"
      >
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <a
            href={`tel:${config.contact.phone.replace(/\D/g, "")}`}
            className="group rounded-lg border border-recom-border bg-recom-gray-50 p-6 transition-colors hover:border-recom-blue/30 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-recom-blue"
          >
            <Phone className="mb-5 h-6 w-6 text-recom-blue" aria-hidden="true" />
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Telefone</span>
            <span className="mt-2 block text-lg font-bold text-recom-graphite group-hover:text-recom-blue">{config.contact.phone}</span>
          </a>

          <a
            href={`https://wa.me/${config.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-recom-border bg-recom-gray-50 p-6 transition-colors hover:border-recom-blue/30 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-recom-blue"
          >
            <MessageCircle className="mb-5 h-6 w-6 text-recom-blue" aria-hidden="true" />
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">WhatsApp</span>
            <span className="mt-2 block text-lg font-bold text-recom-graphite group-hover:text-recom-blue">Abrir conversa</span>
          </a>

          <a
            href={`mailto:${config.contact.email}`}
            className="group rounded-lg border border-recom-border bg-recom-gray-50 p-6 transition-colors hover:border-recom-blue/30 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-recom-blue"
          >
            <Mail className="mb-5 h-6 w-6 text-recom-blue" aria-hidden="true" />
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">E-mail</span>
            <span className="mt-2 block break-all text-lg font-bold text-recom-graphite group-hover:text-recom-blue">{config.contact.email}</span>
          </a>
        </div>
      </RecomSection>

      <RecomSection
        data-hook="public.contact.form-section"
        eyebrow="Solicitacao"
        title="Enviar pedido de contato"
        description="O formulario cria um registro para a equipe comercial acompanhar o retorno."
        className="border-t border-recom-border bg-recom-gray-50 py-16 md:py-20"
      >
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="rounded-lg border border-recom-border bg-white p-6 shadow-recom-card lg:col-span-8 md:p-10">
            <ContactForm suppliers={suppliers} processes={processes} contact={config.contact} />
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-lg border border-recom-border bg-white p-6 shadow-recom-card">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-recom-graphite">
                Como agilizar o retorno
              </h2>
              <ul className="mt-6 space-y-4 text-[14px] leading-relaxed text-muted-foreground">
                <li>Informe fornecedor ou marca de interesse, se houver.</li>
                <li>Inclua processo, material, maquina ou codigo do item.</li>
                <li>Use telefone ou WhatsApp quando o pedido for urgente.</li>
              </ul>
            </div>

            <div className="rounded-lg border border-recom-border bg-white p-6 shadow-recom-card">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-recom-graphite">
                Localizacao
              </h2>
              <div className="mt-6 flex items-start gap-4 text-[14px] leading-relaxed text-muted-foreground">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-recom-blue" aria-hidden="true" />
                <p>
                  {config.contact.address}
                  <br />
                  CEP {config.contact.cep}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </RecomSection>
    </div>
  );
}
