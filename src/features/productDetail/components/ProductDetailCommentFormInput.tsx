"use client";

import { useState } from "react";
import type { Users } from "@/features/auth/queries/getCurrentUser";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentFormSchema } from "../schema/schema";
import { CommentFormValues } from "../schema/schema";
import ErrorMessage from "../../../app/components/elements/ErrorMessage";
import { toast } from "sonner";
import submitComment from "../actions/submitComment";
import AuthModal from "@/features/modal/AuthModal";

const ProductDetailCommentFormInput = ({
  productId,
  currentUser,
}: {
  productId: string;
  currentUser: Users;
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
  });

  const onSubmit = async (data: CommentFormValues) => {
    try {
      const result = await submitComment(data, productId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      // フォームをリセット
      reset();

      toast.success("コメントを投稿しました");
    } catch {
      toast.error("通信に失敗しました。もう一度お試しください。");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 日本語変換中は送信しない
    if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) {
      return;
    }

    // Enterで送信（Shift + Enterは改行）
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const onAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-xl border border-input bg-card transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 mb-2">
          <textarea
            aria-label="コメント"
            className="block w-full h-20 resize-none bg-transparent px-4 pt-3 pb-2 text-sm placeholder:text-muted-foreground focus:outline-none"
            placeholder="コメントを入力してください"
            onKeyDown={handleKeyDown}
            {...register("comment")}
          ></textarea>
          <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2">
            <span className="text-xs text-muted-foreground">
              丁寧で建設的なフィードバックを心がけましょう
            </span>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={currentUser ? undefined : handleLoginClick}
            >
              {isSubmitting && <Spinner className="size-4" />}
              {isSubmitting
                ? "投稿中..."
                : currentUser
                  ? "投稿する"
                  : "ログインして投稿する"}
            </Button>
          </div>
        </div>
        <ErrorMessage errorMessage={errors.comment?.message || ""} />
      </form>
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        onAuthModalClose={onAuthModalClose}
      />
    </>
  );
};

export default ProductDetailCommentFormInput;
