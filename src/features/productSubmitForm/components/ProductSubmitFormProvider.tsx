"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductSubmitFormInput,
  productSubmitFormSchema,
  ProductSubmitFormValues,
} from "../schema";

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
    resolver: zodResolver(productSubmitFormSchema),
    defaultValues: {
      productName: "",
      productTagline: "",
      productWebsite: "",
      productCategory: "",
      productTags: [],
      productDescription: "",
      productFeatures: "",
      productTechnologies: [],
      productPlans: "",
      productThumbnail: undefined,
      productScreenshots: [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ProductSubmitFormProvider;
