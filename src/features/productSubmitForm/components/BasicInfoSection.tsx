const BasicInfoSection = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="mb-0.5 text-base font-semibold">基本情報</h2>
        <p className="text-xs text-muted-foreground">Basic Information</p>
      </div>
      <div className="mb-4">
        <label htmlFor="productName" className="mb-1.5 block">
          <div className="flex items-center gap-1">
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
        <label htmlFor="productTagline" className="mb-1.5 block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">タグライン</span>
              <span className="text-primary">*</span>
            </div>
            <p className="text-xs text-muted-foreground">
              60文字以内、プロダクトを一言で。
            </p>
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
        <label htmlFor="productWebsite" className="mb-1.5 block">
          <div className="flex items-center gap-1">
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
      <div className="mb-4">
        <label htmlFor="productCategory" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">カテゴリー</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <select
          id="productCategory"
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option>AIツール</option>
          <option>SaaS</option>
          <option>Webアプリ</option>
          <option>ネイティブアプリ</option>
          <option>Developer Tools</option>
          <option>生産性</option>
          <option>デザイン</option>
          <option>マーケティング</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="productTag" className="mb-1.5 block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">タグ</span>
              <span className="text-primary">*</span>
            </div>
            <p className="text-xs text-muted-foreground">
              最大5つ。Enterで追加
            </p>
          </div>
        </label>
        <input
          type="text"
          id="productTag"
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          placeholder="AI, SaaS, Indie…"
        />
      </div>
    </>
  );
};

export default BasicInfoSection;
