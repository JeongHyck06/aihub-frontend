export type RecommendOption = {
  label: string;
  value: string;
};

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type RecommendCriteria = {
  job: string;
  purpose: string;
  budget: string;
};
