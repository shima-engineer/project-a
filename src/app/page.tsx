import Hero from "../features/Hero";
import RankList from "../features/ranking/RankList";
import RankTabs from "../features/ranking/RankTabs";

export default function Home() {
  return (
    <>
      <Hero />
      <RankTabs />
      <RankList />
    </>
  );
}
