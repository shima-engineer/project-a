"use client";
import AuthModal from "@/features/modal/AuthModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import UserAvatarMenu from "./UserAvatarMenu";

interface HeaderClientProps {
  user: User | null;
}

const HeaderClient = ({ user }: HeaderClientProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const onAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const avatarUrl = user?.user_metadata?.avatar_url;

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
          {avatarUrl ? (
            <>
              <Link
                href="/posts"
                className="relative bg-[#4D53D9] hover:opacity-80 text-white rounded-md pr-3 pl-8 py-2 text-sm "
              >
                <p className="text-xs font-bold before:content-[''] before:absolute before:top-1/2 before:left-5 before:w-3 before:h-px before:bg-white before:-translate-x-1/2 before:-translate-y-1/2 after:content-[''] after:absolute after:top-1/2 after:left-5 after:w-px after:h-3 after:bg-white after:-translate-x-1/2 after:-translate-y-1/2">
                  投稿する
                </p>
              </Link>
              <UserAvatarMenu
                avatarUrl={avatarUrl}
                name={user?.user_metadata?.name ?? ""}
                email={user?.email ?? ""}
              />
            </>
          ) : (
            <>
              <button
                onClick={handleLoginClick}
                className="relative bg-[#4D53D9] hover:opacity-80 text-white rounded-md pr-3 pl-8 py-2 text-sm "
              >
                <p className="text-xs font-bold before:content-[''] before:absolute before:top-1/2 before:left-5 before:w-3 before:h-px before:bg-white before:-translate-x-1/2 before:-translate-y-1/2 after:content-[''] after:absolute after:top-1/2 after:left-5 after:w-px after:h-3 after:bg-white after:-translate-x-1/2 after:-translate-y-1/2">
                  投稿する
                </p>
              </button>
              <button
                onClick={handleLoginClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:opacity-80 hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
              >
                ログイン
              </button>
            </>
          )}
        </div>
      </div>
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        onAuthModalClose={onAuthModalClose}
      />
    </header>
  );
};

export default HeaderClient;
