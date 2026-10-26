import { prisma } from "@/lib/prisma";

export async function getUserById(id: string) {
  return prisma.public_users.findUnique({
    where: { id },
  });
}

export type ProfileUser = NonNullable<Awaited<ReturnType<typeof getUserById>>>;
