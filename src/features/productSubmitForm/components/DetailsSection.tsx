"use client";
import { useState } from "react";
import { Pricing_Plans } from "../constants";

type PricingPlan = (typeof Pricing_Plans)[number]["value"];

const DetailsSection = () => {
  const [selected, setSelected] = useState<PricingPlan>("free");

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-0.5 text-base font-semibold">詳細</h2>
        <p className="text-xs text-muted-foreground">Details</p>
      </div>
      <div className="mb-4">
        <label htmlFor="productName" className="mb-1.5 block">
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
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
            0/120
          </span>
        </div>
      </div>
      <div className="lg:flex">
        <div className="mb-4">
          <label htmlFor="productName" className="mb-1.5 block">
            <span className="text-sm font-medium">主な機能</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="productFeatures"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
              placeholder="リアルタイム編集, AI補完…"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
              0/40
            </span>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="productName" className="mb-1.5 block">
            <span className="text-sm font-medium">技術スタック</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="productTechnology"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
              placeholder="Next.js, Supabase…"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
              0/40
            </span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="productPricing" className="mb-1.5 block">
          <span className="text-sm font-medium">料金プラン</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {Pricing_Plans.map((plan) => (
            <label
              key={plan.value}
              className={`
             rounded-lg border px-3 py-1.5 text-sm transition-colors border-border hover:border-foreground/30
              ${
                selected === plan.value &&
                "border-primary bg-primary/10 text-primary"
              }
            `}
            >
              <input
                type="radio"
                name="pricingPlan"
                value={plan.value}
                checked={selected === plan.value}
                onChange={() => setSelected(plan.value)}
                className="sr-only"
              />

              {plan.label}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailsSection;
