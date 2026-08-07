export const PRICING_PLANS = [
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
  { value: "subscription", label: "Subscription" },
  { value: "one-time", label: "One-time" },
] as const;

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
