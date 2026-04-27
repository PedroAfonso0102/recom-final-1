import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { getSiteSettings } from "@/cms/actions";

export async function HeaderInstitucional() {
  const settings = await getSiteSettings();
  const config = settings || siteConfig;

  return (
    <div className="border-b border-recom-gray-100 bg-white py-4">
      <div className="container-recom flex items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-md border border-recom-border bg-white p-2 transition-all duration-300 group-hover:border-recom-blue/30">
            <Image
              src="/assets/images/logo-triangulo.png"
              alt="RECOM"
              fill
              sizes="48px"
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[20px] leading-none font-bold tracking-tight text-recom-graphite transition-colors group-hover:text-recom-blue">
              {config.company.name}
            </span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {config.company.subtitle}
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.contact.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 transition-colors hover:text-recom-blue"
            aria-label={`Abrir localização da sede em ${config.contact.address}`}
          >
            <div className="rounded-full border border-recom-border/60 bg-recom-gray-50 p-2">
              <MapPin className="h-4 w-4 text-recom-blue" />
            </div>
            <div className="flex flex-col">
              <span className="mb-1 text-[10px] font-bold uppercase tracking-wider leading-none text-muted-foreground">
                Localização
              </span>
              <span className="text-[13px] font-semibold text-recom-graphite">Campinas, SP</span>
            </div>
          </a>

          <div className="h-8 w-px bg-recom-border/50" />

          <a
            href={`tel:${config.contact.phone.replace(/\D/g, "")}`}
            className="flex items-center gap-3 transition-colors hover:text-recom-blue"
            aria-label={`Ligar para ${config.contact.phone}`}
          >
            <div className="rounded-full border border-recom-border/60 bg-recom-gray-50 p-2">
              <Phone className="h-4 w-4 text-recom-blue" />
            </div>
            <div className="flex flex-col">
              <span className="mb-1 text-[10px] font-bold uppercase tracking-wider leading-none text-muted-foreground">
                Telefone
              </span>
              <span className="text-[13px] font-semibold text-recom-graphite">
                {config.contact.phone}
              </span>
            </div>
          </a>

          <div className="h-8 w-px bg-recom-border/50" />

          <a
            href={`mailto:${config.contact.email}`}
            className="flex items-center gap-3 transition-colors hover:text-recom-blue"
            aria-label={`Enviar e-mail para ${config.contact.email}`}
          >
            <div className="rounded-full border border-recom-border/60 bg-recom-gray-50 p-2">
              <Mail className="h-4 w-4 text-recom-blue" />
            </div>
            <div className="flex flex-col">
              <span className="mb-1 text-[10px] font-bold uppercase tracking-wider leading-none text-muted-foreground">
                E-mail
              </span>
              <span className="text-[13px] font-semibold text-recom-graphite">
                {config.contact.email}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
