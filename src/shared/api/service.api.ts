import { apiGet, apiPost } from "@/shared/api/client";
import type { ModelDetail, ModelReview } from "@/types/model";

type ServiceDetailResponse = {
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
  info: Array<{ label: string; value: string; tone?: string | null }>;
  externalUrl?: string;
};

type ReviewApiResponse = {
  id: number;
  author: { id: number; displayName: string };
  rating: number;
  body: string;
  createdAt: string;
};

type PagedResponse<T> = {
  data: T[];
  meta: { page: number; size: number; totalElements: number; totalPages: number };
};

export async function getServiceDetail(slug: string): Promise<ModelDetail> {
  const response = await apiGet<ServiceDetailResponse>(`/services/${slug}`);
  return {
    id: response.id,
    name: response.name,
    provider: response.provider,
    category: response.category,
    rating: response.rating,
    reviewCount: response.reviewCount,
    heroBadges: response.heroBadges,
    description: response.description,
    features: response.features,
    tags: response.tags,
    tagline: response.tagline,
    info: response.info.map((item) => ({
      label: item.label,
      value: item.value,
      tone: item.tone === "success" ? "success" : "default",
    })),
    externalUrl: response.externalUrl,
    reviews: [],
  };
}

export async function getServiceReviews(
  slug: string,
  options: { page?: number; size?: number; sort?: "newest" | "rating" } = {},
): Promise<{ items: ModelReview[]; meta: PagedResponse<unknown>["meta"] }> {
  const params: Record<string, string | number> = {};
  if (options.page !== undefined) params.page = options.page;
  if (options.size !== undefined) params.size = options.size;
  if (options.sort) params.sort = options.sort;

  const response = await apiGet<PagedResponse<ReviewApiResponse>>(
    `/services/${slug}/reviews`,
    { params },
  );

  return {
    items: response.data.map((review) => ({
      id: review.id,
      author: review.author.displayName,
      authorId: review.author.id,
      rating: review.rating,
      body: review.body,
      date: review.createdAt.slice(0, 10).replace(/-/g, "."),
    })),
    meta: response.meta,
  };
}

export async function createServiceReview(
  slug: string,
  payload: { rating: number; body: string },
): Promise<ModelReview> {
  const review = await apiPost<ReviewApiResponse>(`/services/${slug}/reviews`, payload);
  return {
    id: review.id,
    author: review.author.displayName,
    authorId: review.author.id,
    rating: review.rating,
    body: review.body,
    date: review.createdAt.slice(0, 10).replace(/-/g, "."),
  };
}
