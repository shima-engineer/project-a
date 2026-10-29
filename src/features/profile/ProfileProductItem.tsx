import Link from "next/link";
import Image from "next/image";
import UpvoteButton from "../upvote/components/UpvoteButton";
import type { ProfileProducts } from "./queries/geProductsById";
import { User } from "@supabase/supabase-js";

const ProfileProductItem = ({
  currentUser,
  isOwner,
  product,
  votedProductIds,
}: {
  currentUser: User | null;
  isOwner: boolean;
  product: ProfileProducts[number];
  votedProductIds: Set<string>;
}) => {
  console.log(isOwner);
  return (
    <li className="flex items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 group/list">
      <Link href={`/products/${product.id}`} className="flex-1 min-w-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            width={48}
            height={48}
            className="size-12 sm:size-14 rounded-xl ring-1 ring-border shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-[15px] truncate">
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
            </div>
          </div>
        </div>
      </Link>
      <UpvoteButton
        id={product.id}
        upvotes_count={product.upvotes_count}
        votedProductIds={votedProductIds}
        user={currentUser}
        isOwner={isOwner}
      />
    </li>
  );
};

export default ProfileProductItem;
