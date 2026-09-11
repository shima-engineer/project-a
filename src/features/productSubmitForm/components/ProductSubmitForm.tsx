"use client";

import { useFormContext } from "react-hook-form";
import { submitProduct } from "../actions/submitProduct";
import BasicInfoSection from "./BasicInfoSection";
import { ProductSubmitFormValues } from "../schema";
import DetailsSection from "./DetailsSection";
import MediaSection from "./MediaSection";
import SocialLinksSection from "./SocialLinksSection";
import SubmitActionBar from "./SubmitActionBar";

const ProductSubmitForm = () => {
  const methods = useFormContext<ProductSubmitFormValues>();

  const onSubmit = async (data: ProductSubmitFormValues) => {
    const result = await submitProduct(data);
    console.log(result);
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
