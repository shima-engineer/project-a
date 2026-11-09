import Link from "next/link";
import Image from "next/image";
import UpvoteButton from "@/features/upvote/components/UpvoteButton";

const SearchResultItem = () => {
  return (
    <li className="flex items-center justify-between gap-3 sm:gap-4 group/list hover:bg-muted duration-200 transition-colors rounded-2xl px-3 py-4">
      <Link href="#" className="flex-1 min-w-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="size-12 sm:size-14 rounded-xl ring-1 ring-border shrink-0"></div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[15px] truncate group-hover/list:text-primary duration-200 transition-colors">
              Shibuya AI
            </h3>
            <p className="text-sm text-muted-foreground mb-1.5 truncate">
              日本語特化のAIライティングアシスタント
            </p>
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Image src="/comment-icon.png" alt="" width={12} height={12} />
                <span className="">0</span>
              </div>
              <p className="shrink-0">AIツール</p>
              <p className="shrink-0">Free</p>
            </div>
          </div>
        </div>
      </Link>
      <UpvoteButton
        id={""}
        upvotes_count={0}
        votedProductIds={new Set()}
        user={null}
        isOwner={false}
      />
    </li>
  );
};

export default SearchResultItem;
