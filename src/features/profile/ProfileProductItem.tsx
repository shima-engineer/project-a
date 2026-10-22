import Link from "next/link";
import Image from "next/image";
import UpvoteButton from "../upvote/components/UpvoteButton";

const ProfileProductItem = () => {
  // TODO:63実際のデータに置き換える
  return (
    <li className="flex items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 group/list">
      <Link href="" className="flex-1 min-w-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="size-12 sm:size-14 rounded-xl ring-1 ring-border shrink-0"></div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[15px] truncate">Shibuya AI</h3>
            <p className="text-sm text-muted-foreground mb-1.5 truncate">
              日本語特化のAIライティングアシスタント日本語特化のAIライティングアシスタント
            </p>
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Image src="/comment-icon.png" alt="" width={12} height={12} />
                <span className="">3</span>
              </div>
              <p className="shrink-0">AIツール</p>
            </div>
          </div>
        </div>
      </Link>
      <UpvoteButton
        id={"id"}
        upvotes_count={2}
        votedProductIds={new Set<string>()}
        user={null}
        isOwner={false}
      />
    </li>
  );
};

export default ProfileProductItem;
