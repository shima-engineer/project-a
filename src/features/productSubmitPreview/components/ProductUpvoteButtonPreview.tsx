import { ChevronUp } from "lucide-react";

interface ProductUpvoteButtonPreviewProps {
  size: "sm" | "md";
}

const ProductUpvoteButtonPreview = ({
  size,
}: ProductUpvoteButtonPreviewProps) => {
  return (
    <button
      type="button"
      className={`group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none ${size === "sm" ? "w-11 h-11  text-xs" : "w-14 h-14 text-sm"} hover:-translate-y-0.5 cursor-pointer   bg-background border-border hover:border-upvote hover:text-upvote hover:shadow-upvote`}
    >
      <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
      <span className="font-bold tabular-nums leading-none mt-0.5">1</span>
    </button>
  );
};
export default ProductUpvoteButtonPreview;
