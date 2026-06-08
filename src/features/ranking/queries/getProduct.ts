import { prisma } from "@/src/lib/prisma";

export async function getProduct() {
  const products = await prisma.products.findMany();

  console.log(products);

  return products;
}