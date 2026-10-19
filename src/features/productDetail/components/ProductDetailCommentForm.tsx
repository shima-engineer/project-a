import Image from "next/image";
import ProductDetailCommentFormInput from "./ProductDetailCommentFormInput";

const ProductDetailCommentForm = async ({
  productId,
  currentUser,
  avatarUrl,
}: {
  productId: string;
  currentUser: any;
  avatarUrl?: string;
}) => {
  return (
    <div className="flex gap-4">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="User avatar"
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-full ring-1 ring-border bg-card"
        />
      ) : (
        <div className="size-9 shrink-0 rounded-full ring-1 ring-border bg-card"></div>
      )}
      {currentUser && (
        <ProductDetailCommentFormInput
          productId={productId}
        />
      )}
    </div>
  );
};

export default ProductDetailCommentForm;
