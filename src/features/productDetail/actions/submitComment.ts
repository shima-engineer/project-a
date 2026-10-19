"use server";

import { prisma } from "@/lib/prisma";
import type { CommentFormValues } from "../schema/schema";
import { commentFormSchema } from "../schema/schema";
import { z } from "zod";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";

export const submitComment = async (
  data: CommentFormValues,
  productId: string,
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "ログインが必要です",
      };
    }

    // コメントのバリデーション
    const parsed = commentFormSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "入力内容が不正です。",
      };
    }

    // 商品IDのバリデーション
    const productIdResult = z.string().uuid().safeParse(productId);

    if (!productIdResult.success) {
      return {
        success: false,
        message: "商品IDが不正です。",
      };
    }

    const comment = await prisma.comments.create({
      data: {
        id: crypto.randomUUID(),
        user_id: currentUser.id,
        product_id: productId,
        content: parsed.data.comment,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return {
      success: true,
      message: "Comment submitted successfully",
      comment,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to submit comment",
    };
  }
};

export default submitComment;
