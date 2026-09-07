import ProductUpvoteButtonPreview from "./ProductUpvoteButtonPreview";

const ProductDetailPreview = ({ productThumbnailURL }: { productThumbnailURL: string | null }) => {
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
              <div>
                <span className="text-[11px] text-muted-foreground">
                  AI ツール
                </span>
                <h3 className="text-lg font-bold leading-tight">
                  プロダクト名
                </h3>
                <p className="text-sm text-muted-foreground">タグライン</p>
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
            <span>訪問</span>
          </button>
          <button className="h-8 rounded-md border border-border px-3 text-xs">
            保存
          </button>
        </div>
        <p className="text-[13px] text-foreground/80 line-clamp-4 whitespace-pre-line">
          説明文がここに表示されます。プロダクトが解決する問題、独自の特徴をユーザーに伝えましょう。
        </p>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
          <span className="text-muted-foreground">価格</span>
          <span className="font-medium">Freemium</span>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPreview;
