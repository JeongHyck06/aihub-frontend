export type RegisterGuideStep = {
  title: string;
  description: string;
};

export type PricePolicy = {
  label: string;
  value: "FREE" | "PAID" | "FREEMIUM";
};

export type ModelRegisterRequest = {
  serviceName: string;
  categorySlug: string;
  url: string;
  pricePolicy: PricePolicy["value"];
  description: string;
  features: string[];
  apiDocUrl?: string;
};
