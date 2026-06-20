"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const userId = "33e2e8cb-19c7-4690-a656-993f542ca122";

export async function updateUpvoteCount({ id }: { id: string }) {
  const existingVote = await prisma.upvotes.findUnique({
    where: {
      user_id_product_id: {
        user_id: userId,
        product_id: id,
      },
    },
  });

  // 既に投票済みなら解除
  if (existingVote) {
    await prisma.upvotes.delete({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: id,
        },
      },
    });
  } else {
    // 未投票なら投票
    await prisma.upvotes.create({
      data: {
        user_id: userId,
        product_id: id,
      },
    });
  }

  revalidatePath("/");
}
