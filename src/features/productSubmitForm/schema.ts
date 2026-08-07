import { z } from "zod";
import { PRODUCT_CATEGORIES } from "./constants";

export const productSubmitFormSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(1, { message: "プロダクト名は必須です。" })
    .max(40, { message: "40文字以内で入力してください。" }),
  productTagline: z
    .string()
    .trim()
    .min(1, { message: "タグラインは必須です。" })
    .max(60, { message: "60文字以内で入力してください。" }),
  productWebsite: z.string().check(
    z.trim(),
    z.minLength(1, "プロダクトURLを入力してください。"),
    z.url({
      protocol: /^https?$/,
      hostname: z.regexes.domain,
      error: "有効なURLを入力してください。",
    }),
  ),
  productCategory: z.enum(PRODUCT_CATEGORIES).refine((value) => value !== "", {
    message: "カテゴリーを選択してください。",
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

export type ProductSubmitFormValues = z.infer<typeof productSubmitFormSchema>;
