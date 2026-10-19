import ProductDetailCommentItem from "./ProductDetailCommentItem";
import { Comments } from "../queries/getComments";

const ProductDetailCommentList = ({ comments,avatarUrl }: { comments: Comments, avatarUrl?: string }) => {

  return (
    <div className="flex flex-col gap-4">
      {comments?.map((comment) => (
        <ProductDetailCommentItem key={comment.id} comment={comment} avatarUrl={avatarUrl} />
      ))}
    </div>
  );
};

export default ProductDetailCommentList;
