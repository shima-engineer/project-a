import type { ProductDetails } from "../queries/getProductDetails";
import Image from "next/image";

const ProductDetailScreenshots = ({
  productDetails,
}: {
  productDetails: ProductDetails;
}) => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {productDetails?.screenshots.map((screenshot) => (
        <div
          key={screenshot.id}
          className="relative aspect-video rounded-xl ring-1 ring-border overflow-hidden"
        >
          <Image
            src={screenshot.image_url}
            fill
            alt={`Screenshot ${screenshot.id}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </section>
  );
};

export default ProductDetailScreenshots;
