import ProductDetailCommentItem from "./ProductDetailCommentItem";
import { Comments } from "../queries/getComments";

const ProductDetailCommentList = ({ comments }: { comments: Comments }) => {
  console.log(comments);
  return (
    <div>
      {comments?.map((comment) => (
        <ProductDetailCommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default ProductDetailCommentList;
