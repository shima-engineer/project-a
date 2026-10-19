import ProductDetailCommentList from "./ProductDetailCommentList";
import ProductDetailCommentForm from "./ProductDetailCommentForm";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getComments, type Comments } from "../queries/getComments";

const ProductDetailComments = async ({ productId }: { productId: string }) => {
  const currentUser = await getCurrentUser();
  const avatarUrl = currentUser?.user_metadata.avatar_url;

  let comments: Comments | null = null;

  try {
    comments = await getComments(productId);
  } catch (error) {
    console.error("コメント取得エラー:", error);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        コメント {comments !== null && `(${comments.length})`}
      </h2>
      <div className="mb-6">
        <ProductDetailCommentForm
          productId={productId}
          currentUser={currentUser}
          avatarUrl={avatarUrl}
        />
      </div>
      {comments === null ? (
        <p role="alert">コメントを取得できませんでした。</p>
      ) : (
        <ProductDetailCommentList comments={comments} />
      )}
    </div>
  );
};

export default ProductDetailComments;
