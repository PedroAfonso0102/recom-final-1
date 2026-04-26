import { siteConfig } from "@/lib/config";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { RecomSection } from "@/design-system/components/recom-section";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard, RecomCardHeader, RecomCardTitle, RecomCardContent } from "@/design-system/components/recom-card";

export const metadata: Metadata = {
  title: "Sobre a RECOM Metal Duro | Contato e Suporte Técnico",
  description: "Conheça a história da RECOM, parceira técnica das maiores indústrias de Campinas. Solicite cotações, agende visitas técnicas ou peça suporte.",
};

export default function SobrePage() {
  return (
    <div className="flex flex-col">
      {/* Header da Página */}
      <section className="bg-background border-b border-border py-10 md:py-14">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
              Nossa Trajetória
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Distribuidor de ferramentas <span className="text-primary">desde 1990</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              A {siteConfig.company.fullName} facilita o acesso a fornecedores, catálogos e atendimento comercial para ferramentas de corte e soluções de usinagem em Campinas e região.
            </p>
          </div>
        </div>
      </section>

      {/* Sobre nós */}
      <RecomSection eyebrow="Atendimento Técnico" className="bg-background py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Atendimento em Campinas e região
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Nossa atuação como distribuidor B2B foca na proximidade com o cliente industrial. Entendemos que cada processo de usinagem exige a ferramenta correta e suporte técnico comercial direto.
            </p>
            
            <div className="space-y-5 pt-4">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-primary border-l-2 border-primary pl-4">
                Diferenciais Industriais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Comercial Direto", desc: "Equipe preparada para orientar sua cotação." },
                  { title: "Estoque Local", desc: "Agilidade para demandas da região de Campinas." },
                  { title: "Catálogos Oficiais", desc: "Acesso total às especificações Mitsubishi e parceiros." },
                  { title: "Tradição B2B", desc: "Mais de 30 anos no mercado de metal duro." }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <h4 className="font-bold text-foreground uppercase tracking-tight text-xs">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border border-border rounded-md aspect-[4/3] overflow-hidden bg-muted group shadow-sm">
            <img 
              src="/assets/images/escritorio.jpg" 
              alt="Escritório RECOM Metal Duro" 
              className="w-full h-full object-cover grayscale transition-all duration-700"
            />
          </div>
        </div>
      </RecomSection>

      {/* Contato Section */}
      <RecomSection 
        id="contato" 
        eyebrow="Canais de Atendimento"
        title="Fale com a RECOM"
        description="Solicite cotações, agende visitas técnicas ou envie sua dúvida sobre ferramentas de corte."
        className="bg-muted/10 border-t border-border py-10 md:py-12 scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-8 bg-background border border-border rounded-md p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-bold tracking-tight mb-8 uppercase text-foreground border-b border-border pb-5">
              Solicitar Orçamento ou Atendimento
            </h3>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Seu Nome *</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  placeholder="Ex: João Silva" 
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Empresa *</label>
                <input 
                  type="text" 
                  id="company" 
                  required 
                  placeholder="Nome da sua indústria" 
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">E-mail Corporativo *</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="contato@empresa.com.br" 
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">WhatsApp / Telefone *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  required 
                  placeholder="(19) 00000-0000" 
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
                />
              </div>

              <div className="col-span-full space-y-2">
                <label htmlFor="interest" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Assunto Principal</label>
                <select 
                  id="interest" 
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <option value="orcamento">Solicitar Orçamento</option>
                  <option value="visita">Agendar Visita Técnica</option>
                  <option value="catalogo">Dúvida sobre Catálogo</option>
                  <option value="outros">Outros Assuntos</option>
                </select>
              </div>

              <div className="col-span-full space-y-2">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Detalhes da sua necessidade</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  placeholder="Informe códigos das ferramentas ou detalhes do material a ser usinado..."
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                ></textarea>
              </div>

              <div className="col-span-full pt-4">
                <RecomButton type="submit" className="w-full h-11 text-[11px] uppercase tracking-wider font-bold">
                  Enviar Solicitação Técnica
                </RecomButton>
                <p className="text-[9px] text-muted-foreground text-center mt-5 uppercase tracking-wider font-medium">
                  Atendimento B2B prioritário para indústrias e empresas.
                </p>
              </div>
            </form>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <RecomCard className="shadow-recom">
              <RecomCardHeader className="pb-4">
                <RecomCardTitle className="text-xs font-bold uppercase tracking-widest text-primary border-b border-border pb-2">
                  Contatos Diretos
                </RecomCardTitle>
              </RecomCardHeader>
              <RecomCardContent className="space-y-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Phone className="w-3 h-3" /> WhatsApp Comercial
                  </p>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} className="text-xl font-bold hover:text-primary transition-all tracking-tight text-foreground">
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Canal Oficial
                  </p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-base font-bold hover:text-primary transition-all tracking-tight text-foreground break-all">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </RecomCardContent>
            </RecomCard>

            <RecomCard className="bg-muted/30 border-dashed">
              <RecomCardHeader className="pb-4">
                <RecomCardTitle className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-border pb-2">
                  Localização
                </RecomCardTitle>
              </RecomCardHeader>
              <RecomCardContent className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Atendimento presencial focado em Campinas, RMC e polos industriais de São Paulo.
                </p>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-bold uppercase tracking-tight text-foreground leading-tight">
                    {siteConfig.contact.address}<br />
                    CEP: {siteConfig.contact.cep}
                  </span>
                </div>
              </RecomCardContent>
            </RecomCard>
          </div>
        </div>
      </RecomSection>
    </div>
  );
}

