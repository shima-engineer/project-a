"use server";

import { prisma } from "@/lib/prisma";

function validateKeyword(keyword: string): string | null {
  if (typeof keyword !== "string") {
    return null;
  }

  const trimmedKeyword = keyword.trim();

  if (trimmedKeyword.length === 0 || trimmedKeyword.length > 100) {
    return null;
  }

  return trimmedKeyword;
}

function createSearchWhere(keyword: string) {
  const keywords = keyword.split(/\s+/);

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
  const validatedKeyword = validateKeyword(keyword);

  if (validatedKeyword === null) {
    return [];
  }

  return prisma.products.findMany({
    where: createSearchWhere(validatedKeyword),
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
  const validatedKeyword = validateKeyword(keyword);

  if (validatedKeyword === null) {
    return 0;
  }

  return prisma.products.count({
    where: createSearchWhere(validatedKeyword),
  });
}

export type SearchedProducts = Awaited<ReturnType<typeof searchProducts>>;
