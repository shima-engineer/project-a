import { getPeriodRange } from "@/app/utils/getPeriodRange";
import { prisma } from "@/lib/prisma";

export async function getProductRankBySlug(
  slug: string,
  period: "daily" | "weekly" | "monthly",
) {
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
