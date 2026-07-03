"use server";

import { requireUser } from "@/features/auth/actions/requireUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUpvoteCount({ id }: { id: string }) {
  const user = await requireUser();

  const existingVote = await prisma.upvotes.findUnique({
    where: {
      user_id_product_id: {
        user_id: user.id,
        product_id: id,
      },
    },
  });

  // 既に投票済みなら解除
  if (existingVote) {
    await prisma.upvotes.delete({
      where: {
        user_id_product_id: {
          user_id: user.id,
          product_id: id,
        },
      },
    });
  } else {
    // 未投票なら投票
    await prisma.upvotes.create({
      data: {
        user_id: user.id,
        product_id: id,
      },
    });
  }

  revalidatePath("/");
}
