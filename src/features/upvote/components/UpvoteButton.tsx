import { ChevronUp } from "lucide-react";
import { updateUpvoteCount } from "../queries/updateUpvoteCount";

const UpvoteButton = ({
  id,
  upvotes_count,
}: {
  id: string;
  upvotes_count: number;
}) => {
  return (
    <button
      onClick={async () => await updateUpvoteCount({ id, upvotes_count })}
      className="group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none w-14 h-14 text-sm bg-background border-border hover:border-upvote hover:text-upvote hover:-translate-y-0.5 hover:shadow-upvote hover:cursor-pointer"
    >
      <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
      <span className="font-bold tabular-nums leading-none mt-0.5">
        {upvotes_count}
      </span>
    </button>
  );
};

export default UpvoteButton;
