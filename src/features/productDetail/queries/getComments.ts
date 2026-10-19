import { prisma } from "@/lib/prisma";

export async function getComments(id: string) {
  return prisma.comments.findMany({
    where: { product_id: id },
    include: {
      users: true,
    },
  });
}

export type Comments = Awaited<ReturnType<typeof getComments>>;
