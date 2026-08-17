"use client";
import { FormProvider, useForm } from "react-hook-form";
import BasicInfoSection from "./BasicInfoSection";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSubmitFormSchema,
  ProductSubmitFormValues,
  ProductSubmitFormInput,
} from "../schema";
import DetailsSection from "./DetailsSection";
import MediaSection from "./MediaSection";
import SocialLinksSection from "./SocialLinksSection";
import SubmitActionBar from "./SubmitActionBar";

const ProductSubmitForm = () => {
  const methods = useForm<
    ProductSubmitFormInput,
    unknown,
    ProductSubmitFormValues
  >({
    resolver: zodResolver(productSubmitFormSchema),
    defaultValues: {
      productName: "",
      productTagline: "",
      productWebsite: "",
      productCategory: "",
      productTags: [],
      productDescription: "",
      productFeatures: "",
      productTechnology: "",
      productPlans: "",
    },
  });

  const onSubmit = (data: ProductSubmitFormValues) => {
    // dataを使わないとlintのエラーになるため、一時的にconsoleを残す。
    console.log(data);
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
