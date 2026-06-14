import dayjs from "dayjs";
import { prisma } from "@/src/lib/prisma";
import isoWeek from "dayjs/plugin/isoWeek";
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
  const ranges = {
    daily: {
      gte: dayjs().startOf("day").toDate(),
      lte: dayjs().endOf("day").toDate(),
    },
    weekly: {
      gte: dayjs().startOf("isoWeek").toDate(),
      lte: dayjs().endOf("isoWeek").toDate(),
    },
    monthly: {
      gte: dayjs().startOf("month").toDate(),
      lte: dayjs().endOf("month").toDate(),
    },
  };

  return prisma.products.findMany({
    where: {
      created_at: ranges[period],
    },
    include: {
      categories: true,
    },
    orderBy: {
      upvotes_count: "desc",
    },
  });
}
