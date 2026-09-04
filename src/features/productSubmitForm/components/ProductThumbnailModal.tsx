"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface ProductThumbnailModalProps {
  productThumbnailURL: string | null;
  isProductThumbnailModalOpen: boolean;
  onProductThumbnailModalClose: () => void;
}

const ProductThumbnailModal = ({
  productThumbnailURL,
  isProductThumbnailModalOpen,
  onProductThumbnailModalClose,
}: ProductThumbnailModalProps) => {
  return (
    <Dialog
      open={isProductThumbnailModalOpen}
      onOpenChange={onProductThumbnailModalClose}
    >
      <DialogContent className="p-8">
        <DialogTitle className="sr-only">サムネイル画像</DialogTitle>
        {productThumbnailURL && (
          <Image
            src={productThumbnailURL}
            alt="Product Thumbnail"
            width={600}
            height={600}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductThumbnailModal;
