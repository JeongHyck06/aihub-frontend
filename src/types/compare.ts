export type CompareService = {
  id: string;
  name: string;
  provider: string;
  category: string;
  price: string;
  rating: number;
  apiSupport: string;
  bestFor: string;
  strengths: string[];
  href: string;
};

export type CompareRowDescriptor = {
  label: string;
  field: keyof CompareService | string;
  formatter?: string | null;
};

export type CompareRow = {
  label: string;
  getValue: (service: CompareService) => string;
};

export type CompareInsight = {
  verdict: string;
  byScenario: Array<{
    scenario: string;
    winner: string;
    reason: string;
  }>;
  model?: string;
  generatedAt?: string;
  cached?: boolean;
};
