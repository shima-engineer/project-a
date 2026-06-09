import dayjs from "dayjs";
import { prisma } from "@/src/lib/prisma";

export async function getProducts() {
  return prisma.products.findMany({
    include: {
      categories: true,
    },
  });
}

export async function getTodayProducts() {
  return prisma.products.findMany({
    where: {
      created_at: {
        gte: dayjs().startOf("day").toDate(),
      },
    },
    include: {
      categories: true,
    },
  });
}

export async function getWeekProducts() {
  return prisma.products.findMany({
    where: {
      created_at: {
        gte: dayjs().startOf("week").toDate(),
      },
    },
    include: {
      categories: true,
    },
  });
}

export async function getMonthProducts() {
  return prisma.products.findMany({
    where: {
      created_at: {
        gte: dayjs().startOf("month").toDate(),
      },
    },
    include: {
      categories: true,
    },
  });
}

export async function getProductsByPeriod(
  period: "daily" | "weekly" | "monthly",
) {
  switch (period) {
    case "daily":
      return getTodayProducts();

    case "weekly":
      return getWeekProducts();

    case "monthly":
      return getMonthProducts();
  }
}