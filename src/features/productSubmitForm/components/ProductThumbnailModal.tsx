"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface ProductThumbnailModalProps {
  productThumbnailURL: string;
  isProductThumnailModalOpen: boolean;
  onProductThumnailModalClose: () => void;
}

const ProductThumbnailModal = ({
  productThumbnailURL,
  isProductThumnailModalOpen,
  onProductThumnailModalClose,
}: ProductThumbnailModalProps) => {
  return (
    <Dialog
      open={isProductThumnailModalOpen}
      onOpenChange={onProductThumnailModalClose}
    >
      <DialogContent className="p-8">
        <DialogTitle className="sr-only">サムネイル画像</DialogTitle>
        <Image
          src={productThumbnailURL}
          alt="Product Thumbnail"
          width={600}
          height={600}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductThumbnailModal;
