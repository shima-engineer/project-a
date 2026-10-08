import ProductDetailHeader from "@/features/productDetail/components/ProductDetailHeader";
import ProductDetailActionBar from "@/features/productDetail/components/ProductDetailActionBar";
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
    <main className="sm:px-6  px-4 py-8  lg:flex">
      <div>
        <div className="mb-10">
          <ProductDetailHeader />
        </div>
        <div className="mb-10">
          <ProductDetailActionBar />
        </div>
        {/* TODO#18:スクリーンショット0の時にmbを外す */}
        <div className="mb-10">
          <ProductDetailScreenshots />
        </div>
        <div className="mb-10">
          <ProductDetailOverView />
        </div>
        <div className="mb-10">
          <ProductDetailTechnologies />
        </div>
        <ProductDetailProductInfo />
        <ProductDetailComments />
        <ProductDetailCommentList />
        <ProductDetailCommentPost />
      </div>
      <ProductDetailDeveloperInfo />
    </main>
  );
};

export default page;
