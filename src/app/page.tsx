// import CategoriesSidebar from "../features/ranking/CategoriesSidebar";
import Hero from "../features/product/components/Hero";
import { getProductsByPeriod } from "../features/product/queries/getProduct";
import RankList from "../features/ranking/components/RankList";
import RankTabs from "../features/ranking/components/RankTabs";
import { getUserUpvotes } from "../features/upvote/queries/getUserUpvotes";

export default async function Home() {
  // userIdは仮置き。認証実装後にセッションから取得するようにする
  const userId = "33e2e8cb-19c7-4690-a656-993f542ca122";
  const upvotes = await getUserUpvotes(userId);
  // 投票したプロダクトIDのセットを作成
  const votedProductIds = new Set(upvotes.map((u) => u.product_id));

  const dailyProducts = await getProductsByPeriod("daily", 5);
  const weeklyProducts = await getProductsByPeriod("weekly", 5);
  const monthlyProducts = await getProductsByPeriod("monthly", 5);

  return (
    <>
      <Hero />
      <div className="mb-4">
        <RankTabs />
      </div>
      <main className="mx-auto w-full max-w-4xl px-4">
        <div>
          <div className="mb-10">
            <RankList
              id="daily"
              period="今日"
              initialProducts={dailyProducts}
              votedProductIds={votedProductIds}
            />
          </div>
          <div className="mb-10">
            <RankList
              id="weekly"
              period="今週"
              initialProducts={weeklyProducts}
              votedProductIds={votedProductIds}
            />
          </div>
          <RankList
            id="monthly"
            period="今月"
            initialProducts={monthlyProducts}
            votedProductIds={votedProductIds}
          />
        </div>
        {/* <CategoriesSidebar /> */}
      </main>
    </>
  );
}
