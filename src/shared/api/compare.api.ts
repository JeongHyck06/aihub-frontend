import { apiDelete, apiGet, apiPost } from "@/shared/api/client";
import type {
  CompareInsight,
  CompareRowDescriptor,
  CompareService,
} from "@/types/compare";

type CompareApiResponse = {
  services: CompareService[];
  rows: CompareRowDescriptor[];
};

export async function getCompare(ids: string[]): Promise<CompareApiResponse> {
  return apiGet<CompareApiResponse>("/compare", { params: { ids: ids.join(",") } });
}

export async function getCompareInsight(ids: string[]): Promise<CompareInsight> {
  return apiGet<CompareInsight>("/compare/insight", { params: { ids: ids.join(",") } });
}

export async function getMyCompareList(): Promise<CompareService[]> {
  return apiGet<CompareService[]>("/me/compare");
}

export async function addToMyCompare(slug: string): Promise<CompareService[]> {
  return apiPost<CompareService[]>(`/me/compare/${slug}`);
}

export async function removeFromMyCompare(slug: string): Promise<CompareService[]> {
  return apiDelete<CompareService[]>(`/me/compare/${slug}`);
}
