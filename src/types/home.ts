export type NavigationItem = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type CategoryItem = {
  title: string;
  description: string;
  serviceCount: number;
  href: string;
};

export type PopularService = {
  rank: number;
  name: string;
  provider: string;
  price: string;
  rating: number;
  reviewCount: number;
  href: string;
};
