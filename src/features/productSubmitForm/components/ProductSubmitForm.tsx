"use client";
import { FormProvider, useForm } from "react-hook-form";
import BasicInfoSection from "./BasicInfoSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSubmitFormSchema, ProductSubmitFormValues } from "../schema";
import DetailsSection from "./DetailsSection";
import MediaSection from "./MediaSection";
import SocialLinksSection from "./SocialLinksSection";
import SubmitActionBar from "./SubmitActionBar";

const ProductSubmitForm = () => {
  const methods = useForm<ProductSubmitFormValues>({
    resolver: zodResolver(productSubmitFormSchema),
    defaultValues: {
      productName: "",
      productTagline: "",
      productWebsite: "",
      productCategory: "",
      productTags: [],
    },
  });

  const onSubmit = (data: ProductSubmitFormValues) => {
    // TODO#13
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <BasicInfoSection />
        <DetailsSection />
        <MediaSection />
        <SocialLinksSection />
        <SubmitActionBar />
      </form>
    </FormProvider>
  );
};

export default ProductSubmitForm;
