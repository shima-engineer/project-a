import ProductDetailPreview from "./ProductDetailPreview";
import ProductItemPreview from "./ProductItemPreview";

const ProductPreviewContent = ({ productThumbnailURL }: { productThumbnailURL: string | null }) => {
  return (
    <>
      <ProductItemPreview productThumbnailURL={productThumbnailURL} />
      <ProductDetailPreview productThumbnailURL={productThumbnailURL} />
    </>
  );
};

export default ProductPreviewContent;
