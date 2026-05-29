import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[linear-gradient(135deg,oklch(0.70_0.18_278_/_0.16),oklch(0.72_0.20_32_/_0.10))] py-12">
      <p className="mb-4">本日 24 個の新しいプロダクトが投稿されました</p>
      <h1 className="mb-5">
        <span>個人開発者の</span>
        <span>プロダクト実験室</span>
      </h1>
      <p className="mb-7">
        個人開発Labは、作ったプロダクトを仲間とシェアし、フィードバックを受け、一緒に磨き上げる場所。あなたのアイデアを次の段階へ。
      </p>
      <Link
        href="/products"
        className="bg-[#4D53D9] text-white px-8 py-2  hover:opacity-80 text-sm cursor-pointer rounded-md"
      >
        プロダクトを投稿する
      </Link>
    </section>
  );
};

export default Hero;
