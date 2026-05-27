export type FilterOption = {
  label: string;
  value: string;
  count?: number;
  defaultChecked?: boolean;
};

export type FilterGroup = {
  title: string;
  type: "checkbox" | "radio";
  name: string;
  options: FilterOption[];
};

export type SearchResultService = {
  id: string;
  name: string;
  provider: string;
  category?: string;
  categorySlug?: string;
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  href: string;
  badges?: string[];
  bestMatch?: boolean;
  keywords?: string[];
};

export type SearchPageMeta = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};
