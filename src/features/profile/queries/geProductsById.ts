import { prisma } from "@/lib/prisma";

export async function getProductsById(id: string) {
  return prisma.products.findMany({
    where: { user_id: id },
    include: {
      categories: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export type ProfileProducts = NonNullable<
  Awaited<ReturnType<typeof getProductsById>>
>;
