"use client";
import {
  PRICING_PLANS,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_FEATURES_MAX_LENGTH,
  PRODUCT_TECHNOLOGY_MAX_LENGTH,
} from "../constants";
import { useFormContext, useWatch } from "react-hook-form";
import { ProductSubmitFormValues } from "../schema";
import ErrorMessage from "./ErrorMessage";

const DetailsSection = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProductSubmitFormValues>();

  const productDescription = useWatch({
    control,
    name: "productDescription",
    defaultValue: "",
  });

  const productFeatures = useWatch({
    control,
    name: "productFeatures",
    defaultValue: "",
  });

  const productTechnology = useWatch({
    control,
    name: "productTechnology",
    defaultValue: "",
  });

  const productPlans = useWatch({
    control,
    name: "productPlans",
  });

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-0.5 text-base font-semibold">詳細</h2>
        <p className="text-xs text-muted-foreground">Details</p>
      </div>
      <div className="mb-4">
        <label htmlFor="productDescription" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">説明</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <div className="relative">
          <textarea
            id="productDescription"
            className="min-h-30 w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            placeholder="このプロダクトが解決する問題、独自の特徴、ユーザーへの提供価値を書いてください。"
            {...register("productDescription")}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
            {productDescription.trim().length}/{PRODUCT_DESCRIPTION_MAX_LENGTH}
          </span>
        </div>
        <ErrorMessage errorMessage={errors.productDescription?.message || ""} />
      </div>
      <div className="lg:flex">
        <div className="mb-4">
          <label htmlFor="productFeatures" className="mb-1.5 block">
            <span className="text-sm font-medium">主な機能</span>
          </label>
          <div className="relative mb-2">
            <input
              type="text"
              id="productFeatures"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
              placeholder="リアルタイム編集, AI補完…"
              {...register("productFeatures")}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
              {productFeatures.trim().length}/{PRODUCT_FEATURES_MAX_LENGTH}
            </span>
          </div>
          <ErrorMessage errorMessage={errors.productFeatures?.message || ""} />
        </div>
        <div className="mb-4">
          <label htmlFor="productTechnology" className="mb-1.5 block">
            <span className="text-sm font-medium">技術スタック</span>
          </label>
          <div className="relative mb-2">
            <input
              type="text"
              id="productTechnology"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
              placeholder="Next.js, Supabase…"
              {...register("productTechnology")}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
              {productTechnology.trim().length}/{PRODUCT_TECHNOLOGY_MAX_LENGTH}
            </span>
          </div>
          <ErrorMessage
            errorMessage={errors.productTechnology?.message || ""}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="productPlans" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">料金プラン</span>
            <span className="text-primary">*</span>
          </div>
        </label>

        <div className="flex flex-wrap gap-2 mb-2">
          {PRICING_PLANS.map((plan) => (
            <label
              key={plan.value}
              className={`
        rounded-lg border px-3 py-1.5 text-sm transition-colors
        border-border hover:border-foreground/30
        ${
          productPlans === plan.value
            ? "border-primary bg-primary/10 text-primary"
            : ""
        }
      `}
            >
              <input
                type="radio"
                value={plan.value}
                className="sr-only cursor-pointer"
                {...register("productPlans")}
              />
              {plan.label}
            </label>
          ))}
        </div>
        <ErrorMessage errorMessage={errors.productPlans?.message || ""} />
      </div>
    </>
  );
};

export default DetailsSection;
