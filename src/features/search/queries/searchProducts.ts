"use server";

import { prisma } from "@/lib/prisma";

function createSearchWhere(keyword: string) {
  const keywords = keyword.trim().split(/\s+/);

  return {
    AND: keywords.map((word) => ({
      name: {
        contains: word,
        mode: "insensitive" as const,
      },
    })),
  };
}

export async function searchProducts(keyword: string) {
  if (typeof keyword !== "string") {
    return [];
  }

  const trimmedKeyword = keyword.trim();

  if (trimmedKeyword.length === 0 || trimmedKeyword.length > 100) {
    return [];
  }

  return prisma.products.findMany({
    where: createSearchWhere(trimmedKeyword),
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
    where: createSearchWhere(keyword),
  });
}

export type SearchedProducts = Awaited<ReturnType<typeof searchProducts>>;
