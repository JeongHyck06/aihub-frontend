export type ModelInfoItem = {
  label: string;
  value: string;
  tone?: "default" | "success";
};

export type ModelReview = {
  id?: number;
  author: string;
  authorId?: number;
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
  tagline?: string;
  info: ModelInfoItem[];
  externalUrl?: string;
  reviews: ModelReview[];
};
