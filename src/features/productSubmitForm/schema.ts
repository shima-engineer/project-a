import { z } from "zod";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_TAGLINE_MAX_LENGTH,
} from "./constants";

export const productSubmitFormSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(1, { message: "プロダクト名は必須です。" })
    .max(PRODUCT_NAME_MAX_LENGTH, {
      message: "40文字以内で入力してください。",
    }),
  productTagline: z
    .string()
    .trim()
    .min(1, { message: "タグラインは必須です。" })
    .max(PRODUCT_TAGLINE_MAX_LENGTH, {
      message: "60文字以内で入力してください。",
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
});

export type ProductSubmitFormInput = z.input<typeof productSubmitFormSchema>;

export type ProductSubmitFormValues = z.output<typeof productSubmitFormSchema>;
