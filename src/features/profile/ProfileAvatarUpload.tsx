"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ProfileEditFormValues } from "./schema/schema";
import Image from "next/image";
const ProfileAvatarUpload = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileEditFormValues>();

  const [avatarURL, setAvatarURL] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarURL(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {avatarURL ? (
        <Image
          src={avatarURL}
          alt="プロフィール画像"
          width={64}
          height={64}
          className="size-16 rounded-xl ring-1 ring-border bg-card object-cover"
        />
      ) : (
        <div className="size-16 rounded-xl ring-1 ring-border bg-card object-cover"></div>
      )}
      <div>
        <input
          type="file"
          id="avatar"
          accept="image/png,image/jpeg"
          className="sr-only"
          {...register("avatar")}
          onChange={handleAvatarChange}
        />
        <label
          htmlFor="avatar"
          className="inline-flex cursor-pointer items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors"
        >
          画像を変更
        </label>
        <p className="text-xs text-muted-foreground">5MB以下の画像</p>
      </div>
    </>
  );
};

export default ProfileAvatarUpload;
