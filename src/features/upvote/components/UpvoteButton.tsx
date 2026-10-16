"use client";

import { ChevronUp } from "lucide-react";
import { updateUpvoteCount } from "../actions/updateUpvoteCount";
import { useOptimistic, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";
import AuthModal from "@/features/modal/AuthModal";
import { toast } from "sonner";

interface UpvoteButtonProps {
  id: string;
  upvotes_count: number;
  votedProductIds: Set<string>;
  user: User | null;
  isOwner: boolean;
}

const UpvoteButton = ({
  /** 投票対象の製品ID */
  id,
  /** 現在の投票数 */
  upvotes_count,
  /** ログインしているユーザーが投票済みの製品IDの集合 */
  votedProductIds,
  /** 現在のユーザー情報 */
  user,
  /** 現在のユーザーがこの製品の所有者かどうか */
  isOwner,
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
    const newVoted = !optimisticState.voted;

    startTransition(async () => {
      // ① 楽観的更新
      addOptimistic(newVoted);

      try {
        // ② Server Actionの実行
        const result = await updateUpvoteCount({ id });

        // ③ エラー処理
        if (!result.success) {
          toast.error(result.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("投票処理に失敗しました");
      }
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
        disabled={isPending || isOwner}
        aria-label="アップボートする"
        aria-pressed={optimisticState.voted}
        onClick={user ? handleUpvoteClick : handleLoginClick}
        className={cn(
          "group/upvote shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 select-none w-14 h-14 text-sm",

          // 投票済みかどうか
          optimisticState.voted
            ? "bg-background border-upvote text-upvote shadow-upvote"
            : "bg-background border-border hover:border-upvote hover:text-upvote hover:shadow-upvote",

          // 投稿主かどうか
          isOwner
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:-translate-y-0.5 active:scale-95",
        )}
      >
        <ChevronUp className="size-4 transition-transform duration-200 group-hover/upvote:-translate-y-0.5" />
        <span className="font-bold tabular-nums leading-none mt-0.5">
          {optimisticState.count}
        </span>
      </button>
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        onAuthModalClose={onAuthModalClose}
      />
    </>
  );
};

export default UpvoteButton;
