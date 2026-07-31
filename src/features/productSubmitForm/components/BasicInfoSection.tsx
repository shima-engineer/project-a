"use client";
import { useFormContext, useWatch } from "react-hook-form";
import { ProductSubmitFormValues } from "../schema";
import ErrorMessage from "./ErrorMessage";

const BasicInfoSection = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useFormContext<ProductSubmitFormValues>();

  const productName = useWatch({
    control,
    name: "productName",
    defaultValue: "",
  });

  const productTagline = useWatch({
    control,
    name: "productTagline",
    defaultValue: "",
  });

  const productTags =
    useWatch({
      control,
      name: "productTags",
    }) ?? [];

  const exchangeTextToTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) {
      return;
    }

    e.preventDefault();

    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      const tag = e.currentTarget.value.trim();
      if (!tag) {
        return;
      }
      const currentTags = getValues("productTags") ?? [];

      if (currentTags.length >= 5) {
        setError("productTags", {
          type: "manual",
          message: "タグは最大5つまでです。",
        });
        return;
      }

      if (tag.length > 20) {
        setError("productTags", {
          type: "manual",
          message: "タグは20文字以内で入力してください。",
        });
        return;
      }

      if (currentTags.includes(tag)) {
        setError("productTags", {
          type: "manual",
          message: "同じタグは追加できません。",
        });
        return;
      }

      setValue("productTags", [...currentTags, tag], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });

      clearErrors("productTags");
      e.currentTarget.value = "";
    }
  };

  console.log(productTags);

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-0.5 text-base font-semibold">TODO#9基本情報</h2>
        <p className="text-xs text-muted-foreground">Basic Information</p>
      </div>
      <div className="mb-4">
        <label htmlFor="productName" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">プロダクト名</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <div className="relative mb-2">
          <input
            type="text"
            id="productName"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            placeholder="例: Shibuya AI"
            {...register("productName")}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
            {productName.length}/40
          </span>
        </div>
        <ErrorMessage errorMessage={errors.productName?.message || ""} />
      </div>
      <div className="mb-4">
        <label htmlFor="productTagline" className="mb-1.5 block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">タグライン</span>
              <span className="text-primary">*</span>
            </div>
            <p className="text-xs text-muted-foreground">
              60文字以内、プロダクトを一言で。
            </p>
          </div>
        </label>
        <div className="relative mb-2">
          <input
            type="text"
            id="productTagline"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            placeholder="例: 日本語特化のAIライティングアシスタント"
            {...register("productTagline")}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
            {productTagline.length}/60
          </span>
        </div>
        <ErrorMessage errorMessage={errors.productTagline?.message || ""} />
      </div>
      <div className="mb-4">
        <label htmlFor="productWebsite" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">WebサイトURL</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <input
          type="text"
          id="productWebsite"
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring mb-2"
          placeholder="例: https://shibuya-ai.com"
        />
        <ErrorMessage errorMessage={errors.productWebsite?.message || ""} />
      </div>
      <div className="mb-4">
        <label htmlFor="productCategory" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">カテゴリー</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <select
          id="productCategory"
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring mb-2"
          {...register("productCategory")}
        >
          <option>AIツール</option>
          <option>SaaS</option>
          <option>Webアプリ</option>
          <option>ネイティブアプリ</option>
          <option>Developer Tools</option>
          <option>生産性</option>
          <option>デザイン</option>
          <option>マーケティング</option>
        </select>
        <ErrorMessage errorMessage={errors.productCategory?.message || ""} />
      </div>
      <div className="mb-4">
        <label htmlFor="productTag" className="mb-1.5 block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">タグ</span>
              <span className="text-primary">*</span>
            </div>
            <p className="text-xs text-muted-foreground">
              最大5つ。Enterで追加
            </p>
          </div>
        </label>
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-input bg-background p-2 h-10 mb-2">
          {productTags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
          <input
            type="text"
            id="productTags"
            className="flex-1 min-w-30 bg-transparent text-sm outline-none px-1"
            placeholder="AI, SaaS, Indie…"
            onKeyDown={exchangeTextToTag}
          />
        </div>
        <ErrorMessage errorMessage={errors.productTags?.message || ""} />
      </div>
    </>
  );
};

export default BasicInfoSection;
