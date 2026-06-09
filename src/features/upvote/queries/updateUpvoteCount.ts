import { prisma } from "@/src/lib/prisma";

export async function updateUpvoteCount({
  id,
  upvotes_count,
}: {
  id: string;
  upvotes_count: number;
}) {
  prisma.products.update({
    where: {
      id: id,
    },
    data: {
      upvotes_count: upvotes_count + 1,
    },
  });
}
