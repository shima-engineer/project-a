"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { profileEditFormSchema, ProfileEditFormValues } from "../schema/schema";

type ProfileEditResult =
  | {
      success: true;
      profileId: string;
    }
  | {
      success: false;
      message: string;
    };

export const submitProfile = async (
  data: ProfileEditFormValues,
): Promise<ProfileEditResult> => {
  let uploadedAvatarPath: string | undefined;

  try {
    const supabase = await createClient();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "ログインが必要です",
      };
    }

    // プロフィールのバリデーション
    const parsed = profileEditFormSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "入力内容が不正です。",
      };
    }

    let avatarUrl: string | undefined;

    if (parsed.data.avatar) {
      // 拡張子を取得
      const avatarExtension = parsed.data.avatar.name.split(".").pop();
      // 格納先のパスを指定
      const avatarPath = `${currentUser.id}/${crypto.randomUUID()}.${avatarExtension}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(avatarPath, parsed.data.avatar, {
          contentType: parsed.data.avatar.type,
          upsert: false,
        });

      if (error) {
        return {
          success: false,
          message: "アバター画像のアップロードに失敗しました。",
        };
      }

      // アップロードに成功した場合のみ保持
      uploadedAvatarPath = avatarPath;

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(avatarPath);

      avatarUrl = publicUrlData.publicUrl;
    }

    const profile = await prisma.public_users.update({
      where: {
        id: currentUser.id,
      },
      data: {
        ...(avatarUrl !== undefined && { avatar_url: avatarUrl }),
        username: parsed.data.displayName,
        bio: parsed.data.bio,
        website_url: parsed.data.websiteURL,
        github_url: parsed.data.githubURL,
        x_url: parsed.data.XURL,
      },
    });

    // DB更新成功後は削除対象から外す
    uploadedAvatarPath = undefined;

    revalidatePath(`/users/${currentUser.id}`);

    return {
      success: true,
      profileId: profile.id,
    };
  } catch (error) {
    console.error(error);
    if (uploadedAvatarPath) {
      try {
        const supabase = await createClient();

        const { error: removeError } = await supabase.storage
          .from("avatars")
          .remove([uploadedAvatarPath]);

        if (removeError) {
          console.error("アバター画像の削除に失敗:", removeError);
        }
      } catch (removeError) {
        console.error("アバター画像の削除処理に失敗:", removeError);
      }
    }

    return {
      success: false,
      message: "プロフィールの更新に失敗しました",
    };
  }
};
