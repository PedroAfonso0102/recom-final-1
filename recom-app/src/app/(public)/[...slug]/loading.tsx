import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-recom py-12 space-y-12">
      {/* Hero Skeleton */}
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full max-w-lg" />
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-8 border border-border rounded-xl space-y-4">
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
