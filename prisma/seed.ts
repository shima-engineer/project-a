
import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.categories.createMany({
    data: [
      {
        name: "AI",
        slug: "ai",
      },
      {
        name: "Developer Tools",
        slug: "developer-tools",
      },
      {
        name: "Productivity",
        slug: "productivity",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
