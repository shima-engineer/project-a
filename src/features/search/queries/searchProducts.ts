"use server";

import { prisma } from "@/lib/prisma";
import type { SearchParams } from "../types";

function validateKeyword(keyword: string): string | null {
  if (typeof keyword !== "string") {
    return null;
  }

  const trimmedKeyword = keyword.trim();

  if (trimmedKeyword.length > 100) {
    return null;
  }

  return trimmedKeyword;
}

function createSearchWhere(params: SearchParams) {
  const { keyword, categories, pricing_type } = params;

  const keywords = keyword ? keyword.split(/\s+/) : [];

  return {
    AND: [
      ...keywords.map((word) => ({
        name: {
          contains: word,
          mode: "insensitive" as const,
        },
      })),
      ...(categories.length > 0
        ? [{ categories: { name: { in: categories } } }]
        : []),
      ...(pricing_type.length > 0
        ? [{ pricing_type: { in: pricing_type } }]
        : []),
    ],
  };
}

/**
 * キーワードに一致するプロダクトを最大5件取得する。
 *
 * スペース区切りのキーワードをAND条件で検索し、
 * 投票数の多い順に取得する。大文字・小文字は区別しない。
 *
 * @param params - 検索パラメータ
 * @param params.keyword - 検索キーワード（最大100文字）
 * @returns 検索結果。不正なキーワードの場合は空配列
 */
export async function searchProducts(params: SearchParams) {
  const { keyword, categories, pricing_type, order } = params;
  const validatedKeyword = validateKeyword(keyword);

  if (
    validatedKeyword === null ||
    (validatedKeyword === "" &&
      categories.length === 0 &&
      pricing_type.length === 0)
  ) {
    return [];
  }

  return prisma.products.findMany({
    where: createSearchWhere({
      keyword: validatedKeyword,
      categories,
      pricing_type,
      order,
    }),
    take: 5,
    orderBy:
      order === "newest"
        ? [{ created_at: "desc" as const }, { id: "asc" as const }]
        : [
            { upvotes_count: "desc" as const },
            { created_at: "asc" as const },
            { id: "asc" as const },
          ],
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
 * @param params - 検索パラメータ
 * @returns 検索結果の総件数。不正なキーワードの場合は0
 */
export async function countSearchProducts(params: SearchParams) {
  const { keyword, categories, pricing_type, order } = params;
  const validatedKeyword = validateKeyword(keyword);

  if (
    validatedKeyword === null ||
    (validatedKeyword === "" &&
      categories.length === 0 &&
      pricing_type.length === 0)
  ) {
    return 0;
  }

  return prisma.products.count({
    where: createSearchWhere({
      keyword: validatedKeyword,
      categories,
      pricing_type,
      order,
    }),
  });
}

export type SearchedProducts = Awaited<ReturnType<typeof searchProducts>>;
