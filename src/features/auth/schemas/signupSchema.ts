import { z } from "zod";

export const signupSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, "表示名は2文字以上で入力してください")
      .max(30, "表示名は30文字以内で入力してください"),

    email: z.email("メールアドレスの形式が正しくありません"),

    password: z
      .string()
      .min(6, "パスワードは6文字以上で入力してください")
      .max(100, "パスワードは100文字以内で入力してください"),

    confirmPassword: z.string().min(1, "確認用パスワードを入力してください"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "パスワードが一致しません",
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
