import ProductSubmitFormProvider from "@/features/productSubmitForm/components/ProductSubmitFormProvider";
import ProductSubmitPageContent from "@/features/productSubmitForm/components/ProductSubmitPageContent";

const Page = () => {
  return (
    <ProductSubmitFormProvider>
      <ProductSubmitPageContent />
    </ProductSubmitFormProvider>
  );
};

export default Page;
