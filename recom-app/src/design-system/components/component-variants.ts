export const buttonVariants = {
  base: "inline-flex min-h-11 items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60",
  intent: {
    primary: "bg-recom-blue text-white hover:bg-recom-blue/90",
    secondary: "border border-recom-border bg-white text-recom-graphite hover:bg-recom-gray-50",
    ghost: "bg-transparent text-recom-graphite hover:bg-recom-gray-50",
    link: "min-h-0 rounded-none p-0 text-recom-blue underline-offset-4 hover:underline",
    destructive: "bg-red-700 text-white hover:bg-red-800",
  },
  size: {
    sm: "h-10 px-4 text-xs",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  },
} as const;

export const cardVariants = {
  base: "border border-recom-border bg-white",
  intent: {
    supplier: "p-5",
    process: "p-6",
    promotion: "p-5",
    editorial: "p-6 md:p-8",
    stat: "p-4",
  },
} as const;

export const badgeVariants = {
  draft: "border-amber-200 bg-amber-50 text-amber-800",
  published: "border-emerald-200 bg-emerald-50 text-emerald-800",
  scheduled: "border-blue-200 bg-blue-50 text-blue-800",
  archived: "border-slate-200 bg-slate-100 text-slate-700",
  active: "border-emerald-200 bg-emerald-50 text-emerald-800",
  expired: "border-rose-200 bg-rose-50 text-rose-800",
  unavailable: "border-slate-200 bg-slate-50 text-slate-600",
} as const;

export const sectionVariants = {
  default: "bg-white py-16 md:py-20",
  muted: "bg-recom-gray-50 py-16 md:py-20",
  compact: "py-10 md:py-12",
  hero: "py-14 md:py-20",
  cta: "bg-recom-graphite py-14 text-white md:py-16",
} as const;
