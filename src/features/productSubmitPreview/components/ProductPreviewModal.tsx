"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
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
        <DrawerTrigger />
        <DrawerContent>
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-left px-5 py-3 border-b border-border">
              <div className="">
                <p className="text-sm font-semibold">投稿後のプレビュー</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  LIVE PREVIEW
                </p>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-5 py-6 space-y-6">
            <ProductPreviewContent />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProductPreviewModal;
