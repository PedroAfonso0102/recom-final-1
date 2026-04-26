import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecomButton } from "./recom-button";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  note?: string;
  className?: string;
  dataHook?: string;
}

export function CTASection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  note,
  className,
  dataHook = "public.global.cta-section",
}: CTASectionProps) {
  return (
    <section
      data-hook={dataHook}
      className={cn(
        "relative overflow-hidden bg-recom-graphite py-16 md:py-20 text-white",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,61,98,0.14),transparent_42%),radial-gradient(circle_at_top_right,rgba(205,29,46,0.14),transparent_34%)]" />
      <div className="container-recom relative z-10">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white/45">
              {eyebrow}
            </p>
          )}
          <h2 className="text-white">{title}</h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/68">
            {description}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <RecomButton asChild size="lg" intent="accent" className="h-12 px-8">
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </RecomButton>
            {secondaryCta && (
              <RecomButton
                asChild
                size="lg"
                intent="outline"
                className="h-12 px-8 border-white/20 bg-transparent text-white hover:bg-white/8"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </RecomButton>
            )}
          </div>
          {note && (
            <p className="mt-6 text-[12px] uppercase tracking-[0.18em] text-white/38">
              {note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
