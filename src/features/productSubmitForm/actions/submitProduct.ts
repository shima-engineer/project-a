"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

import { ProductSubmitFormValues } from "../schema";

type SubmitProductResult =
  | {
      success: true;
      productId: string;
    }
  | {
      success: false;
      message: string;
    };

export const submitProduct = async (
  data: ProductSubmitFormValues,
): Promise<SubmitProductResult> => {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return {
        success: false,
        message: "ログインが必要です。",
      };
    }

    const slug = crypto.randomUUID();

    const category = await prisma.categories.findUnique({
      where: {
        name: data.productCategory,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "カテゴリーが見つかりません。",
      };
    }

    const thumbnailExtension = data.productThumbnail.name.split(".").pop();

    const thumbnailPath = `${user.id}/${crypto.randomUUID()}.${thumbnailExtension}`;

    const { error: thumbnailUploadError } = await supabase.storage
      .from("thumbnails")
      .upload(thumbnailPath, data.productThumbnail, {
        contentType: data.productThumbnail.type,
        upsert: false,
      });

    if (thumbnailUploadError) {
      console.error("サムネイルアップロードエラー:", thumbnailUploadError);

      return {
        success: false,
        message: "サムネイル画像のアップロードに失敗しました。",
      };
    }

    const {
      data: { publicUrl: thumbnailUrl },
    } = supabase.storage.from("thumbnails").getPublicUrl(thumbnailPath);

    const screenshotPaths = (data.productScreenshots ?? []).map(
      (screenshot) => {
        const extension = screenshot.name.split(".").pop();

        return {
          file: screenshot,
          path: `${user.id}/screenshots/${crypto.randomUUID()}.${extension}`,
        };
      },
    );

    for (const screenshot of screenshotPaths) {
      const { error } = await supabase.storage
        .from("screenshots")
        .upload(screenshot.path, screenshot.file, {
          contentType: screenshot.file.type,
          upsert: false,
        });

      if (error) {
        console.error("スクリーンショットアップロードエラー:", error);
        await supabase.storage.from("thumbnails").remove([thumbnailPath]);
        await supabase.storage
          .from("screenshots")
          .remove(screenshotPaths.map(({ path }) => path));

        return {
          success: false,
          message: "スクリーンショットのアップロードに失敗しました。",
        };
      }
    }

    const screenshotUrls = screenshotPaths.map(({ path }) => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("screenshots").getPublicUrl(path);

      return publicUrl;
    });

    try {
      const allProduct = await prisma.$transaction(async (tx) => {
        const product = await tx.products.create({
          data: {
            user_id: user.id,
            slug,
            name: data.productName,
            tagline: data.productTagline,
            url: data.productWebsite,
            category_id: category.id,
            description: data.productDescription,
            features: data.productFeatures,
            pricing_type: data.productPricingType,
            thumbnail_url: thumbnailUrl,
          },
        });

        for (const tagName of data.productTags) {
          const tag = await tx.tags.upsert({
            where: {
              name: tagName,
            },
            update: {},
            create: {
              name: tagName,
              slug: crypto.randomUUID(),
            },
          });

          await tx.product_tags.create({
            data: {
              product_id: product.id,
              tag_id: tag.id,
            },
          });
        }

        for (const technology of data.productTechnologies) {
          const techStack = await tx.tech_stacks.upsert({
            where: {
              name: technology,
            },
            update: {},
            create: {
              name: technology,
              slug: crypto.randomUUID(),
            },
          });

          await tx.product_tech_stacks.create({
            data: {
              product_id: product.id,
              stack_id: techStack.id,
            },
          });
        }

        await tx.screenshots.createMany({
          data: screenshotUrls.map((imageUrl, index) => ({
            product_id: product.id,
            image_url: imageUrl,
            sort_order: index,
          })),
        });

        return product;
      });
      return {
        success: true,
        productId: allProduct.id,
      };
    } catch (error) {
      console.error("トランザクションエラー:", error);
      // サムネイル削除
      const { error: thumbnailDeleteError } = await supabase.storage
        .from("thumbnails")
        .remove([thumbnailPath]);

      if (thumbnailDeleteError) {
        console.error("サムネイル削除エラー:", thumbnailDeleteError);
      }

      // スクリーンショット削除
      const { error: screenshotDeleteError } = await supabase.storage
        .from("screenshots")
        .remove(screenshotPaths.map(({ path }) => path));

      if (screenshotDeleteError) {
        console.error("スクリーンショット削除エラー:", screenshotDeleteError);
      }

      return {
        success: false,
        message: "プロダクトの投稿に失敗しました。",
      };
    }
  } catch (error) {
    console.error("予期しないプロダクト投稿エラー:", error);

    return {
      success: false,
      message: "プロダクトの投稿に失敗しました。",
    };
  }
};
