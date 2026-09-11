"use server";

import { createClient } from "@/lib/supabase/server";
import { ProductSubmitFormValues } from "../schema";
import { convertProductSubmitFormToData } from "../utils/convertProductSubmitFormToData";

export const submitProduct = async (data: ProductSubmitFormValues) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("ログインが必要です。");
  }

  const submitData = convertProductSubmitFormToData(data);

  console.log({
    userId: user.id,
    submitData,
  });
};
