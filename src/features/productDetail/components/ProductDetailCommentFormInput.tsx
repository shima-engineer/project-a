"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentFormSchema } from "../schema/schema";
import { CommentFormValues } from "../schema/schema";

const ProductDetailCommentFormInput = () => {
  const { register, handleSubmit } = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
  });

  const onSubmit = (data: CommentFormValues) => {
    console.log(data);
  };

  return (
    <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-xl border border-input bg-card transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        <textarea
          aria-label="コメント"
          className="block w-full h-20 resize-none bg-transparent px-4 pt-3 pb-2 text-sm placeholder:text-muted-foreground focus:outline-none"
          placeholder="コメントを入力してください"
          {...register("comment")}
        ></textarea>
        <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2">
          <span className="text-xs text-muted-foreground">
            丁寧で建設的なフィードバックを心がけましょう
          </span>
          {/* TODO#20:送信ロジックを追加する */}
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md text-xs h-8 px-4">
            投稿
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductDetailCommentFormInput;
