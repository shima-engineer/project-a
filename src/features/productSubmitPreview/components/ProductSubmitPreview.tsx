"use client";
import { useState } from "react";
import ProductPreviewButton from "./ProductPreviewButton";
import ProductPreviewModal from "./ProductPreviewModal";

const ProductSubmitPreview = () => {
  const [isProductPreviewModalOpen, setIsProductPreviewModalOpen] =
    useState(false);

  const handleProductPreviewModalClose = () => {
    setIsProductPreviewModalOpen(false);
  };

  const handleProductPreviewButtonClick = () => {
    setIsProductPreviewModalOpen(true);
  };

  return (
    <>
      <ProductPreviewButton
        handleProductPreviewButtonClick={handleProductPreviewButtonClick}
      />
      <ProductPreviewModal
        isProductPreviewModalOpen={isProductPreviewModalOpen}
        handleProductPreviewModalClose={handleProductPreviewModalClose}
      />
    </>
  );
};

export default ProductSubmitPreview;
