import type { ProductDetails } from "../queries/getProductDetails";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

const ProductDetailDeveloperInfo = ({
  productDetails,
}: {
  productDetails: ProductDetails;
}) => {
  return (
    <section className="rounded-2xl border border-border p-5 flex items-center gap-4 justify-between">
      <div className="flex items-center gap-4">
        {productDetails?.users.avatar_url ? (
          <Image
            src={productDetails?.users.avatar_url}
            alt={productDetails.name}
            width={56}
            height={56}
            className="size-14 rounded-full ring-2 ring-border"
          ></Image>
        ) : (
          <Avatar className="size-14 ring-2 ring-border">
            <AvatarImage
              src={productDetails?.users.avatar_url ?? undefined}
              alt={productDetails?.users.name ?? "メイカー"}
            />
            <AvatarFallback>
              <UserRound className="size-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        )}
        <div>
          <p className="text-xs text-muted-foreground">メイカー</p>
          <p className="font-semibold">
            {productDetails?.users.name || "名前未設定"}
          </p>
          {productDetails?.users.username && (
            <p className="text-sm text-muted-foreground">
              @{productDetails.users.username}
            </p>
          )}
        </div>
      </div>
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs">
        フォロー
      </button>
    </section>
  );
};

export default ProductDetailDeveloperInfo;
