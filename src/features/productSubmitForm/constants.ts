export const PRICING_PLANS = [
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
  { value: "subscription", label: "Subscription" },
  { value: "one-time", label: "One-time" },
] as const;

export const PRICING_PLAN_VALUES = PRICING_PLANS.map((plan) => plan.value);

export const PRODUCT_CATEGORIES = [
  "",
  "AIツール",
  "SaaS",
  "Webアプリ",
  "ネイティブアプリ",
  "Developer Tools",
  "生産性",
  "デザイン",
  "マーケティング",
] as const;

export const PRODUCT_NAME_MAX_LENGTH = 40;

export const PRODUCT_TAGLINE_MAX_LENGTH = 60;

export const PRODUCT_DESCRIPTION_MAX_LENGTH = 120;

export const PRODUCT_FEATURES_MAX_LENGTH = 40;

export const PRODUCT_TECHNOLOGY_MAX_LENGTH = 40;
