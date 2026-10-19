import ProductDetailCommentList from "./ProductDetailCommentList";
import ProductDetailCommentForm from "./ProductDetailCommentForm";
import { getComments } from "../queries/getComments";

const ProductDetailComments = async ({ productId }: { productId: string }) => {
  const comments = await getComments(productId);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        コメント ({comments ? comments.length : 0})
      </h2>
      <div className="mb-6">
        <ProductDetailCommentForm />
      </div>
      <ProductDetailCommentList comments={comments} />
    </div>
  );
};

export default ProductDetailComments;
