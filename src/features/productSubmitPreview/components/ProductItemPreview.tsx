"use client";
import { useEffect, useMemo } from "react";

import Image from "next/image";
import ProductUpvoteButtonPreview from "./ProductUpvoteButtonPreview";
import { useFormContext, useWatch } from "react-hook-form";
import { ProductSubmitFormValues } from "@/features/productSubmitForm/schema";

const ProductItemPreview = () => {
  const { control } = useFormContext<ProductSubmitFormValues>();

  const productThumbnail = useWatch({
    control,
    name: "productThumbnail",
  });

  const productName = useWatch({
    control,
    name: "productName",
  });

  const productTagline = useWatch({
    control,
    name: "productTagline",
  });

  const productCategory = useWatch({
    control,
    name: "productCategory",
  });

  const productThumbnailURL = useMemo(() => {
    if (!productThumbnail) return null;

    return URL.createObjectURL(productThumbnail);
  }, [productThumbnail]);

  useEffect(() => {
    return () => {
      if (productThumbnailURL) {
        URL.revokeObjectURL(productThumbnailURL);
      }
    };
  }, [productThumbnailURL]);

  return (
    <>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
        フィードカード
      </p>
      <div className="rounded-2xl border border-border p-2 mb-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 group/list">
          <div>
            <div className="flex items-center gap-3 sm:gap-4">
              {productThumbnailURL ? (
                <div className="size-16 rounded-xl ring-1 ring-border overflow-hidden bg-secondary grid place-items-center text-muted-foreground">
                  <Image
                    src={productThumbnailURL}
                    alt=""
                    width={64}
                    height={64}
                    className="size-full w-full h-full"
                  />
                </div>
              ) : (
                <div className="size-16 shrink-0 rounded-xl ring-1 ring-border overflow-hidden bg-secondary grid place-items-center text-muted-foreground">
                  <span className="text-xs">画像</span>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-[15px] group-hover/list:text-primary duration-200 transition-colors">
                  {productName || "プロダクト名"}
                </h3>
                <p className="text-sm text-muted-foreground mb-1.5">
                  {productTagline || "タグラインがここに表示されます"}
                </p>
                <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/comment-icon.png"
                      alt=""
                      width={12}
                      height={12}
                    />
                    <span>0</span>
                  </div>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                    {productCategory || "カテゴリ名"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ProductUpvoteButtonPreview size="md" />
        </div>
      </div>
    </>
  );
};

export default ProductItemPreview;
