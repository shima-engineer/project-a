import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailCommentsSkelton() {
  return (
    <section className="space-y-5">
      <h2 className="text-xl font-bold">コメント</h2>

      {/* コメント入力フォーム */}
      <div className="flex items-start gap-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />

        <div className="flex-1 rounded-lg border">
          <div className="h-20 p-4">
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="flex items-center justify-between border-t p-3">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-8 w-14" />
          </div>
        </div>
      </div>

      {/* コメント一覧 */}
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <Skeleton className="size-10 shrink-0 rounded-full" />

            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>

              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductDetailCommentsSkelton;
