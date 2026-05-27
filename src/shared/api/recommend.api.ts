import { apiGet, apiPost } from "@/shared/api/client";
import type {
  NlRecommendation,
  RecommendCriteria,
  RecommendOptions,
  RecommendationGroup,
} from "@/types/recommend";

type RecommendOptionsResponse = {
  jobs: Array<{ value: string; label: string }>;
  purposes: Array<{ value: string; label: string }>;
  budgets: Array<{ value: string; label: string }>;
  defaults: RecommendCriteria;
};

type RecommendItemResponse = {
  id: string;
  title: string;
  description: string;
  reason?: string | null;
  serviceSlugs?: string[];
  href: string;
  score?: number | null;
};

type RecommendResponse = {
  title: string;
  subtitle: string;
  items: RecommendItemResponse[];
};

type NlRecommendApiResponse = RecommendResponse & {
  interpreted: {
    job: string;
    purpose: string;
    budget: string;
    extraKeywords: string[];
  };
  model?: string;
  degraded?: boolean;
};

export async function getRecommendOptions(): Promise<RecommendOptions> {
  return apiGet<RecommendOptionsResponse>("/recommend/options");
}

export async function recommendRuleBased(
  criteria: RecommendCriteria,
): Promise<RecommendationGroup> {
  return apiPost<RecommendResponse>("/recommend/rule-based", criteria);
}

export async function recommendNaturalLanguage(query: string): Promise<NlRecommendation> {
  return apiPost<NlRecommendApiResponse>("/recommend/natural-language", { query });
}
