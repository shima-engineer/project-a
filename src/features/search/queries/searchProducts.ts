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

/**
 * キーワードに一致するプロダクトを最大5件取得する。
 *
 * スペース区切りのキーワードをAND条件で検索し、
 * 投票数の多い順に取得する。大文字・小文字は区別しない。
 *
 * @param keyword - 検索キーワード（最大100文字）
 * @returns 検索結果。不正なキーワードの場合は空配列
 */
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

/**
 * キーワードに一致するプロダクトの総件数を取得する。
 *
 * searchProductsと同じ検索条件を使用するが、
 * 取得件数の上限は設けない。
 *
 * @param keyword - 検索キーワード（最大100文字）
 * @returns 検索結果の総件数。不正なキーワードの場合は0
 */
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
