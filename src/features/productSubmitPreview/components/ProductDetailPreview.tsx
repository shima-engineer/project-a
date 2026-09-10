"use client";

import ProductUpvoteButtonPreview from "./ProductUpvoteButtonPreview";
import { useFormContext, useWatch } from "react-hook-form";
import { ProductSubmitFormValues } from "@/features/productSubmitForm/schema";

const ProductDetailPreview = () => {
  const { control } = useFormContext<ProductSubmitFormValues>();

  const productName = useWatch({
    control,
    name: "productName",
  });

  const productTagline = useWatch({
    control,
    name: "productTagline",
  });

  const productDescription = useWatch({
    control,
    name: "productDescription",
  });

  const productFeatures = useWatch({
    control,
    name: "productFeatures",
  });

  const productTags =
    useWatch({
      control,
      name: "productTags",
    }) ?? [];

  const productTechnologies =
    useWatch({
      control,
      name: "productTechnologies",
    }) ?? [];

  const productCategory = useWatch({
    control,
    name: "productCategory",
  });

  return (
    <>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
        プロダクト詳細ページ
      </p>
      <div className="rounded-2xl border border-border p-5 mb-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-7">
          <div className="cursor-pointer">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="size-16 rounded-xl ring-1 ring-border bg-secondary overflow-hidden grid place-items-center text-xs text-muted-foreground">
                <span className="text-xs">画像</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-muted-foreground">
                  AI ツール
                </span>
                <h3 className="text-lg font-bold leading-tight">
                  {productName || "プロダクト名"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {productTagline || "タグラインがここに表示されます"}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                  {productTags.length > 0 ? (
                    productTags.map((tag) => (
                      <span
                        className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                      タグ
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ProductUpvoteButtonPreview size="sm" />
        </div>
        <div className="flex gap-2 mb-4">
          <button className="inline-flex items-center gap-1.5 h-8 rounded-md bg-primary text-primary-foreground px-3 text-xs font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-external-link-icon lucide-external-link text-white"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
            <span>Webサイトを訪問</span>
          </button>
          <button className="h-8 rounded-md border border-border px-3 text-xs">
            保存
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="aspect-video rounded-lg ring-1 ring-border overflow-hidden bg-secondary grid place-items-center">
            <span className="text-[10px] text-muted-foreground">SS</span>
          </div>
          <div className="aspect-video rounded-lg ring-1 ring-border overflow-hidden bg-secondary grid place-items-center">
            <span className="text-[10px] text-muted-foreground">SS</span>
          </div>
          <div className="aspect-video rounded-lg ring-1 ring-border overflow-hidden bg-secondary grid place-items-center">
            <span className="text-[10px] text-muted-foreground">SS</span>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-base font-bold mb-2">概要</h4>
          <p className="text-[13px] text-foreground/80 line-clamp-4 whitespace-pre-line">
            {productDescription ||
              "説明文がここに表示されます。プロダクトが解決する問題、独自の特徴をユーザーに伝えましょう。"}
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-base font-bold mb-2">主な機能</h4>
          <p className="text-[13px] text-foreground/80 line-clamp-4 whitespace-pre-line">
            {productFeatures || "主な機能がここに表示されます"}
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-base font-bold mb-2">技術スタック</h4>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
            {productTechnologies.length > 0 ? (
              productTechnologies.map((tag) => (
                <span
                  className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium"
                  key={tag}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                技術スタック
              </span>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-border p-4 flex items-center gap-3 mb-4">
          <div className="size-11 rounded-full bg-secondary ring-2 ring-border grid place-items-center text-[10px] text-muted-foreground">
            YOU
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-muted-foreground">メイカー</div>
            <div className="text-sm font-semibold">あなた</div>
          </div>
          <button className="h-8 rounded-md border border-border px-3 text-xs font-medium">
            フォロー
          </button>
        </div>

        <div className="rounded-xl border border-border p-4 bg-card">
          <div className="text-xs font-semibold mb-2.5">プロダクト情報</div>
          <dl className="text-xs space-y-2">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">価格</dt>
              <dd className="font-medium">Paid</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">カテゴリー</dt>
              <dd className="font-medium">AI ツール</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">アップボート</dt>
              <dd className="font-medium tabular-nums">1</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPreview;
