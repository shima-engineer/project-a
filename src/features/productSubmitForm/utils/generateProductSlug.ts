export const generateProductSlug = (productName: string) => {
  if (!crypto) {
    throw new Error("crypto module is required for generating product slug.");
  }
  const baseSlug = productName
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);

  const suffix = crypto.randomUUID().slice(0, 8);

  return `${baseSlug || "product"}-${suffix}`;
};
