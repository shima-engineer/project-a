import ProductDetailCommentItem from "./ProductDetailCommentItem";
import { Comments } from "../queries/getComments";

const ProductDetailCommentList = ({ comments,avatarUrl }: { comments: Comments, avatarUrl?: string }) => {
  console.log(comments);
  return (
    <div>
      {comments?.map((comment) => (
        <ProductDetailCommentItem key={comment.id} comment={comment} avatarUrl={avatarUrl} />
      ))}
    </div>
  );
};

export default ProductDetailCommentList;
