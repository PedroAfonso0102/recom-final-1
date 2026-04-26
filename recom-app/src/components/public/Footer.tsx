import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      <div className="mx-auto max-w-[1180px] px-4 md:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Logo & Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                  <span className="text-white font-bold text-lg tracking-tighter italic">R</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tighter text-white uppercase leading-none">RECOM</span>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-primary uppercase leading-none mt-1">Industrial Tooling</span>
                </div>
              </div>
            </Link>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
              Distribuidor B2B de ferramentas para usinagem, metal duro e soluções técnicas em Campinas e região desde 1990.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/sobre#contato" 
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-5 text-[10px] font-bold uppercase tracking-wider transition-all"
                data-slot="primary-action"
              >
                Solicitar cotação
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest border-l-2 border-primary pl-3">Acesso Rápido</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/promocoes" className="text-[13px] hover:text-primary transition-colors py-1">Promoções</Link>
              <Link href="/fornecedores" className="text-[13px] hover:text-primary transition-colors py-1">Fornecedores</Link>
              <Link href="/processos" className="text-[13px] hover:text-primary transition-colors py-1">Processos</Link>
              <Link href="/sobre" className="text-[13px] hover:text-primary transition-colors py-1">Sobre a RECOM</Link>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest border-l-2 border-primary pl-3">Contatos</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Telefone Fixo</span>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-sm font-bold text-white hover:text-primary transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">E-mail Comercial</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-bold text-white hover:text-primary transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest border-l-2 border-primary pl-3">Localização</h4>
            <div className="flex items-start gap-3 group">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Sede Administrativa</span>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {siteConfig.contact.address}<br />
                  CEP {siteConfig.contact.cep}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.company.name}.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Tecnologia Industrial</span>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sistemas Ativos</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
