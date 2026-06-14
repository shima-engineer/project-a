import { prisma } from "@/src/lib/prisma";

export async function getUserUpvotes(user_id: string) {
  return prisma.upvotes.findMany({
    where: {
      user_id,
    },
  });
}
