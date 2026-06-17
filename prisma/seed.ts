import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const AUTH_USER_IDS = {
  yamada: "33e2e8cb-19c7-4690-a656-993f542ca122",
  hanako: "6b962cff-a04f-46e0-98c6-c5aef6900039",
  kenta: "647f8ec6-0980-4619-9af3-f380cdbeb442",
};

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

  await prisma.public_users.createMany({
    data: [
      {
        id: AUTH_USER_IDS.yamada,
        name: "山田 太郎",
        username: "yamada",
        avatar_url: "https://i.pravatar.cc/150?img=1",
        bio: "Next.jsとAIが好きな個人開発者",
        github_url: "https://github.com/yamada",
        x_url: "https://x.com/yamada",
        website_url: "https://yamada.dev",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: AUTH_USER_IDS.hanako,
        name: "佐藤 花子",
        username: "hanako",
        avatar_url: "https://i.pravatar.cc/150?img=5",
        bio: "UI/UXデザイナー",
        github_url: "https://github.com/hanako",
        x_url: "https://x.com/hanako",
        website_url: "https://hanako.design",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: AUTH_USER_IDS.kenta,
        name: "鈴木 健太",
        username: "kenta",
        avatar_url: "https://i.pravatar.cc/150?img=8",
        bio: "SaaSを作るバックエンドエンジニア",
        github_url: "https://github.com/kenta",
        x_url: "https://x.com/kenta",
        website_url: "https://kenta.dev",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  const users = await prisma.public_users.findMany();
  const categories = await prisma.categories.findMany();

  const yamada = users.find((u) => u.username === "yamada");
  const hanako = users.find((u) => u.username === "hanako");
  const kenta = users.find((u) => u.username === "kenta");
  if (!yamada || !hanako || !kenta) {
    throw new Error("Seed users not found");
  }

  const aiCategory = categories.find((c) => c.slug === "ai");
  const devCategory = categories.find((c) => c.slug === "developer-tools");
  const productivityCategory = categories.find(
    (c) => c.slug === "productivity",
  );

  if (!aiCategory || !devCategory || !productivityCategory) {
    throw new Error("Seed categories not found");
  }
  await prisma.products.deleteMany();

  await prisma.products.createMany({
    data: [
      {
        user_id: yamada.id,
        category_id: aiCategory.id,
        name: "WriteMate",
        slug: "writemate",
        url: "https://writemate.dev",
        tagline: "日本語特化のAIライティングアシスタント",
        description:
          "ブログ記事やSNS投稿を高速に作成できるAIライティングツール。",
        features: "記事生成、SEO補助、SNS投稿作成",
        pricing: "Freemium",
        thumbnail_url:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        status: "published",
        upvotes_count: 23,
        comments_count: 5,
        view_count: 320,
      },

      {
        user_id: hanako.id,
        category_id: productivityCategory.id,
        name: "FocusFlow",
        slug: "focusflow",
        url: "https://focusflow.app",
        tagline: "ポモドーロ集中タイマー",
        description: "集中時間を可視化し習慣化を支援する生産性向上アプリ。",
        features: "ポモドーロ、統計、目標管理",
        pricing: "Free",
        thumbnail_url:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        status: "published",
        upvotes_count: 41,
        comments_count: 8,
        view_count: 570,
      },

      {
        user_id: kenta.id,
        category_id: devCategory.id,
        name: "API Monitor",
        slug: "api-monitor",
        url: "https://apimonitor.dev",
        tagline: "API監視を3分で開始",
        description: "エンドポイント監視と障害通知を簡単に構築できるサービス。",
        features: "死活監視、Slack通知、分析",
        pricing: "$9/month",
        thumbnail_url:
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
        status: "published",
        upvotes_count: 18,
        comments_count: 2,
        view_count: 210,
      },

      {
        user_id: yamada.id,
        category_id: aiCategory.id,
        name: "PromptBox",
        slug: "promptbox",
        url: "https://promptbox.ai",
        tagline: "AIプロンプト管理ツール",
        description: "プロンプトの保存・共有・検索ができるサービス。",
        features: "タグ管理、検索、共有",
        pricing: "Freemium",
        thumbnail_url:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        status: "published",
        upvotes_count: 12,
        comments_count: 1,
        view_count: 140,
      },

      {
        user_id: hanako.id,
        category_id: productivityCategory.id,
        name: "HabitBoard",
        slug: "habitboard",
        url: "https://habitboard.app",
        tagline: "習慣化をゲーム化するアプリ",
        description: "毎日の習慣をポイント化して継続を支援。",
        features: "習慣管理、ランキング、分析",
        pricing: "Free",
        thumbnail_url:
          "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
        status: "published",
        upvotes_count: 34,
        comments_count: 4,
        view_count: 460,
      },
      {
        user_id: kenta.id,
        category_id: aiCategory.id,
        name: "MeetingAI",
        slug: "meeting-ai",
        url: "https://meetingai.app",
        tagline: "会議を自動で文字起こし",
        description: "オンライン会議の録音・要約・タスク抽出を自動化。",
        features: "文字起こし、要約、タスク抽出",
        pricing: "Freemium",
        thumbnail_url:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
        status: "published",
        upvotes_count: 27,
        comments_count: 3,
        view_count: 380,
      },

      {
        user_id: yamada.id,
        category_id: devCategory.id,
        name: "DeployFast",
        slug: "deploy-fast",
        url: "https://deployfast.dev",
        tagline: "個人開発向けデプロイ基盤",
        description: "GitHub連携で数秒でデプロイできるホスティングサービス。",
        features: "CI/CD、自動デプロイ、ログ閲覧",
        pricing: "$12/month",
        thumbnail_url:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        status: "published",
        upvotes_count: 22,
        comments_count: 2,
        view_count: 290,
      },

      {
        user_id: hanako.id,
        category_id: productivityCategory.id,
        name: "DailyMemo",
        slug: "daily-memo",
        url: "https://dailymemo.app",
        tagline: "1日1分の日報アプリ",
        description: "毎日の振り返りを簡単に記録できるジャーナルサービス。",
        features: "日報、分析、目標管理",
        pricing: "Free",
        thumbnail_url:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a",
        status: "published",
        upvotes_count: 16,
        comments_count: 1,
        view_count: 180,
      },

      {
        user_id: kenta.id,
        category_id: devCategory.id,
        name: "SchemaHub",
        slug: "schemahub",
        url: "https://schemahub.dev",
        tagline: "API仕様書を自動生成",
        description:
          "OpenAPIベースでドキュメントを自動生成できる開発支援ツール。",
        features: "OpenAPI、ドキュメント生成、共有",
        pricing: "Freemium",
        thumbnail_url:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        status: "published",
        upvotes_count: 31,
        comments_count: 4,
        view_count: 450,
      },

      {
        user_id: hanako.id,
        category_id: aiCategory.id,
        name: "ImagePrompt Studio",
        slug: "image-prompt-studio",
        url: "https://imageprompt.ai",
        tagline: "画像生成プロンプト作成支援",
        description: "画像生成AI向けの高品質なプロンプトを作成できるツール。",
        features: "プロンプト生成、テンプレート、共有",
        pricing: "Freemium",
        thumbnail_url:
          "https://images.unsplash.com/photo-1507146426996-ef05306b995a",
        status: "published",
        upvotes_count: 29,
        comments_count: 3,
        view_count: 410,
      },
    ],
    skipDuplicates: true,
  });

  const products = await prisma.products.findMany();

  const writeMate = products.find((p) => p.slug === "writemate");
  const focusFlow = products.find((p) => p.slug === "focusflow");
  const promptBox = products.find((p) => p.slug === "promptbox");
  const apiMonitor = products.find((p) => p.slug === "api-monitor");
  const habitBoard = products.find((p) => p.slug === "habitboard");

  if (!writeMate || !focusFlow || !promptBox || !apiMonitor || !habitBoard) {
    throw new Error("Seed products not found");
  }

  await prisma.comments.createMany({
    data: [
      {
        user_id: AUTH_USER_IDS.kenta,
        product_id: writeMate.id,
        content: "日本語の文章生成がかなり自然でした。",
      },
      {
        user_id: AUTH_USER_IDS.yamada,
        product_id: writeMate.id,
        content: "SEO記事の下書き作成に便利です。",
      },
      {
        user_id: AUTH_USER_IDS.yamada,
        product_id: focusFlow.id,
        content: "ポモドーロタイマーが使いやすいです。",
      },
      {
        user_id: AUTH_USER_IDS.yamada,
        product_id: focusFlow.id,
        content: "集中時間の分析機能が面白い。",
      },
      {
        user_id: AUTH_USER_IDS.hanako,
        product_id: promptBox.id,
        content: "プロンプト管理がかなり楽になりました。",
      },
      {
        user_id: AUTH_USER_IDS.yamada,
        product_id: promptBox.id,
        content: "カテゴリ分け機能が欲しいです。",
      },
      {
        user_id: AUTH_USER_IDS.hanako,
        product_id: apiMonitor.id,
        content: "API監視の通知が分かりやすいです。",
      },
      {
        user_id: AUTH_USER_IDS.yamada,
        product_id: habitBoard.id,
        content: "習慣化のモチベーション維持に役立っています。",
      },
    ],
  });
  await Promise.all([
    prisma.products.update({
      where: { id: writeMate.id },
      data: { comments_count: 2 },
    }),

    prisma.products.update({
      where: { id: focusFlow.id },
      data: { comments_count: 2 },
    }),

    prisma.products.update({
      where: { id: promptBox.id },
      data: { comments_count: 2 },
    }),

    prisma.products.update({
      where: { id: apiMonitor.id },
      data: { comments_count: 1 },
    }),

    prisma.products.update({
      where: { id: habitBoard.id },
      data: { comments_count: 1 },
    }),
  ]);
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
