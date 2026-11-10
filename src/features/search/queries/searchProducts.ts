"use server";

import { prisma } from "@/lib/prisma";

export async function searchProducts(keyword: string) {
  const keywords = keyword.trim() ? keyword.trim().split(/\s+/) : [];

  return prisma.products.findMany({
    where: {
      AND: keywords.map((word) => ({
        name: {
          contains: word,
          mode: "insensitive",
        },
      })),
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
