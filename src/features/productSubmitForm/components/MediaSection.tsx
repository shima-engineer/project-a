"use client";
import Image from "next/image";
import { useState } from "react";
import { MAX_SCREENSHOT_COUNT } from "../constants";
import { useFormContext } from "react-hook-form";
import ProductThumbnailModal from "./ProductThumbnailModal";
import ErrorMessage from "./ErrorMessage";
import { ProductSubmitFormValues } from "../schema";
import ProductScreenshotModal from "./ProductScreenshotModal";

type ProductScreenshot = {
  id: string;
  file: File;
};

const MediaSection = () => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<ProductSubmitFormValues>();

  const [productThumbnail, setProductThumbnail] = useState<File | null>(null);
  const [productThumbnailDragOver, setProductThumbnailDragOver] =
    useState(false);
  const [productScreenshots, setProductScreenshots] = useState<
    ProductScreenshot[]
  >([]);
  const [productScreenshotDragOver, setProductScreenshotDragOver] =
    useState(false);
  const [isProductThumnailModalOpen, setIsProductThumnailModalOpen] =
    useState(false);
  const [isProductScreenshotModalOpen, setIsProductScreenshotModalOpen] =
    useState(false);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<
    number | null
  >(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProductThumbnail(file);
    setValue("productThumbnail", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleThumbnailDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setProductThumbnailDragOver(true);
  };

  const handleThumbnailDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setProductThumbnailDragOver(false);
  };

  const handleThumbnailDrop = (e: React.DragEvent<HTMLLabelElement>) => {
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

  const onProductThumnailModalClose = () => {
    setIsProductThumnailModalOpen(false);
  };

  const handleThumbnailClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsProductThumnailModalOpen(true);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (productScreenshots.length >= MAX_SCREENSHOT_COUNT) return;

    setProductScreenshotDragOver(false);

    const file = e.target.files?.[0];
    if (!file) return;

    const newScreenshot: ProductScreenshot = {
      id: crypto.randomUUID(),
      file,
    };

    const updatedScreenshots = [...productScreenshots, newScreenshot];

    setProductScreenshots(updatedScreenshots);

    setValue(
      "productScreenshots",
      updatedScreenshots.map((screenshot) => screenshot.file),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  const handleScreenshotDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setProductScreenshotDragOver(true);
  };

  const handleScreenshotDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setProductScreenshotDragOver(false);
  };

  const handleScreenshotDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (productScreenshots.length >= MAX_SCREENSHOT_COUNT) return;
    setProductScreenshotDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const newScreenshot: ProductScreenshot = {
      id: crypto.randomUUID(),
      file,
    };
    const updatedScreenshots = [...productScreenshots, newScreenshot];

    setProductScreenshots(updatedScreenshots);

    setValue(
      "productScreenshots",
      updatedScreenshots.map((screenshot) => screenshot.file),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  const onProductScreenshotModalClose = () => {
    setIsProductScreenshotModalOpen(false);
  };

  const handleScreenshotClick = (index: number) => {
    setSelectedScreenshotIndex(index);
    setIsProductScreenshotModalOpen(true);
  };

  const handleScreenshotDelete = (index: number) => {
    const updatedScreenshots = productScreenshots.filter((_, i) => i !== index);
    setProductScreenshots(updatedScreenshots);
    setValue(
      "productScreenshots",
      updatedScreenshots.map((screenshot) => screenshot.file),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

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
          onDragOver={handleThumbnailDragOver}
          onDragLeave={handleThumbnailDragLeave}
          onDrop={handleThumbnailDrop}
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
        <div className="flex gap-2 mb-2 flex-wrap">
          {productScreenshots.length > 0 &&
            productScreenshots.map((screenshot, index) => {
              return (
                <div key={`${screenshot.id}`} className="relative group">
                  <Image
                    src={URL.createObjectURL(screenshot.file)}
                    alt="Product Screenshot"
                    width={64}
                    height={64}
                    className="z-10 relative cursor-pointer h-16"
                    onClick={() => handleScreenshotClick(index)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-hover:opacity-100 transition-opacity lucide lucide-x-icon lucide-x text-white absolute z-100 -top-1 -right-1 cursor-pointer border-border border-2 bg-primary rounded-3xl"
                    onClick={() => handleScreenshotDelete(index)}
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </div>
              );
            })}
          <ProductScreenshotModal
            productScreenshotURL={
              selectedScreenshotIndex !== null
                ? URL.createObjectURL(
                    productScreenshots[selectedScreenshotIndex].file,
                  )
                : ""
            }
            isProductScreenshotModalOpen={isProductScreenshotModalOpen}
            onProductScreenshotModalClose={onProductScreenshotModalClose}
          />
          {productScreenshots.length < MAX_SCREENSHOT_COUNT && (
            <label
              onDragOver={handleScreenshotDragOver}
              onDragLeave={handleScreenshotDragLeave}
              onDrop={handleScreenshotDrop}
            >
              <input
                type="file"
                id="productScreenshot"
                className="sr-only"
                onChange={handleScreenshotChange}
              />
              <div
                className={`w-16 h-16 aspect-video rounded-lg border-2 border-dashed border-border grid place-items-center text-muted-foreground hover:border-primary hover:bg-primary/5 cursor-pointer ${productScreenshotDragOver ? "border-primary bg-primary/5" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus-icon lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
            </label>
          )}
        </div>
        <ErrorMessage errorMessage={errors.productScreenshots?.message || ""} />
        {productScreenshots.map((_, index) => (
          <ErrorMessage
            key={index}
            errorMessage={errors.productScreenshots?.[index]?.message}
          />
        ))}
      </div>
    </>
  );
};

export default MediaSection;
