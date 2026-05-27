import { apiGet } from "@/shared/api/client";
import type { CategoryItem, HomeSummary, PopularService } from "@/types/home";

type HomeSummaryResponse = {
  hero: {
    eyebrow: string;
    titleLines: string[];
    description: string;
    searchPlaceholder: string;
  };
  stats: Array<{ value: string; label: string }>;
  hotKeywords: string[];
};

type CategoryResponse = {
  slug: string;
  title: string;
  description: string;
  serviceCount: number;
};

type PopularServiceResponse = {
  rank: number;
  id: string;
  name: string;
  provider: string;
  price: string;
  rating: number;
  reviewCount: number;
  href: string;
};

export async function getHomeSummary(): Promise<HomeSummary> {
  return apiGet<HomeSummaryResponse>("/home/summary");
}

export async function getCategories(): Promise<CategoryItem[]> {
  const response = await apiGet<CategoryResponse[]>("/categories");
  return response.map((category) => ({
    slug: category.slug,
    title: category.title,
    description: category.description,
    serviceCount: category.serviceCount,
    href: `/search?category=${encodeURIComponent(category.slug)}`,
  }));
}

export async function getPopularServices(limit = 4): Promise<PopularService[]> {
  return apiGet<PopularServiceResponse[]>("/services/popular", { params: { limit } });
}

export async function getHotKeywords(): Promise<string[]> {
  return apiGet<string[]>("/search/hot-keywords");
}
