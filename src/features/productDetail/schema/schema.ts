import { z } from "zod";
import { COMMENT_MAX_LENGTH } from "../constants";

export const commentFormSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, { message: "1文字以上で入力してください。" })
    .max(COMMENT_MAX_LENGTH, {
      message: `${COMMENT_MAX_LENGTH}文字以内で入力してください。`,
    }),
});

export type CommentFormValues = z.infer<typeof commentFormSchema>;
