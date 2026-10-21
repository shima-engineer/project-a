import ProductDetailHeader from "@/features/productDetail/components/ProductDetailHeader";
import ProductDetailDeveloperInfo from "@/features/productDetail/components/ProductDetailDeveloperInfo";
import { ProductDetailScreenshotsSkeleton } from "@/features/skelton/ProductDetailScreenshotsSkeleton";
import { ProductDetailOverviewSkeleton } from "@/features/skelton/ProductDetailOverviewSkeleton";
import { ProductDetailTechnologiesSkeleton } from "@/features/skelton/ProductDetailTechnologiesSkeleton";
import { ProductDetailCommentsSkeleton } from "@/features/skelton/ProductDetailCommentsSkeleton";
import { notFound } from "next/navigation";
import ProductDetailActionBar from "@/features/productDetail/components/ProductDetailActionBar";
import ProductDetailScreenshots from "@/features/productDetail/components/ProductDetailScreenshots";
import ProductDetailOverview from "@/features/productDetail/components/ProductDetailOverview";
import ProductDetailTechnologies from "@/features/productDetail/components/ProductDetailTechnologies";
import ProductDetailProductInfo from "@/features/productDetail/components/ProductDetailProductInfo";
import ProductDetailComments from "@/features/productDetail/components/ProductDetailComments";
import { getProductBySlug } from "@/features/productDetail/queries/getProductDetails";
import { Suspense } from "react";
import { ProductDetailHeaderSkeleton } from "@/features/skelton/ProductDetailHeaderSkeleton";
import { ProductDetailDeveloperInfoSkeleton } from "@/features/skelton/ProductDetailDeveloperInfoSkeleton";
import { Period } from "@/types/period";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: Period }>;
}) => {
  const { slug } = await params;
  const { periodId: rawPeriodId } = await searchParams;
  // periodIdがdaily, weekly, monthlyのいずれかでない場合はdailyに設定
  const periodId =
    rawPeriodId === "daily" ||
    rawPeriodId === "weekly" ||
    rawPeriodId === "monthly"
      ? rawPeriodId
      : "daily";
  const productDetails = await getProductBySlug(slug);

  if (!productDetails) return notFound();

  return (
    <main className="lg:mx-auto lg:max-w-7xl w-full sm:px-6 px-4 py-8 lg:flex lg:gap-10">
      <div className="flex-1">
        <div className="mb-10">
          <Suspense fallback={<ProductDetailHeaderSkeleton />}>
            <ProductDetailHeader
              productDetails={productDetails}
              periodId={periodId}
            />
          </Suspense>
        </div>
        <div className="mb-10">
          <ProductDetailActionBar productDetails={productDetails} />
        </div>
        {productDetails?.screenshots.length > 0 && (
          <div className="mb-10">
            <Suspense fallback={<ProductDetailScreenshotsSkeleton />}>
              <ProductDetailScreenshots productDetails={productDetails} />
            </Suspense>
          </div>
        )}
        <div className="mb-10">
          <Suspense fallback={<ProductDetailOverviewSkeleton />}>
            <ProductDetailOverview productDetails={productDetails} />
          </Suspense>
        </div>
        <div className="mb-10">
          <Suspense fallback={<ProductDetailTechnologiesSkeleton />}>
            <ProductDetailTechnologies productDetails={productDetails} />
          </Suspense>
        </div>
        <div className="mb-10">
          <Suspense fallback={<ProductDetailDeveloperInfoSkeleton />}>
            <ProductDetailDeveloperInfo productDetails={productDetails} />
          </Suspense>
        </div>
        <div className="mb-10">
          <Suspense fallback={<ProductDetailCommentsSkeleton />}>
            <ProductDetailComments productId={productDetails.id} />
          </Suspense>
        </div>
      </div>
      <ProductDetailProductInfo />
    </main>
  );
};

export default page;
