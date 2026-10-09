import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailProductInfoSkelton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border p-4">
      <Skeleton className="size-14 shrink-0 rounded-full" />

      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-20" />
      </div>

      <Skeleton className="h-9 w-20 rounded-md" />
    </div>
  );
}

export default ProductDetailProductInfoSkelton;
