"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface ProductScreenshotModalProps {
  productScreenshotURL: string;
  isProductScreenshotModalOpen: boolean;
  onProductScreenshotModalClose: () => void;
}

const ProductScreenshotModal = ({
  productScreenshotURL,
  isProductScreenshotModalOpen,
  onProductScreenshotModalClose,
}: ProductScreenshotModalProps) => {
  return (
    <Dialog
      open={isProductScreenshotModalOpen}
      onOpenChange={onProductScreenshotModalClose}
    >
      <DialogContent className="p-8">
        <DialogTitle className="sr-only">スクリーンショット画像</DialogTitle>
        {productScreenshotURL && (
          <Image
            src={productScreenshotURL}
            alt="Product Screenshot"
            width={600}
            height={600}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductScreenshotModal;
