import Image from "next/image";
import ProductUpvoteButtonPreview from "./ProductUpvoteButtonPreview";

const ProductItemPreview = () => {
  return (
    <>
    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">フィードカード</p>
    <div className="rounded-2xl border border-border p-2 mb-3">
      <div className="flex items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 group/list">
        <div className="cursor-pointer">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="size-14 shrink-0 rounded-xl ring-1 ring-border overflow-hidden bg-secondary grid place-items-center text-muted-foreground">
              <span className="text-xs">画像</span>
            </div>
            <div>
              <h3 className="font-semibold text-[15px] group-hover/list:text-primary duration-200 transition-colors">
                プロダクト名
              </h3>
              <p className="text-sm text-muted-foreground mb-1.5">
                タグラインがここに表示されます
              </p>
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Image
                    src="/comment-icon.png"
                    alt=""
                    width={12}
                    height={12}
                  />
                  <span className="">0</span>
                </div>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">
                  カテゴリ名
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
