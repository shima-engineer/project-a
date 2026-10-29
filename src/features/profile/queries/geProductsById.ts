import { prisma } from "@/lib/prisma";

export async function getProductsById(id: string) {
  return prisma.products.findMany({
    where: { user_id: id },
    include: {
      categories: true,
    },
  });
}

export type ProfileProducts = NonNullable<
  Awaited<ReturnType<typeof getProductsById>>
>;
