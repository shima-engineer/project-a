import Image from "next/image";
import ProductDetailCommentFormInput from "./ProductDetailCommentFormInput";
import type { Users } from "@/features/auth/queries/getCurrentUser";

const ProductDetailCommentForm = async ({
  productId,
  currentUser,
  avatarUrl,
}: {
  productId: string;
  currentUser: Users;
  avatarUrl?: string;
}) => {
  return (
    <div className="flex gap-4">
      {avatarUrl && (
        <Image
          src={avatarUrl}
          alt="User avatar"
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-full ring-1 ring-border bg-card"
        />
      )}
      <ProductDetailCommentFormInput
        productId={productId}
        currentUser={currentUser}
      />
    </div>
  );
};

export default ProductDetailCommentForm;
