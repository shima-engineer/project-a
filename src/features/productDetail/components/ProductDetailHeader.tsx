import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { ProductDetails } from "../queries/getProductDetails";
import { getProductRankBySlug } from "../queries/getProductRank";

const ProductDetailHeader = async ({
  productDetails,
  period,
}: {
  productDetails: ProductDetails;
  period?: "daily" | "weekly" | "monthly";
}) => {
  if (!productDetails) return null;

  const rank = await getProductRankBySlug(
    productDetails.slug,
    period ?? "daily",
  );

  return (
    <section className="sm:flex justify-between">
      <div className="sm:flex gap-5">
        {productDetails.thumbnail_url ? (
          <Image
            src={productDetails.thumbnail_url}
            width={20}
            height={20}
            alt={productDetails.name}
            className="size-20 sm:size-24 rounded-2xl ring-1 ring-border mb-5"
          />
        ) : (
          <div className="size-20 sm:size-24 rounded-2xl ring-1 ring-border mb-5 bg-muted flex items-center justify-center">
            <ImageOff
              className="size-8 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        )}
        <div>
          <div className="flex gap-2 text-xs text-muted-foreground mb-1 ">
            <span>#{rank ?? "-"}</span>
            <span>{productDetails.categories.name ?? ""}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
            {productDetails.name ?? ""}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-5">
            {productDetails.description ?? ""}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {productDetails.product_tags.length > 0
              ? productDetails.product_tags.map(({ tags }) => (
                  <span
                    key={tags.id}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium"
                  >
                    {tags.name}
                  </span>
                ))
              : null}
          </div>
        </div>
      </div>
      {/* TODO#22:本人の場合は押せなくするか削除 */}
      <button
        aria-label="アップボートする"
        className="group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none w-16 h-16 text-lg hover:-translate-y-0.5 cursor-pointer bg-background border-border hover:border-upvote hover:text-upvote hover:shadow-upvote"
      >
        <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
        <span className="font-bold tabular-nums leading-none mt-0.5">
          1,248
        </span>
      </button>
    </section>
  );
};

export default ProductDetailHeader;
