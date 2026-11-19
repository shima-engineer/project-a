import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * CI の検索結合テスト用データ。
 * 本番DBへの誤投入を避けるため、DB名が _test で終わる場合だけ実行する。
 */
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const databaseName = decodeURIComponent(new URL(databaseUrl).pathname.slice(1));
if (!databaseName.endsWith("_test")) {
  throw new Error(`Refusing to seed a non-test database: ${databaseName}`);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const USER_ID = "7e99ab7b-228b-4953-890b-ad41e0000001";

const categories = [
  { name: "AIツール", slug: "ai" },
  { name: "SaaS", slug: "saas" },
  { name: "Webアプリ", slug: "web-app" },
  { name: "ネイティブアプリ", slug: "native-app" },
  { name: "Developer Tools", slug: "developer-tools" },
  { name: "生産性", slug: "productivity" },
  { name: "デザイン", slug: "design" },
  { name: "マーケティング", slug: "marketing" },
];

async function main() {
  // Supabase環境ではauth.usersが存在する。CIの素のPostgreSQLでは
  // 別途この最小限の参照先を作る必要がある。
  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS auth`);
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS auth.users (
      id uuid PRIMARY KEY
    )
  `);
  await prisma.$executeRaw`
    INSERT INTO auth.users (id)
    VALUES (${USER_ID}::uuid)
    ON CONFLICT (id) DO NOTHING
  `;

  await prisma.public_users.upsert({
    where: { id: USER_ID },
    update: {},
    create: {
      id: USER_ID,
      name: "結合テストユーザー",
      username: "integration_test_user",
    },
  });

  const ids = new Map<string, string>();
  for (const category of categories) {
    const saved = await prisma.categories.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });
    ids.set(category.slug, saved.id);
  }

  const cases = [
    { name: "API Monitor", category: "developer-tools", upvotes: 20 },
    { name: "API Builder", category: "developer-tools", upvotes: 18 },
    { name: "API Studio", category: "saas", upvotes: 16 },
    { name: "API Checker", category: "web-app", upvotes: 14 },
    { name: "API Explorer", category: "ai", upvotes: 12 },
    { name: "API Dashboard", category: "productivity", upvotes: 10 },
    { name: "API Toolkit", category: "developer-tools", upvotes: 8 },
    { name: "API プロジェクト管理", category: "saas", upvotes: 7 },
    { name: "API プレビュー", category: "web-app", upvotes: 6 },
    { name: "API プランナー", category: "ai", upvotes: 5 },
    { name: "API プロファイラー", category: "developer-tools", upvotes: 4 },
    { name: "API プロトタイピング", category: "design", upvotes: 3 },
    { name: "API プロダクト分析", category: "marketing", upvotes: 2 },
    { name: "Design Palette", category: "design", upvotes: 6 },
    { name: "Marketing Helper", category: "marketing", upvotes: 4 },
    { name: "Native Notes", category: "native-app", upvotes: 2 },
  ] as const;

  for (const product of cases) {
    const categoryId = ids.get(product.category);
    if (!categoryId) throw new Error(`Category not found: ${product.category}`);

    const slug = `integration-test-${product.name.toLowerCase().replaceAll(" ", "-")}`;
    await prisma.products.upsert({
      where: { slug },
      update: {
        name: product.name,
        category_id: categoryId,
        upvotes_count: product.upvotes,
      },
      create: {
        user_id: USER_ID,
        category_id: categoryId,
        name: product.name,
        slug,
        url: `https://example.com/${slug}`,
        tagline: `${product.name}のテスト用プロダクト`,
        description: "検索の結合テストに使用する固定データです。",
        thumbnail_url: "https://example.com/thumbnail.png",
        pricing_type: "free",
        status: "published",
        upvotes_count: product.upvotes,
      },
    });
  }

  console.log(
    `Seeded ${cases.length} test products and ${categories.length} categories`,
  );
}

main()
  .catch((error) => {
    console.error("Test seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
