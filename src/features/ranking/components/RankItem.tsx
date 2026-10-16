import Link from "next/link";
import Image from "next/image";
import UpvoteButton from "../../upvote/components/UpvoteButton";
import type { ProductsByPeriod } from "@/features/product/queries/getProduct";
import type { User } from "@supabase/supabase-js";
import type { Period } from "@/types/period";

interface RankItemProps {
  product: ProductsByPeriod[number];
  votedProductIds: Set<string>;
  user: User | null;
  periodId: Period;
}

const RankItem = async ({
  product,
  votedProductIds,
  user,
  periodId,
}: RankItemProps) => {
  // 現在のユーザーがこの製品の所有者かどうかを判定
  // この情報をUpvoteButtonに渡すことで、所有者は投票できないようにする
  const isOwner = user?.id === product.user_id;

  return (
    <li className="flex items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 group/list">
      <Link
        href={`/products/${product.slug}?periodId=${periodId}`}
        key={product.id}
        className="cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <p className="hidden sm:flex  shrink-0 items-center justify-center text-sm font-semibold text-muted-foreground tabular-nums group-hover/list:text-primary transition-colors">
            {product.rank}
          </p>
          <Image
            src={product.thumbnail_url || "/user-icon.png"} // TODO: デフォルトアイコンが決まったら差し替える
            alt={product.name}
            width={56}
            height={56}
            className="size-12 sm:size-14 rounded-xl ring-1 ring-border"
          />
          <div>
            <h3 className="font-semibold text-[15px] group-hover/list:text-primary duration-200 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-1.5">
              {product.tagline}
            </p>
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Image src="/comment-icon.png" alt="" width={12} height={12} />
                <span className="">{product.comments_count}</span>
              </div>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                {product.categories.name}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <UpvoteButton
        id={product.id}
        upvotes_count={product.upvotes_count}
        votedProductIds={votedProductIds}
        user={user}
        isOwner={isOwner}
      />
    </li>
  );
};

export default RankItem;
