import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { Prisma } from "@/src/generated/prisma/client";

type ProductWithCategory = Prisma.productsGetPayload<{
  include: {
    categories: true;
  };
}>;

type RankItemProps = {
  product: ProductWithCategory;
  index: number;
};

const RankItem = ({ product, index }: RankItemProps) => {
  return (
    <li>
      <Link
        href={`/products/${product.slug}`}
        key={product.id}
        className="flex items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 group/list hover:cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <p className="hidden sm:flex  shrink-0 items-center justify-center text-sm font-semibold text-muted-foreground tabular-nums group-hover/list:text-primary transition-colors">
            {index + 1}
          </p>
          <Image
            src={product.thumbnail_url || "/userIcon.png"}
            alt=""
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
        <button className="group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none w-14 h-14 text-sm bg-background border-border hover:border-upvote hover:text-upvote hover:-translate-y-0.5 hover:shadow-upvote hover:cursor-pointer">
          <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
          <span className="font-bold tabular-nums leading-none mt-0.5">
            {product.upvotes_count}
          </span>
        </button>
      </Link>
    </li>
  );
};

export default RankItem;
