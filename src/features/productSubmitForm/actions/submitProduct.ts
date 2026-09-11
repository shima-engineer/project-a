"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

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

  const category = await prisma.categories.findUnique({
    where: {
      name: submitData.category,
    },
  });

  if (!category) {
    throw new Error("カテゴリーが見つかりません。");
  }

  const slug = crypto.randomUUID();

  const thumbnailPath = `${user.id}/${crypto.randomUUID()}-${submitData.thumbnail.name}`;

  const { error: thumbnailUploadError } = await supabase.storage
    .from("product-images")
    .upload(thumbnailPath, submitData.thumbnail, {
      contentType: submitData.thumbnail.type,
      upsert: false,
    });

  const {
    data: { publicUrl: thumbnailUrl },
  } = supabase.storage.from("product-images").getPublicUrl(thumbnailPath);

  if (thumbnailUploadError) {
    throw new Error("サムネイル画像のアップロードに失敗しました。");
  }

  const product = await prisma.products.create({
    data: {
      user_id: user.id,
      name: submitData.name,
      slug,
      url: submitData.url,
      category_id: category.id,
      tagline: submitData.tagline,
      description: submitData.description,
      features: submitData.features,
      thumbnail_url: thumbnailUrl,
      pricing_type: submitData.pricingType,
    },
  });

  console.log(product);
};
