import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailOverViewSkelton() {
  return (
    <>
      <Skeleton className="h-8 w-10 mb-4" />
      <div className="space-y-8">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </>
  );
}

export default ProductDetailOverViewSkelton;
