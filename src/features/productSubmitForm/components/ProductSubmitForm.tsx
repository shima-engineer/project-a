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
      await submitProduct(data);

      reset();

      toast.success("プロダクトを投稿しました");
    } catch {
      toast.error("投稿に失敗しました");
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
