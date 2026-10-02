"use client";

import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from "react-hook-form";
import { ProductSubmitFormInput, ProductSubmitFormValues } from "../schema";

const ProductSubmitLoading = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext<
    ProductSubmitFormInput,
    unknown,
    ProductSubmitFormValues
  >();

  if (!isSubmitting) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <Spinner className="size-8 text-primary" />
    </div>
  );
};

export default ProductSubmitLoading;
