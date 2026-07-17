"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
            <DrawerDescription>
              Drag the drawer to snap between a compact peek and a near
              full-height view.
            </DrawerDescription>
          </DrawerHeader>
          <ProductPreviewContent />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button type="button">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProductPreviewModal;
