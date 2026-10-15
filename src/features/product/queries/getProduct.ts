import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { getPeriodRange } from "@/app/utils/getPeriodRange";
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
  return prisma.products.findMany({
    where: {
      created_at: range,
    },
    include: {
      categories: true,
    },
    orderBy: {
      upvotes_count: "desc",
    },
  });
}
