import { getPeriodRange } from "@/utils/getPeriodRange";
import { prisma } from "@/lib/prisma";
import type { Period } from "@/types/period";

export async function getProductRank(slug: string, period: Period) {
  const product = await prisma.products.findUnique({
    where: { slug },
  });

  if (!product) return null;

  const range = getPeriodRange(period);

  // 対象期間に投稿されていなければ順位なし
  if (product.created_at < range.gte || product.created_at > range.lte) {
    return null;
  }

  const count = await prisma.products.count({
    where: {
      created_at: range,
      upvotes_count: {
        gt: product.upvotes_count,
      },
    },
  });

  return count + 1;
}
