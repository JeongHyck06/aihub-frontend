export type NavigationItem = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type CategoryItem = {
  slug: string;
  title: string;
  description: string;
  serviceCount: number;
  href: string;
};

export type PopularService = {
  rank: number;
  id: string;
  name: string;
  provider: string;
  price: string;
  rating: number;
  reviewCount: number;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  titleLines: string[];
  description: string;
  searchPlaceholder: string;
};

export type HomeSummary = {
  hero: HeroContent;
  stats: StatItem[];
  hotKeywords: string[];
};
