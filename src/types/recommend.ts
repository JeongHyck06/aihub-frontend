export type RecommendOption = {
  label: string;
  value: string;
};

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  reason?: string | null;
  href: string;
  score?: number | null;
};

export type RecommendCriteria = {
  job: string;
  purpose: string;
  budget: string;
};

export type RecommendOptions = {
  jobs: RecommendOption[];
  purposes: RecommendOption[];
  budgets: RecommendOption[];
  defaults: RecommendCriteria;
};

export type RecommendationGroup = {
  title: string;
  subtitle: string;
  items: Recommendation[];
};

export type NlRecommendation = RecommendationGroup & {
  interpreted: {
    job: string;
    purpose: string;
    budget: string;
    extraKeywords: string[];
  };
  model?: string | null;
  degraded?: boolean;
};
