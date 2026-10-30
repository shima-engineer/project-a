"use client";

import { useEffect, useRef } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import type { ProfileEditFormValues } from "./schema/schema";
import ErrorMessage from "@/app/components/elements/ErrorMessage";

const ProfileAvatarUpload = () => {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext<ProfileEditFormValues>();

  const imageRef = useRef<HTMLImageElement>(null);

  const avatar = useWatch({
    control,
    name: "avatar",
  });

  // 画像プレビューの生成・解放
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    if (!avatar) {
      image.removeAttribute("src");
      return;
    }

    const url = URL.createObjectURL(avatar);
    image.src = url;

    return () => {
      image.removeAttribute("src");
      URL.revokeObjectURL(url);
    };
  }, [avatar]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("avatar", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    e.target.value = "";
  };

  return (
    <>
      {/* Blob URLのプレビューはimgで表示 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        alt="プロフィール画像"
        width={64}
        height={64}
        className={`size-16 rounded-xl ring-1 ring-border bg-card object-cover ${
          avatar ? "" : "hidden"
        }`}
      />

      {!avatar && (
        <div className="size-16 rounded-xl ring-1 ring-border bg-card" />
      )}

      <div>
        <input
          type="file"
          id="avatar"
          accept="image/png,image/jpeg"
          className="sr-only"
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

      <ErrorMessage errorMessage={errors.avatar?.message || ""} />
    </>
  );
};

export default ProfileAvatarUpload;
