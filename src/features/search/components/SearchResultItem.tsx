import Link from "next/link";
import Image from "next/image";
import UpvoteButton from "@/features/upvote/components/UpvoteButton";
import { SearchedProducts } from "../queries/searchProducts";
import type { Users } from "@/features/auth/queries/getCurrentUser";

const SearchResultItem = ({
  product,
  votedProductIds,
  user,
  handleUpvoteSuccess,
  onSearchModalClose,
}: {
  product: SearchedProducts[number];
  votedProductIds: Set<string>;
  user: Users;
  handleUpvoteSuccess: (productId: string, voted: boolean) => void;
  onSearchModalClose: () => void;
}) => {
  // 現在のユーザーがこの製品の所有者かどうかを判定
  // この情報をUpvoteButtonに渡すことで、所有者は投票できないようにする
  const isOwner = user?.id === product.user_id;

  return (
    <li className="flex items-center justify-between gap-3 sm:gap-4 group/list hover:bg-muted duration-200 transition-colors rounded-2xl px-3 py-4">
      <Link
        href={`/products/${product.slug}`}
        onClick={onSearchModalClose}
        className="flex-1 min-w-0"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {product.thumbnail_url ? (
            <Image
              src={product.thumbnail_url}
              alt={product.name}
              width={48}
              height={48}
              className="size-12 sm:size-14 rounded-xl ring-1 ring-border shrink-0"
            />
          ) : (
            <div className="size-12 sm:size-14 rounded-xl ring-1 ring-border shrink-0"></div>
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-[15px] truncate group-hover/list:text-primary duration-200 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-1.5 truncate">
              {product.description}
            </p>
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Image src="/comment-icon.png" alt="" width={12} height={12} />
                <span className="">{product.comments_count}</span>
              </div>
              <p className="shrink-0">{product.categories.name}</p>
              <p className="shrink-0">{product.pricing_type}</p>
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
        handleUpvoteSuccess={handleUpvoteSuccess}
      />
    </li>
  );
};

export default SearchResultItem;
