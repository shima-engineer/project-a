// import CategoriesSidebar from "../features/ranking/CategoriesSidebar";
import Hero from "../features/product/components/Hero";
import RankList from "../features/ranking/components/RankList";
import RankTabs from "../features/ranking/components/RankTabs";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mb-4">
        <RankTabs />
      </div>
      <main className="mx-auto w-full max-w-4xl px-4">
        <div>
          <div className="mb-10">
            <RankList id="daily" period="今日" />
          </div>
          <div className="mb-10">
            <RankList id="weekly" period="今週" />
          </div>
          <RankList id="monthly" period="今月" />
        </div>
        {/* <CategoriesSidebar /> */}
      </main>
    </>
  );
}
