import { Skeleton } from "@/components/ui/skeleton";


export function ProductDetailActionBarSkelton() {
  return (
    <div className="flex gap-3">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

export default ProductDetailActionBarSkelton;
