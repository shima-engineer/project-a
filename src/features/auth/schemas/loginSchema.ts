import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("メールアドレスの形式が正しくありません"),
  password: z.string().min(6, "パスワードは6文字以上で入力してください"),
});
