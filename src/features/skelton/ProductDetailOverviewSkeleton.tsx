import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailOverviewSkeleton() {
  return (
    <>
      <h2 className="text-xl font-bold mb-3">概要</h2>
      <div className="space-y-8">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </>
  );
}

export default ProductDetailOverviewSkeleton;
