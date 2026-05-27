import { apiDelete, apiGet, apiPatch, apiPost } from "@/shared/api/client";
import type { CommunityCategory, CommunityPost } from "@/types/community";

type CommunityPostApiResponse = {
  id: number;
  category: string;
  title: string;
  preview?: string;
  body?: string;
  author: { id: number; displayName: string };
  createdAt: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
};

type PagedResponse<T> = {
  data: T[];
  meta: { page: number; size: number; totalElements: number; totalPages: number };
};

function toPost(item: CommunityPostApiResponse): CommunityPost {
  return {
    id: item.id,
    category: (item.category as Exclude<CommunityCategory, "all">) ?? "free",
    title: item.title,
    body: item.body,
    preview: item.preview,
    author: item.author.displayName,
    authorId: item.author.id,
    createdAt: item.createdAt.slice(0, 10).replace(/-/g, "."),
    views: item.viewCount,
    comments: item.commentCount,
    likes: item.likeCount,
  };
}

export async function listCommunityPosts(
  options: {
    category?: CommunityCategory;
    sort?: "newest" | "popular";
    page?: number;
    size?: number;
  } = {},
): Promise<{ items: CommunityPost[]; meta: PagedResponse<unknown>["meta"] }> {
  const params: Record<string, string | number> = {};
  if (options.category) params.category = options.category;
  if (options.sort) params.sort = options.sort;
  if (options.page !== undefined) params.page = options.page;
  if (options.size !== undefined) params.size = options.size;

  const response = await apiGet<PagedResponse<CommunityPostApiResponse>>(
    "/community/posts",
    { params },
  );

  return {
    items: response.data.map(toPost),
    meta: response.meta,
  };
}

export async function createCommunityPost(payload: {
  category: "QUESTION" | "FREE";
  title: string;
  body: string;
}): Promise<CommunityPost> {
  const response = await apiPost<CommunityPostApiResponse>("/community/posts", payload);
  return toPost(response);
}

export async function getCommunityPost(id: number): Promise<CommunityPost> {
  const response = await apiGet<CommunityPostApiResponse>(`/community/posts/${id}`);
  return toPost(response);
}

export async function updateCommunityPost(
  id: number,
  payload: { category: "QUESTION" | "FREE"; title: string; body: string },
): Promise<CommunityPost> {
  const response = await apiPatch<CommunityPostApiResponse>(`/community/posts/${id}`, payload);
  return toPost(response);
}

export async function deleteCommunityPost(id: number): Promise<void> {
  await apiDelete<void>(`/community/posts/${id}`);
}
