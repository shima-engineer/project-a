"use client";

import { useFormContext } from "react-hook-form";
import { submitProduct } from "../actions/submitProduct";
import { toast } from "sonner";
import BasicInfoSection from "./BasicInfoSection";
import { ProductSubmitFormValues } from "../schema";
import DetailsSection from "./DetailsSection";
import MediaSection from "./MediaSection";
import SocialLinksSection from "./SocialLinksSection";
import SubmitActionBar from "./SubmitActionBar";

const ProductSubmitForm = () => {
  const methods = useFormContext<ProductSubmitFormValues>();
  const { reset } = methods;

  const onSubmit = async (data: ProductSubmitFormValues) => {
    try {
      const result = await submitProduct(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      reset();

      toast.success("プロダクトを投稿しました");
    } catch {
      toast.error("通信に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <BasicInfoSection />
      <DetailsSection />
      <MediaSection />
      <SocialLinksSection />
      <SubmitActionBar />
    </form>
  );
};

export default ProductSubmitForm;
