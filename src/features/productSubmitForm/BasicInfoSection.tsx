const BasicInfoSection = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="mb-0.5 text-base font-semibold">基本情報</h2>
        <p className="text-xs text-muted-foreground">Basic Information</p>
      </div>
      <div className="mb-4">
        <label htmlFor="productName">
          <div className="flex items-center justify-left mb-1.5">
            <span className="text-sm font-medium">プロダクト名</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <div className="relative">
          <input
            type="text"
            id="productName"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            placeholder="例: Shibuya AI"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
            0/40
          </span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="productTagline">
          <div className="flex items-center justify-left mb-1.5">
            <span className="text-sm font-medium">タグライン</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <div className="relative">
          <input
            type="text"
            id="productTagline"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            placeholder="例: 日本語特化のAIライティングアシスタント"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
            0/60
          </span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="productWebsite">
          <div className="flex items-center justify-left mb-1.5">
            <span className="text-sm font-medium">Webサイト URL</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <input
          type="text"
          id="productWebsite"
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="例: https://shibuya-ai.com"
        />
      </div>
    </>
  );
};

export default BasicInfoSection;
