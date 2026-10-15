import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

export async function getProductCategory(category_id: string) {
  return prisma.categories.findUnique({
    where: { id: category_id },
  });
}
