"use client";

import { useFormContext } from "react-hook-form";
import BasicInfoSection from "./BasicInfoSection";
import { ProductSubmitFormValues } from "../schema";
import DetailsSection from "./DetailsSection";
import MediaSection from "./MediaSection";
import SocialLinksSection from "./SocialLinksSection";
import SubmitActionBar from "./SubmitActionBar";

const ProductSubmitForm = () => {
  const methods = useFormContext<ProductSubmitFormValues>();

  const onSubmit = (data: ProductSubmitFormValues) => {
    // dataを使わないとlintのエラーになるため、一時的にconsoleを残す。
    console.log(data);
    // TODO#13
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
