export type ModelInfoItem = {
  label: string;
  value: string;
  tone?: "default" | "success";
};

export type ModelReview = {
  author: string;
  rating: number;
  date?: string;
  body: string;
};

export type ModelDetail = {
  id: string;
  name: string;
  provider: string;
  category: string;
  rating: number;
  reviewCount: number;
  heroBadges: string[];
  description: string[];
  features: string[];
  tags: string[];
  info: ModelInfoItem[];
  reviews: ModelReview[];
};
