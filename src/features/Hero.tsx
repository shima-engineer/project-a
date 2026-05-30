import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-linear-to-br from-hero-start to-hero-end px-4 sm:px-6 py-12 md:py-16">
      <p className="text-xs font-medium text-primary mb-4">
        本日24個の新しいプロダクトが投稿されました
      </p>
      <h1 className="flex flex-col text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.1] mb-5">
        <span>個人開発者の</span>
        <span className="bg-linear-to-r from-primary to-upvote bg-clip-text text-transparent">
          プロダクト実験室
        </span>
      </h1>
      <p className="mb-7 text-base md:text-lg max-w-xl">
        個人開発Labは、作ったプロダクトを仲間とシェアし、フィードバックを受け、一緒に磨き上げる場所。あなたのアイデアを次の段階へ。
      </p>
      <Link
        href="/products"
        className="bg-primary text-white px-8 py-2  hover:opacity-80 text-sm cursor-pointer rounded-md"
      >
        プロダクトを投稿する
      </Link>
    </section>
  );
};

export default Hero;
