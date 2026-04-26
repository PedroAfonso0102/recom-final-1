import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { MapPin, Phone, Mail } from "lucide-react";

export function HeaderInstitucional() {
  return (
    <div className="bg-white py-4 border-b border-recom-gray-100">
      <div className="container-recom flex items-center justify-between">
        {/* Logo Left */}
        <Link 
          href="/" 
          className="flex items-center gap-4 group"
        >
          <div className="h-12 w-12 relative overflow-hidden rounded-md border border-recom-border bg-white p-2 transition-all duration-300 group-hover:border-recom-blue/30">
            <img 
              src="/assets/images/logo-triangulo.png" 
              alt="RECOM Logo" 
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[20px] leading-none font-bold text-recom-graphite tracking-tight group-hover:text-recom-blue transition-colors">
              RECOM<span className="text-recom-red text-[14px] align-top">®</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground mt-1">
              {siteConfig.company.subtitle}
            </span>
          </div>
        </Link>

        {/* Info Right */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-recom-gray-50 p-2 rounded-full border border-recom-border/50">
              <MapPin className="h-4 w-4 text-recom-blue" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider leading-none mb-1">Localização</span>
              <span className="text-[13px] font-semibold text-recom-graphite">Campinas, SP</span>
            </div>
          </div>

          <div className="h-8 w-px bg-recom-border/50" />

          <div className="flex items-center gap-3">
            <div className="bg-recom-gray-50 p-2 rounded-full border border-recom-border/50">
              <Phone className="h-4 w-4 text-recom-blue" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider leading-none mb-1">Telefone</span>
              <span className="text-[13px] font-semibold text-recom-graphite">{siteConfig.contact.phone}</span>
            </div>
          </div>

          <div className="h-8 w-px bg-recom-border/50" />

          <div className="flex items-center gap-3">
            <div className="bg-recom-gray-50 p-2 rounded-full border border-recom-border/50">
              <Mail className="h-4 w-4 text-recom-blue" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider leading-none mb-1">E-mail</span>
              <span className="text-[13px] font-semibold text-recom-graphite">{siteConfig.contact.email}</span>
            </div>
          </div>
        </div>

        {/* Mobile Contact Toggle / Trigger could go here if needed, but keeping it simple for now */}
      </div>
    </div>
  );
}
