import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailHeaderSkelton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-20 sm:size-24 rounded-2xl ring-1 ring-border mb-5" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-10 w-60" />
        <Skeleton className="h-4 w-80" />
        <div className="flex gap-1.5">
          <Skeleton className="h-4 w-15" />
          <Skeleton className="h-4 w-15" />
          <Skeleton className="h-4 w-15" />
          <Skeleton className="h-4 w-15" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailHeaderSkelton;
