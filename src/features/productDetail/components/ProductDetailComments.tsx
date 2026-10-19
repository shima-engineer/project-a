import ProductDetailCommentList from "./ProductDetailCommentList";
import ProductDetailCommentForm from "./ProductDetailCommentForm";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getComments } from "../queries/getComments";

const ProductDetailComments = async ({ productId }: { productId: string }) => {
  const comments = await getComments(productId);
  const currentUser = await getCurrentUser();
  const avatarUrl = currentUser?.user_metadata.avatar_url;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        コメント ({comments ? comments.length : 0})
      </h2>
      <div className="mb-6">
        <ProductDetailCommentForm productId={productId} currentUser={currentUser} avatarUrl={avatarUrl} />
      </div>
      <ProductDetailCommentList comments={comments} avatarUrl={avatarUrl} />
    </div>
  );
};

export default ProductDetailComments;
