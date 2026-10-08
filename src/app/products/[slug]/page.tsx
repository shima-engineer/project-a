import ProductDetailHeader from "@/features/productDetail/components/ProductDetailHeader";
import ProductDetailOverView from "@/features/productDetail/components/ProductDetailOverView";
import ProductDetailProductInfo from "@/features/productDetail/components/ProductDetailProductInfo";
import ProductDetailScreenshots from "@/features/productDetail/components/ProductDetailScreenshots";
import ProductDetailTechnologies from "@/features/productDetail/components/ProductDetailTechnologies";
import ProductDetailDeveloperInfo from "@/features/productDetail/components/ProductDetailDeveloperInfo";
import ProductDetailComments from "@/features/productDetail/components/ProductDetailComments";
import ProductDetailCommentList from "@/features/productDetail/components/ProductDetailCommentList";
import ProductDetailCommentPost from "@/features/productDetail/components/ProductDetailCommentPost";

const page = () => {
  return (
    <>
      <div className="md:flex">
        <ProductDetailHeader />
        <ProductDetailOverView />
        <ProductDetailProductInfo />
        <ProductDetailScreenshots />
        <ProductDetailTechnologies />
        <ProductDetailComments />
        <ProductDetailCommentList />
        <ProductDetailCommentPost />
      </div>
      <ProductDetailDeveloperInfo />
    </>
  );
};

export default page;
