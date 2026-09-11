"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

import { ProductSubmitFormValues } from "../schema";

export const submitProduct = async (data: ProductSubmitFormValues) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("ログインが必要です。");
  }

  const category = await prisma.categories.findUnique({
    where: {
      name: data.productCategory,
    },
  });

  if (!category) {
    throw new Error("カテゴリーが見つかりません。");
  }

  const slug = crypto.randomUUID();

  const thumbnailPath = `${user.id}/${crypto.randomUUID()}-${data.productThumbnail.name}`;

  const { error: thumbnailUploadError } = await supabase.storage
    .from("product-images")
    .upload(thumbnailPath, data.productThumbnail, {
      contentType: data.productThumbnail.type,
      upsert: false,
    });

  if (thumbnailUploadError) {
    throw new Error("サムネイル画像のアップロードに失敗しました。");
  }

  const {
    data: { publicUrl: thumbnailUrl },
  } = supabase.storage.from("product-images").getPublicUrl(thumbnailPath);

  const screenshotPaths = (data.productScreenshots ?? []).map((screenshot) => {
    const extension = screenshot.name.split(".").pop();

    return {
      file: screenshot,
      path: `${user.id}/screenshots/${crypto.randomUUID()}.${extension}`,
    };
  });

  for (const screenshot of screenshotPaths) {
    const { error } = await supabase.storage
      .from("product-images")
      .upload(screenshot.path, screenshot.file, {
        contentType: screenshot.file.type,
        upsert: false,
      });

    if (error) {
      throw new Error("スクリーンショットのアップロードに失敗しました。");
    }
  }

  const screenshotUrls = screenshotPaths.map(({ path }) => {
    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(path);

    return publicUrl;
  });

  const product = await prisma.products.create({
    data: {
      user_id: user.id,
      name: data.productName,
      slug,
      url: data.productWebsite,
      category_id: category.id,
      tagline: data.productTagline,
      description: data.productDescription,
      features: data.productFeatures,
      thumbnail_url: thumbnailUrl,
      pricing_type: data.productPlans,
    },
  });

  for (const tagName of data.productTags) {
    const tag = await prisma.tags.upsert({
      where: {
        name: tagName,
      },
      update: {},
      create: {
        name: tagName,
        slug: crypto.randomUUID(),
      },
    });

    await prisma.product_tags.create({
      data: {
        product_id: product.id,
        tag_id: tag.id,
      },
    });
  }

  await prisma.screenshots.createMany({
    data: screenshotUrls.map((imageUrl, index) => ({
      product_id: product.id,
      image_url: imageUrl,
      sort_order: index,
    })),
  });

  console.log(product);
};
