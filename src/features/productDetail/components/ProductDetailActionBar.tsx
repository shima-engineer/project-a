"use client";

import { ExternalLinkIcon, Bookmark, Share2 } from "lucide-react";
import Link from "next/link";
import type { ProductDetails } from "../queries/getProductDetails";
import { toast } from "sonner";

const ProductDetailActionBar = ({
  productDetails,
}: {
  productDetails: ProductDetails;
}) => {
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("コピーしました");
    } catch (err) {
      toast.error("コピーに失敗しました");
      console.error("コピーに失敗しました", err);
    }
  };

  return (
    <section className="flex gap-2">
      <Link
        href={productDetails?.url ?? "#"}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 gap-2"
      >
        <ExternalLinkIcon className="w-4 h-4" />
        <span>Webサイトを訪問</span>
      </Link>
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed  border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2">
        <Bookmark className="w-4 h-4" />
        <span>保存</span>
      </button>
      <button
        onClick={handleCopy}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed  border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2"
      >
        <Share2 className="w-4 h-4" />
        <span>共有</span>
      </button>
    </section>
  );
};

export default ProductDetailActionBar;
