import { ProductSubmitFormValues } from "../schema";

export type ProductSubmitData = {
  name: string;
  tagline: string;
  url: string;
  category: ProductSubmitFormValues["productCategory"];
  tags: string[];
  description: string;
  features: string;
  technologies: string[];
  plan: ProductSubmitFormValues["productPlans"];
  thumbnail: File;
  screenshots: File[];
};

export const convertProductSubmitFormToData = (
  data: ProductSubmitFormValues,
): ProductSubmitData => {
  return {
    name: data.productName,
    tagline: data.productTagline,
    url: data.productWebsite,
    category: data.productCategory,
    tags: data.productTags,
    description: data.productDescription,
    features: data.productFeatures,
    technologies: data.productTechnologies,
    plan: data.productPlans,
    thumbnail: data.productThumbnail,
    screenshots: data.productScreenshots ?? [],
  };
};
