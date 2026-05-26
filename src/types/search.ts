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
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  href: string;
  badges?: string[];
  bestMatch?: boolean;
};
