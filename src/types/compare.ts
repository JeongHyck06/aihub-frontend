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

export type CompareRow = {
  label: string;
  getValue: (service: CompareService) => string;
};
