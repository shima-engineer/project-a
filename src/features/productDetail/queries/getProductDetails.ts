import { prisma } from "@/lib/prisma";

export async function getProductBySlug(slug: string) {
  return prisma.products.findUnique({
    where: { slug },
    include: {
      categories: true,
      product_tags: {
        include: {
          tags: true,
        },
      },
      screenshots: true,
      product_tech_stacks: {
        include: {
          tech_stacks: true,
        },
      },
      users: true
    },
  });
}

export type ProductDetails = Awaited<ReturnType<typeof getProductBySlug>>;
