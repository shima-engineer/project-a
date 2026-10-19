import Image from "next/image";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import ProductDetailCommentFormInput from "./ProductDetailCommentFormInput";

const ProductDetailCommentForm = async () => {
  const currentUser = await getCurrentUser();
  const avatarUrl = currentUser?.user_metadata.avatar_url;

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
      <ProductDetailCommentFormInput />
    </div>
  );
};

export default ProductDetailCommentForm;
