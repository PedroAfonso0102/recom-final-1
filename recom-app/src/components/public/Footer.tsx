import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { RecomButton } from "@/design-system/components/recom-button";
import { getSiteSettings } from "@/cms/queries";
import { TrackClick } from "@/components/public/analytics/TrackClick";

export async function Footer() {
  const settings = await getSiteSettings();
  const config = settings || siteConfig;

  return (
    <footer data-hook="public.global.footer" className="border-t border-white/5 bg-recom-graphite text-slate-300">
      <div className="container-recom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white p-2">
                  <Image
                    src="/assets/images/logo-triangulo.png"
                    alt="RECOM"
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold leading-none tracking-tight text-white uppercase">
                    RECOM<span className="text-[12px] align-top text-recom-red">®</span>
                  </span>
                  <span className="mt-1 text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-white/40">
                    Metal Duro
                  </span>
                </div>
              </div>
            </Link>

            <p className="max-w-sm text-[14px] leading-relaxed text-slate-400">
              Distribuidor de ferramentas de corte e atendimento industrial. Atuação comercial humana desde {config.company.since}.
            </p>

            <RecomButton asChild size="sm" intent="accent" className="h-9 px-6">
              <Link href="/contato">Solicitar orçamento</Link>
            </RecomButton>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">Navegação</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-[14px] text-slate-400 transition-colors hover:text-white">Início</Link>
              <Link href="/a-recom" className="text-[14px] text-slate-400 transition-colors hover:text-white">A RECOM</Link>
              <Link href="/fornecedores-catalogos" className="text-[14px] text-slate-400 transition-colors hover:text-white">Fornecedores</Link>
              <Link href="/solucoes" className="text-[14px] text-slate-400 transition-colors hover:text-white">Processos</Link>
              <Link href="/promocoes" className="text-[14px] text-slate-400 transition-colors hover:text-white">Promoções</Link>
            </nav>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">Atendimento</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-md border border-white/10 bg-white/5 p-2">
                  <Phone className="w-4 h-4 text-recom-red" />
                </div>
                <div className="flex flex-col">
                  <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Telefone</span>
                  <TrackClick eventName="contact_phone_click" params={{ phone: config.contact.phone }}>
                    <a
                      href={`tel:${config.contact.phone.replace(/\D/g, "")}`}
                      className="text-[15px] font-bold text-white transition-colors hover:text-recom-red"
                    >
                      {config.contact.phone}
                    </a>
                  </TrackClick>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-md border border-white/10 bg-white/5 p-2">
                  <Mail className="w-4 h-4 text-recom-red" />
                </div>
                <div className="flex flex-col">
                  <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">E-mail comercial</span>
                  <TrackClick eventName="contact_email_click" params={{ email: config.contact.email }}>
                    <a
                      href={`mailto:${config.contact.email}`}
                      className="text-[15px] font-bold text-white transition-colors hover:text-recom-red"
                    >
                      {config.contact.email}
                    </a>
                  </TrackClick>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">Localização</h4>
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-md border border-white/10 bg-white/5 p-2">
                <MapPin className="w-4 h-4 text-recom-red" />
              </div>
              <div className="flex flex-col">
                <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Sede Campinas</span>
                <p className="text-[14px] font-medium leading-relaxed text-slate-400">
                  {config.contact.address}
                  <br />
                  CEP {config.contact.cep}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-500 md:text-left">
            © {new Date().getFullYear()} {config.company.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Hub institucional e comercial</span>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              CNPJ {config.company.cnpj}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
