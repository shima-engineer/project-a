import Link from "next/link";
import { getTodayProductCount } from "../queries/getTodayProductCount";
import { Button } from "../../../../components/ui/button";

const Hero = async () => {
  const todayCount = await getTodayProductCount();

  return (
    <section className="bg-linear-to-br from-hero-start to-hero-end px-4 sm:px-6 py-12 md:py-16">
      <div className="mx-auto max-w-308">
        <p className="text-xs font-medium text-primary mb-4">
          本日{todayCount}個の新しいプロダクトが投稿されました
        </p>
        <h1 className="flex flex-col text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.1] mb-5">
          <span>個人開発者の</span>
          <span className="bg-linear-to-r from-primary to-upvote bg-clip-text text-transparent">
            プロダクト実験室
          </span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mb-7">
          個人開発Labは、作ったプロダクトを仲間とシェアし、フィードバックを受け、一緒に磨き上げる場所。あなたのアイデアを次の段階へ。
        </p>
        <Button asChild>
          <Link href="/products">プロダクトを投稿する</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
