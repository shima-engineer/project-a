"use client";

import { ImageOff, Globe } from "lucide-react";
import ProfileEditButton from "./ProfileEditButton";
import ProfileEditModal from "./ProfileEditModal";
import { useState } from "react";
import { ProfileUser } from "./queries/getUserById";
import Image from "next/image";

const ProfileHeader = ({
  profileUser,
  isOwner,
}: {
  profileUser: ProfileUser;
  isOwner: boolean;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const websiteName = profileUser.website_url
    ? new URL(profileUser.website_url).hostname
    : null;

  const githubName = profileUser.github_url
    ? new URL(profileUser.github_url).pathname.split("/").filter(Boolean)[0]
    : null;

  const xName = profileUser.x_url
    ? new URL(profileUser.x_url).pathname.split("/").filter(Boolean)[0]
    : null;

  return (
    <div className="">
      <div className="h-28 sm:h-40 rounded-2xl bg-linear-to-br from-hero-start to-hero-end "></div>
      <div className="flex flex-col mb-4 sm:flex-row sm:items-end md:justify-between gap-4 -mt-10 sm:-mt-14 px-2 sm:px-6">
        <div className="sm:flex sm:items-end sm:gap-4">
          {profileUser?.avatar_url ? (
            <Image
              src={profileUser.avatar_url}
              alt="Profile Image"
              className="size-24 sm:size-32 rounded-2xl ring-4 ring-background bg-card shrink-0 mb-4 md:mb-0"
              width={128}
              height={128}
            />
          ) : (
            <ImageOff className="size-24 sm:size-32 rounded-2xl ring-4 ring-background bg-card shrink-0 mb-4 md:mb-0" />
          )}
          <div>
            <h1 className="text-2xl font-bold truncate">
              {profileUser?.name ?? "名前未設定"}
            </h1>
            <p className="text-sm text-muted-foreground">
              @{profileUser?.id ?? "unknown"}
            </p>
          </div>
        </div>
        {isOwner && <ProfileEditButton handleEditClick={handleEditClick} />}
      </div>
      {profileUser?.bio && (
        <p className="text-sm leading-relaxed max-w-2xl whitespace-pre-wrap">
          {profileUser.bio}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
        {profileUser.website_url && (
          <a
            href={profileUser.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors break-all"
          >
            <Globe className="size-4" />
            <span>{websiteName}</span>
          </a>
        )}

        {profileUser.github_url && (
          <a
            href={profileUser.github_url}
            target="_blank"
            rel="noopener noreferrer"
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
            <span>{githubName}</span>
          </a>
        )}

        {profileUser.x_url && (
          <a
            href={profileUser.x_url}
            target="_blank"
            rel="noopener noreferrer"
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
            <span>{xName}</span>
          </a>
        )}
      </div>
      {isOwner && (
        <ProfileEditModal
          isEditModalOpen={isEditModalOpen}
          onEditModalClose={onEditModalClose}
          profileUser={profileUser}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
