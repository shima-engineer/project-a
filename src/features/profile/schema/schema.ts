import { z } from "zod";
import {
  MAX_AVATAR_SIZE_BYTES,
  MAX_AVATAR_SIZE_MB,
  DISPLAY_NAME_MAX_LENGTH,
  BIO_MAX_LENGTH,
  WEBSITE_MAX_LENGTH,
  GITHUB_URL_MAX_LENGTH,
  X_URL_MAX_LENGTH,
} from "../constants";

export const profileEditFormSchema = z.object({
  avatar: z
    .file()
    .max(MAX_AVATAR_SIZE_BYTES, {
      error: `アバター画像は${MAX_AVATAR_SIZE_MB}MB以下にしてください。`,
    })
    .mime(["image/png", "image/jpeg"], {
      error: "アバター画像はPNG、JPG形式でアップロードしてください。",
    })
    .optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: "表示名は必須です。" })
    .max(DISPLAY_NAME_MAX_LENGTH, {
      message: `${DISPLAY_NAME_MAX_LENGTH}文字以内で入力してください。`,
    }),
  bio: z
    .string()
    .trim()
    .max(BIO_MAX_LENGTH, {
      message: `${BIO_MAX_LENGTH}文字以内で入力してください。`,
    })
    .optional(),
  website: z
    .string()
    .trim()
    .max(WEBSITE_MAX_LENGTH, {
      error: `最大${WEBSITE_MAX_LENGTH}文字以内で入力してください。`,
    })
    .refine((value) => value === "" || z.httpUrl().safeParse(value).success, {
      error: "有効なURLを入力してください。",
    }),
  githubURL: z
    .string()
    .trim()
    .max(GITHUB_URL_MAX_LENGTH, {
      error: `最大${GITHUB_URL_MAX_LENGTH}文字以内で入力してください。`,
    })
    .refine(
      (value) =>
        value === "" ||
        z
          .url({
            protocol: /^https?$/,
            hostname: /^github\.com$/i,
          })
          .safeParse(value).success,
      {
        error: "有効なGitHubのURLを入力してください。",
      },
    ),
  XURL: z
    .string()
    .trim()
    .max(X_URL_MAX_LENGTH, {
      error: `最大${X_URL_MAX_LENGTH}文字以内で入力してください。`,
    })
    .refine(
      (value) =>
        value === "" ||
        z
          .url({
            protocol: /^https?$/,
            hostname: /^(x\.com|twitter\.com)$/i,
          })
          .safeParse(value).success,
      {
        error: "有効なXのURLを入力してください。",
      },
    ),
});

export type ProfileEditFormValues = z.infer<typeof profileEditFormSchema>;
