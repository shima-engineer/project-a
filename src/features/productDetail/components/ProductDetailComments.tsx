import ProductDetailCommentList from "./ProductDetailCommentList";
import ProductDetailCommentForm from "./ProductDetailCommentForm";

const ProductDetailComments = () => {
  return (
    <div>
      {/* TODO#20:コメント数を動的に取得する */}
      <h2 className="text-xl font-bold mb-4">コメント (86)</h2>
      <div className="mb-6">
        <ProductDetailCommentForm />
      </div>
      <ProductDetailCommentList />
    </div>
  );
};

export default ProductDetailComments;
