import Image from "next/image";

const MediaSection = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="mb-0.5 text-base font-semibold">TODO#12メディア</h2>
        <p className="text-xs text-muted-foreground">Media</p>
      </div>
      <div className="mb-4">
        <label htmlFor="productThumbnail" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">サムネイル</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <label htmlFor="productThumbnail" className="cursor-pointer">
          <input type="file" id="productThumbnail" className="sr-only" />
          <div className="flex items-center gap-4 rounded-xl border-2 border-dashed border-border p-5 hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
            <div className="size-16 rounded-xl bg-secondary grid place-items-center">
              <Image src="/upload-icon.svg" alt="" width={24} height={24} />
            </div>
            <div className="text-sm">
              <p className="">クリックしてアップロード</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                PNG, JPG, SVG · 推奨 240×240px · 最大 2MB
              </p>
            </div>
          </div>
        </label>
      </div>
      {/* TODO#12:画像アップロードのUIが三つあるが、一つでいいか検討すること */}
      <div className="mb-4">
        <label htmlFor="productScreenshot" className="mb-1.5 block">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">スクリーンショット</span>
            <p className="text-xs text-muted-foreground">
              最大6枚。ドラッグ&ドロップ対応。
            </p>
          </div>
        </label>
        <div className="grid grid-cols-3 gap-2">
          <label>
            <input type="file" id="productScreenshot1" className="sr-only" />
            <div className="aspect-video rounded-lg border-2 border-dashed border-border grid place-items-center text-muted-foreground hover:border-primary hover:bg-primary/5 cursor-pointer">
              <Image src="/upload-icon.svg" alt="" width={24} height={24} />
            </div>
          </label>
          <label>
            <input type="file" id="productScreenshot2" className="sr-only" />
            <div className="aspect-video rounded-lg border-2 border-dashed border-border grid place-items-center text-muted-foreground hover:border-primary hover:bg-primary/5 cursor-pointer">
              <Image src="/upload-icon.svg" alt="" width={24} height={24} />
            </div>
          </label>
          <label>
            <input type="file" id="productScreenshot3" className="sr-only" />
            <div className="aspect-video rounded-lg border-2 border-dashed border-border grid place-items-center text-muted-foreground hover:border-primary hover:bg-primary/5 cursor-pointer">
              <Image src="/upload-icon.svg" alt="" width={24} height={24} />
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default MediaSection;
