"use server";

import { requireUser } from "@/features/auth/actions/requireUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUpvoteCount({ id }: { id: string }) {
  const user = await requireUser();

  // ① 商品の存在確認・投稿主チェック
  const product = await prisma.products.findUnique({
    where: { id },
    select: { user_id: true, slug: true },
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

  try {
    // ② 投票履歴と投票数をまとめて更新
    const voted = await prisma.$transaction(async (tx) => {
      const voteWhere = {
        user_id_product_id: {
          user_id: user.id,
          product_id: id,
        },
      };

      const existingVote = await tx.upvotes.findUnique({
        where: voteWhere,
      });

      if (existingVote) {
        // 投票解除
        await tx.upvotes.delete({
          where: voteWhere,
        });

        await tx.products.update({
          where: { id },
          data: {
            upvotes_count: { decrement: 1 },
          },
        });

        return false;
      }

      // 新規投票
      await tx.upvotes.create({
        data: {
          user_id: user.id,
          product_id: id,
        },
      });

      await tx.products.update({
        where: { id },
        data: {
          upvotes_count: { increment: 1 },
        },
      });

      return true;
    });

    // ③ キャッシュ更新
    revalidatePath("/");
    revalidatePath(`/products/${product.slug}`);

    return { success: true, voted };
  } catch (error) {
    console.error("投票処理に失敗:", error);

    return {
      success: false,
      message: "投票処理に失敗しました",
    };
  }
}
