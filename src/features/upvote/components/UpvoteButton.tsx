"use client";
import { ChevronUp } from "lucide-react";
import { updateUpvoteCount } from "../actions/updateUpvoteCount";
import { useOptimistic, useTransition } from "react";

const UpvoteButton = ({
  id,
  upvotes_count,
  votedProductIds,
}: {
  id: string;
  upvotes_count: number;
  votedProductIds: Set<string>;
}) => {
  const voted = votedProductIds.has(id);
  const [isPending, startTransition] = useTransition();
  const [optimisticState, addOptimistic] = useOptimistic<
    { count: number; voted: boolean },
    boolean
  >(
    {
      count: upvotes_count,
      voted,
    },
    (state, newVoted) => ({
      count: newVoted ? state.count + 1 : state.count - 1,
      voted: newVoted,
    }),
  );

  const handleClick = () => {
    const newVoted = !optimisticState.voted;
    startTransition(async () => {
      addOptimistic(newVoted);
      await updateUpvoteCount({ id });
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className={`group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none w-14 h-14 text-sm hover:-translate-y-0.5 hover:cursor-pointer ${
        optimisticState.voted
          ? "bg-background border-upvote text-upvote shadow-upvote"
          : "bg-background border-border hover:border-upvote hover:text-upvote hover:shadow-upvote"
      }`}
    >
      <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
      <span className="font-bold tabular-nums leading-none mt-0.5">
        {optimisticState.count}
      </span>
    </button>
  );
};

export default UpvoteButton;
