"use client";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import ProductThumbnailModal from "./ProductThumbnailModal";
import ErrorMessage from "./ErrorMessage";
import { ProductSubmitFormValues } from "../schema";

const MediaSection = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
    setError,
  } = useFormContext<ProductSubmitFormValues>();

  const [productThumbnail, setProductThumbnail] = useState<File | null>(null);
  const [productThumbnailDragOver, setProductThumbnailDragOver] =
    useState(false);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProductThumbnail(file);
    setValue("productThumbnail", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setProductThumbnailDragOver(true);
    console.log("drag");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setProductThumbnailDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setProductThumbnailDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setProductThumbnail(file);
    setValue("productThumbnail", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const [isProductThumnailModalOpen, setIsProductThumnailModalOpen] =
    useState(false);

  const onProductThumnailModalClose = () => {
    setIsProductThumnailModalOpen(false);
  };

  const handleThumbnailClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsProductThumnailModalOpen(true);
  };

  console.log(productThumbnail);

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-0.5 text-base font-semibold">TODO#12メディア</h2>
        <p className="text-xs text-muted-foreground">Media</p>
      </div>
      <div className="mb-4">
        <label htmlFor="productThumbnail" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">サムネイル</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <label
          htmlFor="productThumbnail"
          className="cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="productThumbnail"
            accept=".png,.jpg,.jpeg,.svg"
            className="sr-only"
            onChange={handleThumbnailChange}
          />

          <div
            className={`flex items-center gap-4 mb-2 rounded-xl border-2 border-dashed border-border p-5 hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors ${productThumbnailDragOver ? "border-primary bg-primary/5" : ""}`}
          >
            <div className="size-16 rounded-xl bg-secondary grid place-items-center">
              {productThumbnail ? (
                <Image
                  src={URL.createObjectURL(productThumbnail)}
                  alt="Product Thumbnail"
                  width={64}
                  height={64}
                  onClick={handleThumbnailClick}
                  className="z-10 relative"
                />
              ) : (
                <Image src="/upload-icon.svg" alt="" width={24} height={24} />
              )}
            </div>
            <div className="text-sm">
              {productThumbnail ? (
                <p className="">別の画像に変更</p>
              ) : (
                <p className="">
                  クリックもしくはドラッグアンドドロップでアップロード
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">
                PNG, JPG, SVG · 推奨 240×240px · 最大 2MB
              </p>
            </div>
          </div>
        </label>
        <ErrorMessage errorMessage={errors.productThumbnail?.message || ""} />
        <ProductThumbnailModal
          productThumbnailURL={
            productThumbnail ? URL.createObjectURL(productThumbnail) : ""
          }
          isProductThumnailModalOpen={isProductThumnailModalOpen}
          onProductThumnailModalClose={onProductThumnailModalClose}
        />
      </div>
      {/* TODO#12:画像アップロードのUIが三つあるが、一つでいいか検討すること */}
      <div className="mb-4">
        <label htmlFor="productScreenshot" className="mb-1.5 block">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">スクリーンショット</span>
            <p className="text-xs text-muted-foreground">
              最大6枚。ドラッグ&ドロップ対応。
            </p>
          </div>
        </label>
        <div className="grid grid-cols-3 gap-2">
          <label>
            <input type="file" id="productScreenshot1" className="sr-only" />
            <div className="aspect-video rounded-lg border-2 border-dashed border-border grid place-items-center text-muted-foreground hover:border-primary hover:bg-primary/5 cursor-pointer">
              <Image src="/upload-icon.svg" alt="" width={24} height={24} />
            </div>
          </label>
          <label>
            <input type="file" id="productScreenshot2" className="sr-only" />
            <div className="aspect-video rounded-lg border-2 border-dashed border-border grid place-items-center text-muted-foreground hover:border-primary hover:bg-primary/5 cursor-pointer">
              <Image src="/upload-icon.svg" alt="" width={24} height={24} />
            </div>
          </label>
          <label>
            <input type="file" id="productScreenshot3" className="sr-only" />
            <div className="aspect-video rounded-lg border-2 border-dashed border-border grid place-items-center text-muted-foreground hover:border-primary hover:bg-primary/5 cursor-pointer">
              <Image src="/upload-icon.svg" alt="" width={24} height={24} />
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default MediaSection;
