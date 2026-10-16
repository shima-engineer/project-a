import ProductDetailHeader from "@/features/productDetail/components/ProductDetailHeader";
import { notFound } from "next/navigation";
import ProductDetailActionBar from "@/features/productDetail/components/ProductDetailActionBar";
import ProductDetailScreenshots from "@/features/productDetail/components/ProductDetailScreenshots";
import ProductDetailOverview from "@/features/productDetail/components/ProductDetailOverview";
import ProductDetailTechnologies from "@/features/productDetail/components/ProductDetailTechnologies";
import ProductDetailProductInfo from "@/features/productDetail/components/ProductDetailProductInfo";
import ProductDetailComments from "@/features/productDetail/components/ProductDetailComments";
import ProductDetailDeveloperInfo from "@/features/productDetail/components/ProductDetailDeveloperInfo";
import { getProductBySlug } from "@/features/productDetail/queries/getProductDetails";
import { Suspense } from "react";
import { ProductDetailHeaderSkeleton } from "@/features/skelton/ProductDetailHeaderSkeleton";
import { Period } from "@/types/period";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: Period }>;
}) => {
  const { slug } = await params;
  const { periodId } = await searchParams;
  const productDetails = await getProductBySlug(slug);

  if (!productDetails) return notFound();

  return (
    <main className="mx-auto max-w-7xl sm:px-6 px-4 py-8 lg:flex lg:gap-10">
      <div>
        <div className="mb-10">
          <Suspense fallback={<ProductDetailHeaderSkeleton />}>
            <ProductDetailHeader
              productDetails={productDetails}
              periodId={periodId}
            />
          </Suspense>
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
