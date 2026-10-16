import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { getPeriodRange } from "@/utils/getPeriodRange";
dayjs.extend(isoWeek);

export async function getProducts() {
  return prisma.products.findMany({
    include: {
      categories: true,
    },
    orderBy: {
      upvotes_count: "desc",
    },
  });
}

export async function getProductsByPeriod(
  period: "daily" | "weekly" | "monthly",
) {
  const range = getPeriodRange(period);

  const products = await prisma.products.findMany({
    where: {
      created_at: range,
    },
    include: {
      categories: true,
    },
    orderBy: [{ upvotes_count: "desc" }, { created_at: "asc" }, { id: "asc" }],
  });

  let rank = 0;

  return products.map((product, index) => {
    if (
      index === 0 ||
      product.upvotes_count !== products[index - 1].upvotes_count
    ) {
      rank = index + 1;
    }

    return {
      ...product,
      rank,
    };
  });
}

export type ProductsByPeriod = Awaited<ReturnType<typeof getProductsByPeriod>>;
