import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

export async function getProductDetails(slug: string) {
  return prisma.products.findUnique({
    where: { slug: slug },
  });
}
