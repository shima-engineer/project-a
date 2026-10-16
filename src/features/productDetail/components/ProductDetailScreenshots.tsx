"use client";

import type { ProductDetails } from "../queries/getProductDetails";
import Image from "next/image";
import { useState } from "react";
import ProductScreenshotModal from "../../productSubmitForm/components/ProductScreenshotModal";

const ProductDetailScreenshots = ({
  productDetails,
}: {
  productDetails: ProductDetails;
}) => {
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<
    number | null
  >(null);
  const [isProductScreenshotModalOpen, setIsProductScreenshotModalOpen] =
    useState(false);

  const onProductScreenshotModalClose = () => {
    setIsProductScreenshotModalOpen(false);
    setSelectedScreenshotIndex(null);
  };

  const handleScreenshotClick = (index: number) => {
    setSelectedScreenshotIndex(index);
    setIsProductScreenshotModalOpen(true);
  };

  return (
    <>
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {productDetails?.screenshots.map((screenshot, index) => (
          <div
            key={screenshot.id}
            className="relative aspect-video rounded-xl ring-1 ring-border overflow-hidden"
          >
            <Image
              src={screenshot.image_url}
              onClick={() => handleScreenshotClick(index)}
              fill
              alt={`Screenshot ${screenshot.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </section>
      <ProductScreenshotModal
        productScreenshotURL={
          selectedScreenshotIndex !== null
            ? (productDetails?.screenshots[selectedScreenshotIndex]
                ?.image_url ?? "")
            : ""
        }
        isProductScreenshotModalOpen={isProductScreenshotModalOpen}
        onProductScreenshotModalClose={onProductScreenshotModalClose}
      />
    </>
  );
};

export default ProductDetailScreenshots;
