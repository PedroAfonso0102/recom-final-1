import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { RecomButton } from "@/design-system/components/recom-button";

export function Footer() {
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
              Especialistas em ferramentas de corte e soluções técnicas para a indústria metal-mecânica. Distribuidor autorizado com atendimento humano desde {siteConfig.company.since}.
            </p>

            <RecomButton asChild size="sm" intent="accent" className="h-9 px-6">
              <Link href="/sobre#contato">Solicitar orçamento</Link>
            </RecomButton>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">Navegação</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-[14px] text-slate-400 transition-colors hover:text-white">Início</Link>
              <Link href="/sobre" className="text-[14px] text-slate-400 transition-colors hover:text-white">A RECOM</Link>
              <Link href="/fornecedores" className="text-[14px] text-slate-400 transition-colors hover:text-white">Fornecedores</Link>
              <Link href="/processos" className="text-[14px] text-slate-400 transition-colors hover:text-white">Processos</Link>
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
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}
                    className="text-[15px] font-bold text-white transition-colors hover:text-recom-red"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-md border border-white/10 bg-white/5 p-2">
                  <Mail className="w-4 h-4 text-recom-red" />
                </div>
                <div className="flex flex-col">
                  <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">E-mail comercial</span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-[15px] font-bold text-white transition-colors hover:text-recom-red"
                  >
                    {siteConfig.contact.email}
                  </a>
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
                  {siteConfig.contact.address}
                  <br />
                  CEP {siteConfig.contact.cep}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-500 md:text-left">
            © {new Date().getFullYear()} {siteConfig.company.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Hub institucional e comercial</span>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              CNPJ {siteConfig.company.cnpj}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
