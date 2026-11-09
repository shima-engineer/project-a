"use client";

import SearchButton from "@/features/search/components/SearchButton";
import SearchModal from "@/features/search/components/SearchModal";
import AuthModal from "@/features/modal/AuthModal";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import UserAvatarMenu from "./UserAvatarMenu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderClientProps {
  user: User | null;
}

const HeaderClient = ({ user }: HeaderClientProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const onSearchModalClose = () => {
    setIsSearchModalOpen(false);
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
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
          <SearchButton handleSearchClick={handleSearchClick} />
          {avatarUrl ? (
            <>
              <Button asChild size="xs">
                <Link href="/posts">
                  <Plus />
                  投稿する
                </Link>
              </Button>
              <UserAvatarMenu
                avatarUrl={avatarUrl}
                name={user?.user_metadata?.name ?? ""}
                email={user?.email ?? ""}
                id={user?.id ?? ""}
              />
            </>
          ) : (
            <>
              <Button onClick={handleLoginClick} size="xs">
                <Plus />
                投稿する
              </Button>
              <Button onClick={handleLoginClick} variant="outline" size="xs">
                ログイン
              </Button>
            </>
          )}
        </div>
      </div>
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        onAuthModalClose={onAuthModalClose}
      />
      <SearchModal
        isSearchModalOpen={isSearchModalOpen}
        onSearchModalClose={onSearchModalClose}
      />
    </header>
  );
};

export default HeaderClient;
