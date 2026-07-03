"use client";
import { ChevronUp } from "lucide-react";
import { updateUpvoteCount } from "../actions/updateUpvoteCount";
import { useOptimistic, useState, useTransition } from "react";
import type { User } from "@supabase/supabase-js";
import AuthModal from "@/features/modal/AuthModal";

interface UpvoteButtonProps {
  id: string;
  upvotes_count: number;
  votedProductIds: Set<string>;
  user: User | null;
}

const UpvoteButton = ({
  id,
  upvotes_count,
  votedProductIds,
  user,
}: UpvoteButtonProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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

  const handleUpvoteClick = () => {
    if (!user) {
      return;
    }

    const newVoted = !optimisticState.voted;
    startTransition(async () => {
      addOptimistic(newVoted);
      await updateUpvoteCount({ id });
    });
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const onAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <button
        disabled={isPending}
        onClick={user ? handleUpvoteClick : handleLoginClick}
        className={`group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 select-none w-14 h-14 text-sm hover:-translate-y-0.5 cursor-pointer ${
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
      <AuthModal isOpen={isAuthModalOpen} onClose={onAuthModalClose} />
    </>
  );
};

export default UpvoteButton;
