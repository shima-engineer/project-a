import Image from "next/image";
import { Comments } from "../queries/getComments";

const ProductDetailCommentItem = ({
  comment,
  avatarUrl,
}: {
  comment: Comments[number];
  avatarUrl?: string;
}) => {
  return (
    <div className="flex gap-4">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="User avatar"
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-full ring-1 ring-border bg-card"
        />
      ) : (
        <div className="size-9 shrink-0 rounded-full ring-1 ring-border bg-card"></div>
      )}
      <div className="flex-1">
        <div className="flex gap-2 text-sm">
          <p className="font-semibold">{comment.users.name ?? "名無し"}</p>
          <time className="text-muted-foreground">
            {comment.created_at.toLocaleString("ja-JP") ?? ""}
          </time>
        </div>
        <p className="mt-1 text-[15px] leading-relaxed">{comment?.content}</p>
      </div>
    </div>
  );
};

export default ProductDetailCommentItem;
