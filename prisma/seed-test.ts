import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * CIの検索結合テスト用データ。
 * DB名が _test で終わる場合だけ実行する。
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

const USER_ID = "33e2e8cb-19c7-4690-a656-993f542ca122";

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
  // CIのPostgreSQL用にauth.usersを準備
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

  // ユーザー
  await prisma.public_users.upsert({
    where: { id: USER_ID },
    update: {},
    create: {
      id: USER_ID,
      name: "山田 太郎",
      username: "yamada",
    },
  });

  // カテゴリ
  const categoryIds = new Map<string, string>();

  for (const category of categories) {
    const saved = await prisma.categories.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });

    categoryIds.set(category.slug, saved.id);
  }

  // 料金プラン検索用プロダクト
  const pricingCases = [
    {
      name: "WriteMate",
      category: "ai",
      pricing_type: "Free",
      upvotes: 23,
    },
    {
      name: "FocusFlow",
      category: "productivity",
      pricing_type: "Free",
      upvotes: 41,
    },
    {
      name: "API Monitor",
      category: "developer-tools",
      pricing_type: "Paid",
      upvotes: 30,
    },
    {
      name: "PromptBox",
      category: "ai",
      pricing_type: "Free",
      upvotes: 18,
    },
    {
      name: "HabitBoard",
      category: "productivity",
      pricing_type: "Paid",
      upvotes: 15,
    },
    {
      name: "DevTools Pro",
      category: "developer-tools",
      pricing_type: "Paid",
      upvotes: 12,
    },
  ];

  // 既存のキーワード検索用プロダクト
  // API Monitorは上のpricingCasesに含まれるため除外
  const searchCases = [
    { name: "API Builder", category: "developer-tools", upvotes: 18 },
    { name: "API Studio", category: "saas", upvotes: 16 },
    { name: "API Checker", category: "web-app", upvotes: 14 },
    { name: "API Explorer", category: "ai", upvotes: 12 },
    { name: "API Dashboard", category: "productivity", upvotes: 10 },
    { name: "API Toolkit", category: "developer-tools", upvotes: 8 },
    { name: "API プロジェクト管理", category: "saas", upvotes: 7 },
    { name: "API プレビュー", category: "web-app", upvotes: 6 },
    { name: "API プランナー", category: "ai", upvotes: 5 },
    {
      name: "API プロファイラー",
      category: "developer-tools",
      upvotes: 4,
    },
    {
      name: "API プロトタイピング",
      category: "design",
      upvotes: 3,
    },
    {
      name: "API プロダクト分析",
      category: "marketing",
      upvotes: 2,
    },
    { name: "Design Palette", category: "design", upvotes: 6 },
    { name: "Marketing Helper", category: "marketing", upvotes: 4 },
    { name: "Native Notes", category: "native-app", upvotes: 2 },
  ];

  // 検索用の追加データは料金プランの件数テストに
  // 影響しないよう別の料金プランにする
  const cases = [
    ...pricingCases,
    ...searchCases.map((product) => ({
      ...product,
      pricing_type: "Freemium",
    })),
  ];

  for (const product of cases) {
    const categoryId = categoryIds.get(product.category);

    if (!categoryId) {
      throw new Error(`Category not found: ${product.category}`);
    }

    const slug = `integration-test-${product.name
      .toLowerCase()
      .replaceAll(" ", "-")}`;

    await prisma.products.upsert({
      where: { slug },
      update: {
        name: product.name,
        category_id: categoryId,
        pricing_type: product.pricing_type,
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
        pricing_type: product.pricing_type,
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
