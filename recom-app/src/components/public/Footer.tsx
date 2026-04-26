import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t-2 border-foreground mt-24 py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Coluna 1: Institucional */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 relative overflow-hidden rounded-md border-2 border-foreground bg-white p-1 grayscale">
                <img 
                  src="/assets/images/logo-triangulo.png" 
                  alt="RECOM Logo" 
                  className="object-contain w-full h-full"
                />
              </div>
              <strong className="text-2xl leading-none font-black tracking-tighter uppercase" data-hook="footer-title">
                {siteConfig.company.name}
              </strong>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Distribuidor B2B de ferramentas de corte e soluções de usinagem com presença regional e histórico técnico comprovado desde 1990 em Campinas e RMC.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/sobre#contato" 
                className="inline-flex items-center justify-center rounded-md bg-foreground text-background hover:bg-foreground/90 h-10 px-6 text-xs font-black uppercase tracking-widest transition-all"
                data-slot="primary-action"
              >
                Solicitar cotação
              </Link>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="flex flex-col gap-6">
            <strong className="text-xs uppercase font-black tracking-[0.2em] text-foreground border-l-4 border-primary pl-3">Navegação</strong>
            <ul className="flex flex-col gap-4 text-sm font-bold uppercase tracking-tight">
              <li><Link href="/fornecedores" className="text-muted-foreground hover:text-primary transition-colors">Nossos Fornecedores</Link></li>
              <li><Link href="/processos" className="text-muted-foreground hover:text-primary transition-colors">Processos de Usinagem</Link></li>
              <li><Link href="/sobre" className="text-muted-foreground hover:text-primary transition-colors">Sobre a RECOM®</Link></li>
              <li><Link href="/promocoes" className="text-muted-foreground hover:text-primary transition-colors">Promoções</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Endereço */}
          <div className="flex flex-col gap-6">
            <strong className="text-xs uppercase font-black tracking-[0.2em] text-foreground border-l-4 border-primary pl-3">Base Regional</strong>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              {siteConfig.contact.address}<br />
              CEP {siteConfig.contact.cep}<br />
              Campinas - SP
            </p>
          </div>

          {/* Coluna 4: Contato */}
          <div className="flex flex-col gap-6">
            <strong className="text-xs uppercase font-black tracking-[0.2em] text-foreground border-l-4 border-primary pl-3">Canais Diretos</strong>
            <div className="text-sm text-muted-foreground flex flex-col gap-3 font-bold">
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-20 pt-10 border-t-2 border-foreground/10 text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground/60 gap-8">
          <div className="flex flex-col gap-2">
            <span>&copy; {new Date().getFullYear()} {siteConfig.company.name}.</span>
            <span className="opacity-70">Razão Social: A A Montelione Comercio Ltda. CNPJ: {siteConfig.company.cnpj}.</span>
          </div>
          <nav className="flex items-center gap-10">
            <Link href="/privacidade" className="hover:text-foreground transition-colors">Privacidade</Link>
            <span className="text-primary/50">Industrial System v1.0</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
