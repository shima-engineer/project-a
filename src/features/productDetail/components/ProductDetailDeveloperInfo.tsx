const ProductDetailDeveloperInfo = () => {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-sm font-semibold mb-3">プロダクト情報</h3>
      <dl className="text-sm space-y-3">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">価格</dt>
          <dd className="font-medium">Freemium</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">カテゴリー</dt>
          <dd className="font-medium">AI ツール</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">アップボート</dt>
          <dd className="font-medium">1,248</dd>
        </div>
      </dl>
    </div>
  );
};

export default ProductDetailDeveloperInfo;
