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
      <main className="flex flex-col flex-1 md:flex-row md:justify-between gap-10 mx-auto w-full max-w-308 px-4 sm:px-0">
        <div>
          <div className="mb-10">
            <RankList />
          </div>
          <RankList />
        </div>
        <CategoriesSidebar />
      </main>
    </>
  );
}
