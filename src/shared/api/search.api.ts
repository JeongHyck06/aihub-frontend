import { apiGet } from "@/shared/api/client";
import type {
  FilterGroup,
  SearchPageMeta,
  SearchResultService,
} from "@/types/search";

type SearchResultResponse = {
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

type PagedResponse<T> = {
  data: T[];
  meta: SearchPageMeta;
};

export type SearchQuery = {
  query?: string;
  categories?: string;
  page?: number;
  size?: number;
  sort?: "popular" | "rating" | "newest";
};

export async function searchServices(
  query: SearchQuery = {},
): Promise<PagedResponse<SearchResultService>> {
  const params: Record<string, string | number> = {};
  if (query.query) params.query = query.query;
  if (query.categories) params.categories = query.categories;
  if (query.page !== undefined) params.page = query.page;
  if (query.size !== undefined) params.size = query.size;
  if (query.sort) params.sort = query.sort;

  return apiGet<PagedResponse<SearchResultResponse>>("/search", { params });
}

export async function getSearchFilters(): Promise<FilterGroup[]> {
  return apiGet<FilterGroup[]>("/search/filters");
}
