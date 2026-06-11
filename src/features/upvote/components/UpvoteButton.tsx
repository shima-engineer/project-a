"use client";
import { ChevronUp } from "lucide-react";
import { updateUpvoteCount } from "../actions/updateUpvoteCount";
import { useState } from "react";

const UpvoteButton = ({
  id,
  upvotes_count,
  votedProductIds,
}: {
  id: string;
  upvotes_count: number;
  votedProductIds: Set<string>;
}) => {
  const [count, setCount] = useState(upvotes_count);
  const [localVoted, setLocalVoted] = useState(votedProductIds.has(id));

  console.log(votedProductIds);
  const handleClick = async () => {
    setCount((prev) => prev + 1);
    setLocalVoted(true);

    try {
      await updateUpvoteCount({ id });
    } catch {
      setLocalVoted(false);
      setCount((prev) => prev - 1);
    }
  };

  return localVoted ? (
    <button
      onClick={handleClick}
      className="group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none w-14 h-14 text-sm bg-background  border-upvote text-upvote hover:-translate-y-0.5 shadow-upvote hover:cursor-pointer"
    >
      <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
      <span className="font-bold tabular-nums leading-none mt-0.5">
        {count}
      </span>
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none w-14 h-14 text-sm bg-background border-border hover:border-upvote hover:text-upvote hover:-translate-y-0.5 hover:shadow-upvote hover:cursor-pointer"
    >
      <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
      <span className="font-bold tabular-nums leading-none mt-0.5">
        {count}
      </span>
    </button>
  );
};

export default UpvoteButton;
