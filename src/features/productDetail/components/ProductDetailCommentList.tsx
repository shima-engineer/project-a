import ProductDetailCommentItem from "./ProductDetailCommentItem";
import { Comments } from "../queries/getComments";

const ProductDetailCommentList = ({ comments }: { comments: Comments }) => {

  return (
    <div className="flex flex-col gap-4">
      {comments?.map((comment) => (
        <ProductDetailCommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default ProductDetailCommentList;
