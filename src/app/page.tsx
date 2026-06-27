// import CategoriesSidebar from "../features/ranking/CategoriesSidebar";
import Hero from "../features/product/components/Hero";
import RankList from "../features/ranking/components/RankList";
import RankTabs from "../features/ranking/components/RankTabs";
import { getUserUpvotes } from "../features/upvote/queries/getUserUpvotes";
import { getCurrentUser } from "@/features/auth/actions/getCurrentUser";

export default async function Home() {
  const user = await getCurrentUser();

  const upvotes = user ? await getUserUpvotes(user.id) : [];
  
  // 投票したプロダクトIDのセットを作成
  const votedProductIds = new Set(upvotes.map((u) => u.product_id));

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
              votedProductIds={votedProductIds}
            />
          </div>
          <div className="mb-10">
            <RankList
              id="weekly"
              period="今週"
              votedProductIds={votedProductIds}
            />
          </div>
          <RankList
            id="monthly"
            period="今月"
            votedProductIds={votedProductIds}
          />
        </div>
        {/* <CategoriesSidebar /> */}
      </main>
    </>
  );
}
