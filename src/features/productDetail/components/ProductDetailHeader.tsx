import UpvoteButton from "@/features/upvote/components/UpvoteButton";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { ProductDetails } from "../queries/getProductDetails";
import type { Period } from "@/types/period";
import { getProductRank } from "../queries/getProductRank";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getUserUpvotes } from "@/features/upvote/queries/getUserUpvotes";

const ProductDetailHeader = async ({
  productDetails,
  periodId,
}: {
  productDetails: ProductDetails;
  periodId?: Period;
}) => {
  if (!productDetails) return null;

  const rank = await getProductRank(productDetails.slug, periodId ?? "daily");
  const user = await getCurrentUser();
  // 現在のユーザーが投票した製品の情報を取得
  const upvotes = user ? await getUserUpvotes(user.id) : [];
  // 投票済みの製品IDのセットを作成
  const votedProductIds = new Set(upvotes.map((u) => u.product_id));
  // 現在のユーザーがこの製品の所有者かどうかを判定
  // この情報をUpvoteButtonに渡すことで、所有者は投票できないようにする
  const isOwner = user?.id === productDetails.user_id;

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
            {productDetails.tagline ?? ""}
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
      <UpvoteButton
        id={productDetails.id}
        upvotes_count={productDetails.upvotes_count}
        votedProductIds={votedProductIds}
        user={user}
        isOwner={isOwner}
      />
    </section>
  );
};

export default ProductDetailHeader;
