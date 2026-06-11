import Link from "next/link";
import Image from "next/image";
import { Prisma } from "@/src/generated/prisma/client";
import UpvoteButton from "../../upvote/components/UpvoteButton";
import { getUserUpvotes } from "../../upvote/queries/getUserUpvotes";

type ProductWithCategory = Prisma.productsGetPayload<{
  include: {
    categories: true;
  };
}>;

type RankItemProps = {
  product: ProductWithCategory;
  index: number;
};

const RankItem = async({ product, index }: RankItemProps) => {
    const userId = "33e2e8cb-19c7-4690-a656-993f542ca122";

  const upvotes = await getUserUpvotes(userId);
  const votedProductIds = new Set(
  upvotes.map((u) => u.product_id)
);
  return (
    <li className="flex items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 group/list">
      <Link
        href={`/products/${product.slug}`}
        key={product.id}
        className="hover:cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <p className="hidden sm:flex  shrink-0 items-center justify-center text-sm font-semibold text-muted-foreground tabular-nums group-hover/list:text-primary transition-colors">
            {index + 1}
          </p>
          <Image
            src={product.thumbnail_url || "/userIcon.png"}
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
                <Image src="/commentIcon.png" alt="" width={12} height={12} />
                <span className="">{product.comments_count}</span>
              </div>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                {product.categories.name}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <UpvoteButton id={product.id} upvotes_count={product.upvotes_count} votedProductIds={votedProductIds}/>
    </li>
  );
};

export default RankItem;
