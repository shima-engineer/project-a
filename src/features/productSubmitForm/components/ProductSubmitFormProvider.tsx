"use client";

import { FormProvider, useForm } from "react-hook-form";
import { ProductSubmitFormInput, ProductSubmitFormValues } from "../schema";

const ProductSubmitFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const methods = useForm<
    ProductSubmitFormInput,
    unknown,
    ProductSubmitFormValues
  >({
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
      productThumbnail: undefined,
      productScreenshots: [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ProductSubmitFormProvider;
