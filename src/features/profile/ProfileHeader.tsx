"use client";

import { ImageOff, Globe } from "lucide-react";
import ProfileEditButton from "./ProfileEditButton";
import Link from "next/link";
import ProfileEditModal from "./ProfileEditModal";
import { useState } from "react";

const ProfileHeader = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  return (
    <div className="">
      <div className="h-28 sm:h-40 rounded-2xl bg-linear-to-br from-hero-start to-hero-end "></div>
      <div className="flex flex-col mb-4 sm:flex-row sm:items-end md:justify-between gap-4 -mt-10 sm:-mt-14 px-2 sm:px-6">
        <div className="sm:flex sm:items-end sm:gap-4">
          {/* TODO:#22実際の画像に置き換える */}
          <ImageOff className="size-24 sm:size-32 rounded-2xl ring-4 ring-background bg-card shrink-0 mb-4 md:mb-0" />
          <div>
            {/* TODO:#22 実際のユーザー名とIDに置き換える */}
            <h1 className="text-2xl font-bold truncate">佐藤 健</h1>
            <p className="text-sm text-muted-foreground">
              @f73c7e0f-b480-409c-8fe2-55901b0d7ca9
            </p>
          </div>
        </div>
        <ProfileEditButton handleEditClick={handleEditClick} />
      </div>
      <p className="text-sm leading-relaxed max-w-2xl whitespace-pre-wrap">
        東京を拠点に活動するインディーハッカー。AI
        と日本語の交差点で面白いものを作っています。3つのSaaSをブートストラップ運営中。
      </p>
      {/* TODO:#22 実際のリンクに置き換える */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <Link
          href=""
          target="_blank"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors break-all"
        >
          <Globe className="size-4 mr-1" />
          <span>ken-sato.dev</span>
        </Link>
        <Link
          href=""
          target="_blank"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors break-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-github size-4 shrink-0"
            aria-hidden="true"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          </svg>
          <span>@kensato</span>
        </Link>
        <Link
          href=""
          target="_blank"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors break-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-twitter size-4 shrink-0"
            aria-hidden="true"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
          <span>@kensato</span>
        </Link>
      </div>
      <ProfileEditModal
        isEditModalOpen={isEditModalOpen}
        onEditModalClose={onEditModalClose}
      />
    </div>
  );
};

export default ProfileHeader;
