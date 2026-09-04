import { z } from "zod";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_TAGLINE_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_FEATURES_MAX_LENGTH,
  PRODUCT_TECHNOLOGY_MAX_LENGTH,
  PRICING_PLAN_VALUES,
  MAX_THUMBNAIL_SIZE_BYTES,
  MAX_THUMBNAIL_SIZE_MB,
  MAX_SCREENSHOT_SIZE_BYTES,
  MAX_SCREENSHOT_COUNT,
  MAX_SCREENSHOT_SIZE_MB,
} from "./constants";

export const productSubmitFormSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(1, { message: "プロダクト名は必須です。" })
    .max(PRODUCT_NAME_MAX_LENGTH, {
      message: `${PRODUCT_NAME_MAX_LENGTH}文字以内で入力してください。`,
    }),
  productTagline: z
    .string()
    .trim()
    .min(1, { message: "タグラインは必須です。" })
    .max(PRODUCT_TAGLINE_MAX_LENGTH, {
      message: `${PRODUCT_TAGLINE_MAX_LENGTH}文字以内で入力してください。`,
    }),
  // z.url()ではtrim()をチェーンできないため、先に文字列としてtrimする
  // See: https://github.com/colinhacks/zod/issues/4642
  productWebsite: z
    .string()
    .trim()
    .check(
      z
        .url({
          protocol: /^https?$/,
          hostname: z.regexes.domain,
          error: "有効なURLを入力してください。",
        })
        .min(1, { message: "プロダクトURLを入力してください。" }),
    ),
  productCategory: z
    .union([z.literal(""), z.enum(PRODUCT_CATEGORIES)])
    .transform((value, ctx) => {
      if (value === "") {
        ctx.addIssue({
          code: "custom",
          message: "カテゴリーを選択してください。",
        });

        return z.NEVER;
      }

      return value;
    }),
  productTags: z
    .array(
      z
        .string()
        .trim()
        .min(1, { message: "タグを入力してください。" })
        .max(20, { message: "タグは20文字以内で入力してください。" }),
    )
    .min(1, { message: "タグを1つ以上追加してください。" })
    .max(5, { message: "タグは最大5つまでです。" }),
  productDescription: z
    .string()
    .trim()
    .min(1, { message: "プロダクトの説明は必須です。" })
    .max(PRODUCT_DESCRIPTION_MAX_LENGTH, {
      message: `${PRODUCT_DESCRIPTION_MAX_LENGTH}文字以内で入力してください。`,
    }),
  productFeatures: z
    .string()
    .trim()
    .min(1, { message: "主な機能は必須です。" })
    .max(PRODUCT_FEATURES_MAX_LENGTH, {
      message: `${PRODUCT_FEATURES_MAX_LENGTH}文字以内で入力してください。`,
    }),
  productTechnology: z
    .string()
    .trim()
    .min(1, { message: "技術スタックは必須です。" })
    .max(PRODUCT_TECHNOLOGY_MAX_LENGTH, {
      message: `${PRODUCT_TECHNOLOGY_MAX_LENGTH}文字以内で入力してください。`,
    }),
  productPlans: z
    .union([z.literal(""), z.enum(PRICING_PLAN_VALUES)])
    .transform((value, ctx) => {
      if (value === "") {
        ctx.addIssue({
          code: "custom",
          message: "料金プランを選択してください。",
        });

        return z.NEVER;
      }

      return value;
    }),
  productThumbnail: z
    .file({
      error: "プロダクトのサムネイル画像をアップロードしてください。",
    })
    .max(MAX_THUMBNAIL_SIZE_BYTES, {
      error: `サムネイル画像は${MAX_THUMBNAIL_SIZE_MB}MB以下にしてください。`,
    })
    .mime(["image/png", "image/jpeg", "image/svg+xml"], {
      error: "サムネイル画像はPNG、JPG、SVG形式でアップロードしてください。",
    }),
  productScreenshots: z
    .array(
      z
        .file({
          error:
            "プロダクトのスクリーンショット画像をアップロードしてください。",
        })
        .max(MAX_SCREENSHOT_SIZE_BYTES, {
          error: `スクリーンショット画像は${MAX_SCREENSHOT_SIZE_MB}MB以下にしてください。`,
        })
        .mime(["image/png", "image/jpeg", "image/svg+xml"], {
          error:
            "スクリーンショット画像はPNG、JPG、SVG形式でアップロードしてください。",
        }),
    )
    .max(MAX_SCREENSHOT_COUNT, {
      message: `スクリーンショットは最大${MAX_SCREENSHOT_COUNT}枚までです。`,
    })
    .optional(),
});

export type ProductSubmitFormInput = z.input<typeof productSubmitFormSchema>;

export type ProductSubmitFormValues = z.output<typeof productSubmitFormSchema>;
