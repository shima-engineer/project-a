import { Eye } from "lucide-react";

const ProductPreviewButton = () => {
  return (
    <button className="lg:hidden fixed bottom-20 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 text-sm font-medium active:scale-95 transition-transform">
      <Eye className="size-4 text-white" />
      <p>プレビュー</p>
    </button>
  );
};

export default ProductPreviewButton;
