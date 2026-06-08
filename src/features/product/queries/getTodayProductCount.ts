import { prisma } from "@/src/lib/prisma";
import dayjs from "dayjs";

export async function getTodayProductCount() {
  const today = dayjs().startOf("day");
  const tomorrow = today.add(1, "day");

  return prisma.products.count({
    where: {
      created_at: {
        gte: today.toDate(),
        lt: tomorrow.toDate(),
      },
    },
  });
}
