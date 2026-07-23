import ProductSubmitForm from "@/features/productSubmitForm/components/ProductSubmitForm";
import ProductPreviewContent from "@/features/productSubmitPreview/components/ProductPreviewContent";
import ProductSubmitPreview from "@/features/productSubmitPreview/components/ProductSubmitPreview";

const page = () => {
  return (
    <main className="flex-1 grid md:grid-cols-2 max-w-400 mx-auto w-full">
      <div className="px-4 sm:px-8 md:px-12 py-8 md:py-10 w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">プロダクトを投稿する</h1>
          <p className="text-sm text-muted-foreground md:hidden">
            右下の「プレビュー」ボタンで投稿後の見え方を確認できます。
          </p>
        </div>

        <ProductSubmitForm />
        <div className="md:hidden">
          <ProductSubmitPreview />
        </div>
      </div>
      <div className="hidden md:block border-l border-border">
        <div className="text-left px-8 py-3 border-b border-border">
          <p className="text-sm font-semibold">投稿後のプレビュー</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            LIVE PREVIEW
          </p>
        </div>
        <div className="px-8 py-8 space-y-8">
          <ProductPreviewContent />
        </div>
      </div>
    </main>
  );
};

export default page;
