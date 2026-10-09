import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailTechnologiesSkeleton() {
  return (
    <>
      <h3 className="text-base font-semibold mt-6 mb-2">技術スタック</h3>
      <div className="flex gap-1.5">
        <Skeleton className="h-4 w-15" />
        <Skeleton className="h-4 w-15" />
        <Skeleton className="h-4 w-15" />
        <Skeleton className="h-4 w-15" />
      </div>
    </>
  );
}

export default ProductDetailTechnologiesSkeleton;
