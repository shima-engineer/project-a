const ProductDetailCommentItem = () => {
  return (
    <div className="flex gap-4">
      {/* TODO#20:Imageタグに置き換えて動的にsrcを設定する */}
      <div className="size-9 shrink-0 rounded-full ring-1 ring-border bg-card"></div>
      <div className="flex-1">
        <div className="flex gap-2 text-sm">
          <p className="font-semibold">Kenta Aoki</p>
          <time className="text-muted-foreground">2時間前</time>
        </div>
        {/* TODO#20:コメントを動的に取得する */}
        <p className="mt-1 text-[15px] leading-relaxed">
          これは本当に革新的ですね！日本語特化という点が他のツールとの大きな差別化要因になっています。ベータ版から使っていますが、毎週改善されていて素晴らしいです。
        </p>
      </div>
    </div>
  );
};

export default ProductDetailCommentItem;
