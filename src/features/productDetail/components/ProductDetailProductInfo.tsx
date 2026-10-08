const ProductDetailProductInfo = () => {
  return (
    <section className="rounded-2xl border border-border p-5 flex items-center gap-4 justify-between">
      <div className="flex items-center gap-4">
        {/* TODO#23:Imageタグに書き換える */}
        <div className="size-14 rounded-full ring-2 ring-border"></div>
        <div>
          <p className="text-xs text-muted-foreground">メイカー</p>
          <p className="font-semibold hover:text-primary">佐藤 健</p>
          <p className="text-sm text-muted-foreground">@ken_sato</p>
        </div>
      </div>
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs">
        フォロー
      </button>
    </section>
  );
};

export default ProductDetailProductInfo;
