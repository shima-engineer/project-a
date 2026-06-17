import { Prisma } from "@/src/generated/prisma/client";

export type ProductWithCategory = Prisma.productsGetPayload<{
  include: {
    categories: true;
  };
}>;
