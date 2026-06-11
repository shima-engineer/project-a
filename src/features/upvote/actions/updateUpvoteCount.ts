"use server";

import { prisma } from "@/src/lib/prisma";

const userId = "33e2e8cb-19c7-4690-a656-993f542ca122";

export async function updateUpvoteCount({ id }: { id: string }) {
  // 1. まず upvote を作成（重複防止は後で改善）
  await prisma.upvotes.create({
    data: {
      user_id: userId,
      product_id: id,
    },
  });

  // 2. カウント増加
  const result = await prisma.products.update({
    where: { id },
    data: {
      upvotes_count: {
        increment: 1,
      },
    },
  });

  return result;
}