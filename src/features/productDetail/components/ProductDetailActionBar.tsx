import { ExternalLinkIcon,Bookmark,Share2 } from "lucide-react";
import Link from "next/link";

const ProductDetailActionBar = () => {
  return (
    <div className="flex gap-2">
      {/* TODO#17:実際のリンクに置き換える */}
      <Link
        href="/"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 gap-2"
      >
        <ExternalLinkIcon className="w-4 h-4"/>
        <span>Webサイトを訪問</span>
      </Link>
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed  border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2">
        <Bookmark className="w-4 h-4"/>
        <span>保存</span>
      </button>
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed  border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2">
        <Share2 className="w-4 h-4"/>
        <span>共有</span>
      </button>
    </div>
  );
};

export default ProductDetailActionBar;
