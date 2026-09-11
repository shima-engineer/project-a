export const PRODUCT_NAME_MAX_LENGTH = 40;

export const PRODUCT_TAGLINE_MAX_LENGTH = 60;

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

export const PRODUCT_DESCRIPTION_MAX_LENGTH = 120;

export const PRODUCT_FEATURES_MAX_LENGTH = 40;

export const PRODUCT_TECHNOLOGY_MAX_LENGTH = 40;

export const PRICING_PLANS = [
  { value: "Free", label: "Free" },
  { value: "Freemium", label: "Freemium" },
  { value: "Paid", label: "Paid" },
  { value: "Subscription", label: "Subscription" },
  { value: "One-time", label: "One-time" },
] as const;

export const PRICING_PLAN_VALUES = PRICING_PLANS.map((plan) => plan.value);

export const MAX_THUMBNAIL_SIZE_MB = 2;

export const MAX_THUMBNAIL_SIZE_BYTES = MAX_THUMBNAIL_SIZE_MB * 1024 * 1024;

export const MAX_SCREENSHOT_SIZE_MB = 2;

export const MAX_SCREENSHOT_SIZE_BYTES = MAX_SCREENSHOT_SIZE_MB * 1024 * 1024;

export const MAX_SCREENSHOT_COUNT = 6;
