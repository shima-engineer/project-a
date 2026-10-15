import ProductDetailHeader from "@/features/productDetail/components/ProductDetailHeader";
import { notFound } from "next/navigation";
import ProductDetailActionBar from "@/features/productDetail/components/ProductDetailActionBar";
import ProductDetailScreenshots from "@/features/productDetail/components/ProductDetailScreenshots";
import ProductDetailOverview from "@/features/productDetail/components/ProductDetailOverview";
import ProductDetailTechnologies from "@/features/productDetail/components/ProductDetailTechnologies";
import ProductDetailProductInfo from "@/features/productDetail/components/ProductDetailProductInfo";
import ProductDetailComments from "@/features/productDetail/components/ProductDetailComments";
import ProductDetailDeveloperInfo from "@/features/productDetail/components/ProductDetailDeveloperInfo";
import { getProductDetails } from "@/features/productDetail/queries/getProductDetails";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getUserUpvotes } from "@/features/upvote/queries/getUserUpvotes";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  {
    /* TODO#22:suspenseでスケルトンを表示することを検討
      うまくいかなければloading.tsxを使用する */
  }
  const { slug } = await params;
  const productDetials = await getProductDetails(slug);
  console.log(productDetials);

  const user = await getCurrentUser();
  const upvotes = user ? await getUserUpvotes(user.id) : [];

  if(!productDetials) return notFound();

  return (
    <main className="mx-auto max-w-7xl sm:px-6 px-4 py-8 lg:flex lg:gap-10">
      <div>
        <div className="mb-10">
          <ProductDetailHeader productDetails={productDetials}/>
        </div>
        <div className="mb-10">
          <ProductDetailActionBar />
        </div>
        {/* TODO#18:スクリーンショット0の時にmbを外す */}
        <div className="mb-10">
          <ProductDetailScreenshots />
        </div>
        <div className="mb-10">
          <ProductDetailOverview />
        </div>
        <div className="mb-10">
          <ProductDetailTechnologies />
        </div>
        <div className="mb-10">
          <ProductDetailDeveloperInfo />
        </div>
        <div className="mb-10">
          <ProductDetailComments />
        </div>
      </div>
      <ProductDetailProductInfo />
    </main>
  );
};

export default page;
