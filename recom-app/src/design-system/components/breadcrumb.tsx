import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  dataHook?: string;
}

export function Breadcrumb({ items, className, dataHook = "public.global.breadcrumb" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" data-hook={dataHook} className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-recom-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-recom-graphite" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 text-muted-foreground/40" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
