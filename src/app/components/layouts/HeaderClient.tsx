"use client";
import AuthModal from "@/features/modal/AuthModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import UserAvatarMenu from "./UserAvatarMenu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
    </header>
  );
};

export default HeaderClient;
