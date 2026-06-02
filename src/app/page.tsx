import Hero from "../features/Hero";
import CategoriesSidebar from "../features/ranking/CategoriesSidebar";
import RankList from "../features/ranking/RankList";
import RankTabs from "../features/ranking/RankTabs";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mb-4">
        <RankTabs />
      </div>
      <main className="flex-col mx-auto w-full max-w-7xl px-4 sm:px-6  flex-1 md:flex">
        <div>
          <RankList />
          <RankList />
        </div>
        <CategoriesSidebar />
      </main>
    </>
  );
}
