import ProductSubmitForm from "@/features/productSubmitForm/components/ProductSubmitForm";
import ProductSubmitPreview from "@/features/productSubmitPreview/components/ProductSubmitPreview";

const page = () => {
  return (
    <main className="flex-1 grid lg:grid-cols-2 max-w-400 mx-auto w-full">
      <div className="px-4 sm:px-8 lg:px-12 py-8 lg:py-10 max-w-2xl w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">プロダクトを投稿する</h1>
          <p className="text-sm text-muted-foreground lg:hidden">
            右下の「プレビュー」ボタンで投稿後の見え方を確認できます。
          </p>
        </div>

        <ProductSubmitForm />
        <ProductSubmitPreview />
      </div>
    </main>
  );
};

export default page;
