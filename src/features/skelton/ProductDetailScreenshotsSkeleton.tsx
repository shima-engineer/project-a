import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailScreenshotsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <Skeleton className="aspect-video rounded-xl ring-1 ring-border overflow-hidden" />
      <Skeleton className="aspect-video rounded-xl ring-1 ring-border overflow-hidden" />
      <Skeleton className="aspect-video rounded-xl ring-1 ring-border overflow-hidden" />
      <Skeleton className="aspect-video rounded-xl ring-1 ring-border overflow-hidden" />
      <Skeleton className="aspect-video rounded-xl ring-1 ring-border overflow-hidden" />
      <Skeleton className="aspect-video rounded-xl ring-1 ring-border overflow-hidden" />
    </div>
  );
}

export default ProductDetailScreenshotsSkeleton;
