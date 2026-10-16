"use server";

import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { prisma } from "@/lib/prisma";

export async function toggleUpvote(productId: string) {
  // ① 認証チェック
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, message: "ログインしてください" };
  }

  // ② 投稿主かどうかチェック
  const product = await prisma.products.findUnique({
    where: { id: productId },
    select: { user_id: true },
  });

  if (!product) {
    return { success: false, message: "商品が存在しません" };
  }

  if (product.user_id === user.id) {
    return {
      success: false,
      message: "自分の投稿には投票できません",
    };
  }

  // ③ 既存の投票・投票取り消し処理
}
