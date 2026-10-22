import type { ProductDetails } from "../queries/getProductDetails";

const ProductDetailProductInfo = ({
  productDetails,
}: {
  productDetails: ProductDetails;
}) => {
  console.log(productDetails);
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start p-4 border rounded-lg lg:w-80">
      <h3 className="text-sm font-semibold mb-3">プロダクト情報</h3>
      <dl className="text-sm space-y-3">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">価格</dt>
          <dd className="font-medium">
            {productDetails?.pricing_type ?? "未設定"}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">カテゴリー</dt>
          <dd className="font-medium">
            {productDetails?.categories?.name ?? "未設定"}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">アップボート</dt>
          <dd className="font-medium">{productDetails?.upvotes_count ?? 0}</dd>
        </div>
      </dl>
    </aside>
  );
};

export default ProductDetailProductInfo;
