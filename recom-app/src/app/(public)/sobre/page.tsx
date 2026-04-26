import { siteConfig } from "@/lib/config";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { RecomSection } from "@/design-system/components/recom-section";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard, RecomCardHeader, RecomCardTitle, RecomCardContent } from "@/design-system/components/recom-card";
import { ContactForm } from "@/components/public/ContactForm";

export const metadata: Metadata = {
  title: "Sobre a RECOM Metal Duro | Contato e Suporte Técnico",
  description: "Conheça a história da RECOM, parceira técnica das maiores indústrias de Campinas. Solicite cotações, agende visitas técnicas ou peça suporte.",
};

export default function SobrePage() {
  return (
    <div className="flex flex-col">
      {/* Page Header - Industrial History */}
      <section className="bg-recom-gray-50 border-b border-recom-border py-12 md:py-16">
        <div className="container-recom">
          <div className="max-w-4xl">
            <span className="text-recom-red font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block">Nossa Trajetória</span>
            <h1 className="text-recom-graphite mb-6">
              Distribuidor de ferramentas de corte <span className="text-recom-blue">desde 1990</span>
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl">
              Fundada em 1990, a RECOM Metal Duro atua em Campinas no fornecimento de ferramentas de corte para usinagem, atendendo clientes industriais com foco em relacionamento comercial e catálogos oficiais.
            </p>
          </div>
        </div>
      </section>

      {/* About Section - Professional Context */}
      <RecomSection eyebrow="Atendimento Técnico" className="bg-white py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-8">
            <h2 className="text-recom-graphite uppercase tracking-tight">
              Atendimento comercial em Campinas e região
            </h2>
            <p className="text-[17px] text-muted-foreground leading-relaxed">
              A RECOM constrói sua presença no setor industrial aproximando clientes de fornecedores reconhecidos e catálogos técnicos oficiais, facilitando o contato para orçamento e orientação comercial.
            </p>
            
            <div className="space-y-6 pt-4">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-recom-blue border-l-4 border-recom-red pl-4">
                Diferenciais Industriais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Comercial Direto", desc: "Equipe preparada para orientar sua cotação técnica." },
                  { title: "Estoque Local", desc: "Agilidade estratégica para indústrias da região." },
                  { title: "Catálogos Oficiais", desc: "Acesso total às especificações Mitsubishi e parceiros." },
                  { title: "Tradição B2B", desc: "Mais de três décadas de experiência no mercado." }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-bold text-recom-graphite uppercase tracking-tight text-[13px]">{item.title}</h4>
                    <p className="text-[14px] text-muted-foreground leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative group rounded-lg overflow-hidden border border-recom-border shadow-recom-card">
            <div className="absolute inset-0 bg-recom-blue/10 group-hover:bg-transparent transition-all duration-700 z-10" />
            <img 
              src="/assets/images/escritorio.jpg" 
              alt="Escritório RECOM Metal Duro" 
              className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
          </div>
        </div>
      </RecomSection>

      {/* Contact Section - Industrial Lead Gen */}
      <RecomSection 
        id="contato" 
        eyebrow="Canais de Atendimento"
        title="Fale com a RECOM"
        description="Solicite cotações, agende visitas técnicas ou envie sua dúvida sobre ferramentas de corte."
        className="bg-recom-gray-50 border-t border-recom-border py-16 md:py-20 scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          {/* Form - Technical Styling */}
          <div className="lg:col-span-8 bg-white border border-recom-border rounded-lg p-8 md:p-10 shadow-recom-card">
            <h3 className="text-[16px] font-bold tracking-tight mb-10 uppercase text-recom-graphite border-b border-recom-gray-100 pb-6">
              Enviar solicitação para a equipe comercial
            </h3>
            
            <ContactForm />
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-recom-blue text-white p-8 rounded-lg shadow-recom-card">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40 mb-8 border-b border-white/10 pb-4">
                Contatos Diretos
              </h4>
              <div className="space-y-10">
                <div className="space-y-2 group">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-3">
                    <Phone className="w-3.5 h-3.5 text-recom-red" /> Central de Vendas
                  </p>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} className="text-2xl font-bold tracking-tight text-white hover:text-recom-red transition-all block">
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div className="space-y-2 group">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-3">
                    <Mail className="w-3.5 h-3.5 text-recom-red" /> E-mail Corporativo
                  </p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-base font-bold tracking-tight text-white hover:text-recom-red transition-all block break-all">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border border-recom-border p-8 rounded-lg shadow-recom-card">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-recom-graphite mb-8 border-b border-recom-gray-100 pb-4">
                Sede Administrativa
              </h4>
              <div className="space-y-6">
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  Logística centralizada em Campinas para atendimento prioritário na RMC e polos industriais.
                </p>
                <div className="flex items-start gap-4">
                  <div className="bg-recom-gray-50 p-2 rounded-md border border-recom-border">
                    <MapPin className="w-5 h-5 text-recom-blue" />
                  </div>
                  <span className="text-[15px] font-bold tracking-tight text-recom-graphite leading-snug">
                    {siteConfig.contact.address}<br />
                    CEP: {siteConfig.contact.cep}
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

