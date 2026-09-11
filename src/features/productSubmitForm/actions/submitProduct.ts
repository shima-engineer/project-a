"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

import { ProductSubmitFormValues } from "../schema";
import { convertProductSubmitFormToData } from "../utils/convertProductSubmitFormToData";
import { generateProductSlug } from "../utils/generateProductSlug";

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

  const category = await prisma.categories.findUnique({
    where: {
      name: submitData.category,
    },
  });

  if (!category) {
    throw new Error("カテゴリーが見つかりません。");
  }

  const slug = generateProductSlug(submitData.name);

  console.log({
    userId: user.id,
    categoryId: category.id,
    slug,
    submitData,
  });
};
