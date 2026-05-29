import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 h-14 bg-white border-b border-gray-200">
      <div className="mx-auto flex justify-between h-14 max-w-7xl items-center gap-3 sm:gap-4 px-4 sm:px-6">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="サイトのロゴ"
            width={146}
            height={32}
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/post"
            className="relative bg-[#4D53D9] hover:opacity-80 text-white rounded-md pr-3 pl-8 py-2 text-sm "
          >
            <p className="text-xs font-bold before:content-[''] before:absolute before:top-1/2 before:left-5 before:w-3 before:h-px before:bg-white before:-translate-x-1/2 before:-translate-y-1/2 after:content-[''] after:absolute after:top-1/2 after:left-5 after:w-px after:h-3 after:bg-white after:-translate-x-1/2 after:-translate-y-1/2">
              投稿する
            </p>
          </Link>
          <Image
            src="/avatar.png"
            alt="ユーザーのアバター"
            width={38}
            height={38}
            className="rounded-full border border-gray-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
