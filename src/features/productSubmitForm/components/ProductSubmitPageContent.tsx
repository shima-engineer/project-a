"use client";

import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import ProductSubmitForm from "./ProductSubmitForm";
import ProductPreviewContent from "@/features/productSubmitPreview/components/ProductPreviewContent";
import ProductSubmitPreview from "@/features/productSubmitPreview/components/ProductSubmitPreview";
import { ProductSubmitFormValues } from "../schema";

interface ThumbnailPreview {
  file: File;
  url: string;
}

const ProductSubmitPageContent = () => {
  const { control } = useFormContext<ProductSubmitFormValues>();

  const productThumbnail = useWatch({
    control,
    name: "productThumbnail",
  });

  const [thumbnailPreview, setThumbnailPreview] =
    useState<ThumbnailPreview | null>(null);

  useEffect(() => {
    if (!productThumbnail) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") return;

      setThumbnailPreview({
        file: productThumbnail,
        url: reader.result,
      });
    };

    reader.readAsDataURL(productThumbnail);

    return () => {
      if (reader.readyState === FileReader.LOADING) {
        reader.abort();
      }
    };
  }, [productThumbnail]);

  const productThumbnailURL =
    thumbnailPreview && thumbnailPreview.file === productThumbnail
      ? thumbnailPreview.url
      : null;

  return (
    <main className="flex-1 grid md:grid-cols-2 max-w-400 mx-auto w-full">
      <div className="px-4 sm:px-8 md:px-12 py-8 md:py-10 w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">プロダクトを投稿する</h1>

          <p className="text-sm text-muted-foreground md:hidden">
            右下の「プレビュー」ボタンで投稿後の見え方を確認できます。
          </p>
        </div>

        <ProductSubmitForm />

        <div className="md:hidden">
          <ProductSubmitPreview productThumbnailURL={productThumbnailURL} />
        </div>
      </div>

      <div className="hidden md:block border-l border-border">
        <div className="text-left px-8 py-3 border-b border-border">
          <p className="text-sm font-semibold">TODO#14投稿後のプレビュー</p>

          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            LIVE PREVIEW
          </p>
        </div>

        <div className="px-8 py-8 space-y-8">
          <ProductPreviewContent productThumbnailURL={productThumbnailURL} />
        </div>
      </div>
    </main>
  );
};

export default ProductSubmitPageContent;
