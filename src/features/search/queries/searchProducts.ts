"use server";

import { prisma } from "@/lib/prisma";

export async function searchProducts(keyword: string) {
  return prisma.products.findMany({
    where: {
      name: {
        contains: keyword,
        mode: "insensitive",
      },
    },
    take: 5,
    orderBy: {
      upvotes_count: "desc",
    },
    include: {
      categories: true,
    },
  });
}

export async function countSearchProducts(keyword: string) {
  return prisma.products.count({
    where: {
      name: {
        contains: keyword,
        mode: "insensitive",
      },
    },
  });
}

export type SearchedProducts = Awaited<ReturnType<typeof searchProducts>>;
