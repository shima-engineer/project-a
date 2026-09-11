"use client";
import {
  PRICING_PLANS,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_FEATURES_MAX_LENGTH,
  PRODUCT_TECHNOLOGIES_MAX_COUNT,
  PRODUCT_TECHNOLOGY_MAX_LENGTH,
} from "../constants";
import { useFormContext, useWatch } from "react-hook-form";
import { ProductSubmitFormValues } from "../schema";
import ErrorMessage from "./ErrorMessage";
import { X } from "lucide-react";

const DetailsSection = () => {
  const {
    register,
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<ProductSubmitFormValues>();

  const productDescription = useWatch({
    control,
    name: "productDescription",
  });

  const productFeatures = useWatch({
    control,
    name: "productFeatures",
  });

  const productTechnologies =
    useWatch({
      control,
      name: "productTechnologies",
    }) ?? [];

  const productPlans = useWatch({
    control,
    name: "productPlans",
  });

  const exchangeTextToTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) {
      return;
    }

    e.preventDefault();

    const tag = e.currentTarget.value.trim();
    if (!tag) {
      return;
    }
    const currentTechnologies = getValues("productTechnologies") ?? [];

    if (currentTechnologies.length >= PRODUCT_TECHNOLOGIES_MAX_COUNT) {
      setError("productTechnologies", {
        type: "manual",
        message: `技術スタックは最大${PRODUCT_TECHNOLOGIES_MAX_COUNT}つまでです。`,
      });
      return;
    }

    if (tag.length > PRODUCT_TECHNOLOGY_MAX_LENGTH) {
      setError("productTechnologies", {
        type: "manual",
        message: `技術スタックは${PRODUCT_TECHNOLOGY_MAX_LENGTH}文字以内で入力してください。`,
      });
      return;
    }

    if (currentTechnologies.includes(tag)) {
      setError("productTechnologies", {
        type: "manual",
        message: "同じ技術スタックは追加できません。",
      });
      return;
    }

    setValue("productTechnologies", [...currentTechnologies, tag], {
      shouldValidate: true,
    });

    e.currentTarget.value = "";
  };

  const handleDeleteTag = (tag: string) => {
    const currentTags = getValues("productTechnologies") ?? [];

    const filteredTags = currentTags.filter((currentTag) => currentTag !== tag);

    setValue("productTechnologies", filteredTags, {
      shouldValidate: true,
    });
  };

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
            className="min-h-30 w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 pr-12"
            placeholder="このプロダクトが解決する問題、独自の特徴、ユーザーへの提供価値を書いてください。"
            {...register("productDescription")}
          />
          <span className="absolute right-3 bottom-2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
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
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 pr-12"
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
          <label htmlFor="productTechnologies" className="mb-1.5 block">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">技術スタック</span>
                <span className="text-primary">*</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {`最大${PRODUCT_TECHNOLOGIES_MAX_COUNT}つ。Enterで追加`}
              </p>
            </div>
          </label>
          <div className="flex flex-wrap gap-1.5 rounded-lg border border-input bg-background p-2 min-h-10 mb-2">
            {productTechnologies.map((tag) => (
              <div
                key={tag}
                className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs flex items-center gap-1"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteTag(tag)}
                  aria-label={`${tag}タグを削除`}
                  className="cursor-pointer"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
            <input
              type="text"
              id="productTechnologies"
              className="flex-1 min-w-30 bg-transparent text-sm outline-none px-1"
              placeholder="Next.js, Supabase…"
              onKeyDown={exchangeTextToTag}
            />
          </div>
          <ErrorMessage
            errorMessage={errors.productTechnologies?.message || ""}
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">料金プラン</span>
            <span className="text-primary">*</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {PRICING_PLANS.map((plan) => (
            <label
              key={plan.value}
              className={`
        rounded-lg border px-3 py-1.5 text-sm transition-colors
        border-border hover:border-foreground/30 cursor-pointer
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
                className="sr-only"
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
