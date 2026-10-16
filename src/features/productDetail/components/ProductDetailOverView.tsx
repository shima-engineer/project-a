import type { ProductDetails } from "../queries/getProductDetails";

const ProductDetailOverview = ({
  productDetails,
}: {
  productDetails: ProductDetails;
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">概要</h2>
      <p className="text-[15px] text-foreground/90 leading-relaxed whitespace-pre-line mb-6">
        {productDetails?.description ?? ""}
      </p>
      <p className="text-[15px] text-foreground/90 leading-relaxed whitespace-pre-line">
        {productDetails?.features ?? ""}
      </p>
    </div>
  );
};

export default ProductDetailOverview;
