import Hero from "../features/Hero";
// import CategoriesSidebar from "../features/ranking/CategoriesSidebar";
import RankList from "../features/ranking/RankList";
import RankTabs from "../features/ranking/RankTabs";

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
            <RankList />
          </div>
          <RankList />
        </div>
        {/* <CategoriesSidebar /> */}
      </main>
    </>
  );
}
