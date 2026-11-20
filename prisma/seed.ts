import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const AUTH_USER_ID = "33e2e8cb-19c7-4690-a656-993f542ca122";

async function main() {
  // テスト専用DBを初期化
  await prisma.upvotes.deleteMany();
  await prisma.comments.deleteMany();
  await prisma.products.deleteMany();
  await prisma.categories.deleteMany();
  await prisma.public_users.deleteMany();

  // カテゴリ
  await prisma.categories.createMany({
    data: [
      { name: "AIツール", slug: "ai" },
      { name: "SaaS", slug: "saas" },
      { name: "Webアプリ", slug: "web-app" },
      { name: "ネイティブアプリ", slug: "native-app" },
      { name: "Developer Tools", slug: "developer-tools" },
      { name: "生産性", slug: "productivity" },
      { name: "デザイン", slug: "design" },
      { name: "マーケティング", slug: "marketing" },
    ],
  });

  // ユーザー
  await prisma.public_users.create({
    data: {
      id: AUTH_USER_ID,
      name: "山田 太郎",
      username: "yamada",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  const categories = await prisma.categories.findMany();

  const aiCategory = categories.find((c) => c.slug === "ai");
  const devCategory = categories.find((c) => c.slug === "developer-tools");
  const productivityCategory = categories.find(
    (c) => c.slug === "productivity",
  );

  if (!aiCategory || !devCategory || !productivityCategory) {
    throw new Error("Test categories not found");
  }

  await prisma.products.createMany({
    data: [
      {
        user_id: AUTH_USER_ID,
        category_id: aiCategory.id,
        name: "WriteMate",
        slug: "test-writemate",
        url: "https://writemate.dev",
        tagline: "AIライティングツール",
        description: "ブログ記事やSNS投稿を作成できるAIツール",
        pricing_type: "Free",
        status: "published",
        thumbnail_url: "https://example.com/writemate.png",
        upvotes_count: 23,
      },
      {
        user_id: AUTH_USER_ID,
        category_id: productivityCategory.id,
        name: "FocusFlow",
        slug: "test-focusflow",
        url: "https://focusflow.app",
        tagline: "集中タイマー",
        description: "ポモドーロテクニックを活用した集中タイマーアプリ",
        pricing_type: "Free",
        status: "published",
        thumbnail_url: "https://example.com/focusflow.png",
        upvotes_count: 41,
      },
      {
        user_id: AUTH_USER_ID,
        category_id: devCategory.id,
        name: "API Monitor",
        slug: "test-api-monitor",
        url: "https://apimonitor.dev",
        tagline: "API監視サービス",
        description: "APIの稼働状況を監視するサービス",
        pricing_type: "Paid",
        status: "published",
        thumbnail_url: "https://example.com/api-monitor.png",
        upvotes_count: 30,
      },
      {
        user_id: AUTH_USER_ID,
        category_id: aiCategory.id,
        name: "PromptBox",
        slug: "test-promptbox",
        url: "https://promptbox.dev",
        tagline: "AIプロンプト管理",
        description: "AIプロンプトを効率的に管理できるツール",
        pricing_type: "Free",
        status: "published",
        thumbnail_url: "https://example.com/promptbox.png",
        upvotes_count: 18,
      },
      {
        user_id: AUTH_USER_ID,
        category_id: productivityCategory.id,
        name: "HabitBoard",
        slug: "test-habitboard",
        url: "https://habitboard.app",
        tagline: "習慣管理アプリ",
        description: "日々の習慣を記録・管理できるアプリ",
        pricing_type: "Paid",
        status: "published",
        thumbnail_url: "https://example.com/habitboard.png",
        upvotes_count: 15,
      },
      {
        user_id: AUTH_USER_ID,
        category_id: devCategory.id,
        name: "DevTools Pro",
        slug: "test-devtools-pro",
        url: "https://devtoolspro.dev",
        tagline: "開発者向けツール",
        description: "開発者向けの便利なツールを提供するサービス",
        pricing_type: "Paid",
        status: "published",
        thumbnail_url: "https://example.com/devtools-pro.png",
        upvotes_count: 12,
      },
    ],
  });

  console.log("Test seed completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
