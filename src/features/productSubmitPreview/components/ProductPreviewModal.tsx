"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import ProductPreviewContent from "./ProductPreviewContent";

interface ProductPreviewModalProps {
  isProductPreviewModalOpen: boolean;
  handleProductPreviewModalClose: () => void;
}

const ProductPreviewModal = ({
  isProductPreviewModalOpen,
  handleProductPreviewModalClose,
}: ProductPreviewModalProps) => {
  return (
    <>
      <Drawer
        open={isProductPreviewModalOpen}
        onOpenChange={(open) => !open && handleProductPreviewModalClose()}
      >
        <DrawerContent className="max-h-[90vh] flex flex-col overflow-hidden">
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-left px-5 py-3 border-b border-border">
              <p className="text-sm font-semibold">TODO#14投稿後のプレビュー</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                LIVE PREVIEW
              </p>
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-5 py-6 space-y-6">
            <ProductPreviewContent />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProductPreviewModal;
