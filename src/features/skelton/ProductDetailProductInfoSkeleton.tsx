import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailProductInfoSkeleton() {
  return (
    <div className="lg:sticky lg:top-24 lg:self-start p-4 border rounded-lg lg:w-80">
      <h3 className="text-sm font-semibold mb-3">プロダクト情報</h3>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export default ProductDetailProductInfoSkeleton;
