import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { RecomSection } from "@/design-system/components/recom-section";
import { ContactForm } from "@/components/public/ContactForm";
import { siteConfig } from "@/lib/config";
import { getSiteSettings } from "@/cms/queries";
import { getSuppliers, getProcesses } from "@/lib/services/supabase-data";

export const metadata: Metadata = {
  title: "Sobre a RECOM Metal Duro | Contato e Suporte Técnico",
  description: "Conheça a história da RECOM, parceira técnica das maiores indústrias de Campinas. Solicite cotações, agende visitas técnicas ou peça suporte.",
};

export default async function SobrePage() {
  const [settings, suppliers, processes] = await Promise.all([
    getSiteSettings(),
    getSuppliers(),
    getProcesses()
  ]);
  
  const config = settings || siteConfig;

  return (
    <div className="flex flex-col">
      <section className="border-b border-recom-border bg-recom-gray-50 py-8 md:py-10">
        <div className="container-recom space-y-4">
          <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "A RECOM" }]} />
          <div className="max-w-4xl">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-recom-red">
              Nossa trajetória
            </span>
            <h1 className="text-recom-graphite">
              Distribuidor de ferramentas de corte <span className="text-recom-blue">desde 1990</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
              Fundada em 1990, a RECOM Metal Duro atua em Campinas no fornecimento de ferramentas de corte para usinagem, atendendo clientes industriais com foco em relacionamento comercial e catálogos oficiais.
            </p>
          </div>
        </div>
      </section>

      <RecomSection data-hook="public.about.section" eyebrow="Atendimento técnico" className="bg-white py-16 md:py-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-8">
            <h2 className="text-recom-graphite">Atendimento comercial em Campinas e região</h2>
            <p className="text-[17px] leading-relaxed text-muted-foreground">
              A RECOM constrói sua presença no setor industrial aproximando clientes de fornecedores reconhecidos e catálogos técnicos oficiais, facilitando o contato para orçamento e orientação comercial.
            </p>

            <div className="space-y-6 pt-4">
              <h3 className="border-l-4 border-recom-red pl-4 text-[11px] font-bold uppercase tracking-[0.2em] text-recom-blue">
                Diferenciais industriais
              </h3>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {[
                  { title: "Comercial direto", desc: "Equipe preparada para orientar sua cotação técnica." },
                  { title: "Estoque local", desc: "Agilidade estratégica para indústrias da região." },
                  { title: "Catálogos oficiais", desc: "Acesso total às especificações Mitsubishi e parceiros." },
                  { title: "Tradição B2B", desc: "Mais de três décadas de experiência no mercado." },
                ].map((item) => (
                  <div key={item.title} className="space-y-2">
                    <h4 className="text-[13px] font-bold uppercase tracking-tight text-recom-graphite">{item.title}</h4>
                    <p className="text-[14px] leading-normal text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-recom-border shadow-recom-card">
            <div className="absolute inset-0 z-10 bg-recom-blue/10 transition-all duration-700 group-hover:bg-transparent" />
            <Image
              src="/assets/images/escritorio.jpg"
              alt="Escritório RECOM Metal Duro"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-100"
              priority
            />
          </div>
        </div>
      </RecomSection>

      <RecomSection
        data-hook="public.contact.section"
        eyebrow="Canais de atendimento"
        title="Fale com a RECOM"
        description="Solicite cotações, agende visitas técnicas ou envie sua dúvida sobre ferramentas de corte."
        className="scroll-mt-20 border-t border-recom-border bg-recom-gray-50 py-16 md:py-20"
      >
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="rounded-xl border border-recom-border bg-white p-8 shadow-recom-card lg:col-span-8 md:p-10">
            <h3 className="mb-10 border-b border-recom-gray-100 pb-6 text-[16px] font-bold uppercase tracking-tight text-recom-graphite">
              Enviar solicitação para a equipe comercial
            </h3>

            <ContactForm suppliers={suppliers} processes={processes} />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <div className="rounded-xl bg-recom-blue p-8 text-white shadow-recom-card">
              <h4 className="mb-8 border-b border-white/10 pb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">
                Contatos diretos
              </h4>
              <div className="space-y-10">
                <div className="space-y-2">
                  <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    <Phone className="h-3.5 w-3.5 text-recom-red" />
                    Central de vendas
                  </p>
                  <a
                    href={`tel:${config.contact.phone.replace(/\D/g, "")}`}
                    className="block text-2xl font-bold tracking-tight text-white transition-colors hover:text-recom-red"
                  >
                    {config.contact.phone}
                  </a>
                </div>

                <div className="space-y-2">
                  <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    <Mail className="h-3.5 w-3.5 text-recom-red" />
                    E-mail corporativo
                  </p>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="block break-all text-base font-bold tracking-tight text-white transition-colors hover:text-recom-red"
                  >
                    {config.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-recom-border bg-white p-8 shadow-recom-card">
              <h4 className="mb-8 border-b border-recom-gray-100 pb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-recom-graphite">
                Sede administrativa
              </h4>
              <div className="space-y-6">
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  Logística centralizada em Campinas para atendimento prioritário na RMC e polos industriais.
                </p>
                <div className="flex items-start gap-4">
                  <div className="rounded-md border border-recom-border bg-recom-gray-50 p-2">
                    <MapPin className="h-5 w-5 text-recom-blue" />
                  </div>
                  <span className="text-[15px] font-bold leading-snug tracking-tight text-recom-graphite">
                    {config.contact.address}
                    <br />
                    CEP: {config.contact.cep}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RecomSection>
    </div>
  );
}
