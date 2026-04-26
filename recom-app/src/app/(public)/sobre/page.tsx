import { siteConfig } from "@/lib/config";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre a RECOM Metal Duro | Contato e Suporte Técnico",
  description: "Conheça a história da RECOM, parceira técnica das maiores indústrias de Campinas. Solicite cotações, agende visitas técnicas ou peça suporte.",
};

export default function SobrePage() {
  return (
    <main className="pb-24">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Nossa História e Compromisso</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Desde {siteConfig.company.since}, a {siteConfig.company.fullName} atua como parceira estratégica da indústria, fornecendo não apenas ferramentas, mas soluções técnicas que otimizam a produtividade no chão de fábrica.
          </p>
        </div>
      </section>

      {/* Sobre nós */}
      <section className="container pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Tradição Regional em Campinas</h2>
            <p className="text-lg text-muted-foreground">
              Nossa trajetória é marcada pela proximidade com o cliente. Entendemos que cada processo de usinagem possui particularidades que exigem um olhar técnico apurado. Como distribuidores autorizados de marcas líderes como Mitsubishi Materials, garantimos a procedência e o suporte oficial para cada item fornecido.
            </p>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">O que nos diferencia?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="font-semibold text-foreground mr-2">Atendimento Consultivo:</span>
                  Não apenas vendemos, ajudamos a escolher a ferramenta certa.
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-foreground mr-2">Estoque Estratégico:</span>
                  Agilidade para demandas recorrentes da indústria local.
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-foreground mr-2">Parcerias Globais:</span>
                  Acesso direto às tecnologias de ponta da Mitsubishi e 7Leaders.
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-foreground mr-2">Ética e Transparência:</span>
                  Mais de 30 anos de atuação sólida no mercado B2B.
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted rounded-xl aspect-[4/3] flex items-center justify-center border border-dashed">
            <span className="text-muted-foreground">[Imagem Institucional / Equipe]</span>
          </div>
        </div>
      </section>

      <hr className="border-border container" />

      {/* Contato Section */}
      <section id="contato" className="container py-24 scroll-mt-20">
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Fale com a RECOM®</h2>
          <p className="text-xl text-muted-foreground">
            Solicite cotações, agende visitas técnicas ou peça suporte para a sua aplicação CNC. Atendimento consultivo focado em resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 bg-card rounded-xl p-8 border shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Solicitação Técnica / Comercial</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Seu Nome *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Ex: João Silva" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Empresa *</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    required 
                    placeholder="Razão Social ou Nome Fantasia" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">E-mail Corporativo *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="contato@empresa.com.br" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">WhatsApp / Telefone *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    placeholder="(19) 00000-0000" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Assunto Principal</label>
                <select 
                  id="interest" 
                  name="interest"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="orcamento">Solicitar Orçamento</option>
                  <option value="visita">Agendar Visita Técnica</option>
                  <option value="catalogo">Dúvida sobre Catálogo</option>
                  <option value="outros">Outros Assuntos</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Detalhes da sua necessidade</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  placeholder="Informe códigos das ferramentas ou detalhes do material a ser usinado..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full"
              >
                Enviar Solicitação
              </button>
              
              <p className="text-xs text-muted-foreground text-center">
                Ao enviar, você concorda com nossa <a href="#" className="underline underline-offset-4 hover:text-primary">Política de Privacidade</a>.
              </p>
            </form>
          </div>

          {/* Info Column */}
          <div className="space-y-8">
            <div className="bg-card rounded-xl p-8 border shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">Contatos Diretos</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Telefone / WhatsApp</p>
                    <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} className="text-lg font-semibold hover:text-primary transition-colors">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">E-mail</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-base hover:text-primary transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 border shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Localização</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Atendimento focado em Campinas, RMC e polos industriais de São Paulo.
              </p>
              <div className="flex items-start mb-6">
                <MapPin className="w-5 h-5 text-muted-foreground mr-3 shrink-0 mt-0.5" />
                <span className="text-sm">{siteConfig.contact.address}<br />CEP: {siteConfig.contact.cep}</span>
              </div>
              <div className="bg-muted rounded-lg h-48 flex items-center justify-center border border-dashed">
                <span className="text-sm text-muted-foreground">[Mapa de Atendimento]</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
