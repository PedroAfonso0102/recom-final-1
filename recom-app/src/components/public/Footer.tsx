import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Phone, Mail, MapPin } from "lucide-react";
import { RecomButton } from "@/design-system/components/recom-button";

export function Footer() {
  return (
    <footer className="bg-recom-graphite text-slate-300 border-t border-white/5">
      <div className="container-recom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Logo & About */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center p-2">
                  <img src="/assets/images/logo-triangulo.png" alt="RECOM" className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-white uppercase leading-none">RECOM<span className="text-recom-red text-[12px] align-top">®</span></span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase leading-none mt-1">Metal Duro</span>
                </div>
              </div>
            </Link>
            <p className="text-[14px] text-slate-400 leading-relaxed max-w-sm">
              Especialistas em ferramentas de corte e soluções técnicas para a indústria metal-mecânica. Distribuidor autorizado com suporte de engenharia desde {siteConfig.company.since}.
            </p>
            <div className="flex gap-4">
              <RecomButton asChild size="sm" intent="accent" className="h-9 px-6">
                <Link href="/sobre#contato">Falar com Consultor</Link>
              </RecomButton>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-4">Navegação</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-[14px] text-slate-400 hover:text-white transition-colors">Home</Link>
              <Link href="/sobre" className="text-[14px] text-slate-400 hover:text-white transition-colors">A Empresa</Link>
              <Link href="/fornecedores" className="text-[14px] text-slate-400 hover:text-white transition-colors">Fornecedores</Link>
              <Link href="/processos" className="text-[14px] text-slate-400 hover:text-white transition-colors">Processos</Link>
              <Link href="/promocoes" className="text-[14px] text-slate-400 hover:text-white transition-colors">Promoções</Link>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-4">Atendimento</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white/5 p-2 rounded-md border border-white/10">
                  <Phone className="w-4 h-4 text-recom-red" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Telefone</span>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-[15px] font-bold text-white hover:text-recom-red transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white/5 p-2 rounded-md border border-white/10">
                  <Mail className="w-4 h-4 text-recom-red" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">E-mail Comercial</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-[15px] font-bold text-white hover:text-recom-red transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-4">Localização</h4>
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-white/5 p-2 rounded-md border border-white/10">
                <MapPin className="w-4 h-4 text-recom-red" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Sede Campinas</span>
                <p className="text-[14px] text-slate-400 leading-relaxed font-medium">
                  {siteConfig.contact.address}<br />
                  CEP {siteConfig.contact.cep}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.company.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Industrial B2B Specialist</span>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Standard 2026</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
