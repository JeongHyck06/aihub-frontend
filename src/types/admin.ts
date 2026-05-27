export type AdminModelRequestStatus = "pending" | "approved" | "rejected";

export type AdminModelRequest = {
  id: number;
  serviceName: string;
  url: string;
  category: string;
  categorySlug?: string;
  submitter: string;
  submittedAt: string;
  description: string;
  features: string[];
  status: AdminModelRequestStatus;
};

export type AdminService = {
  id: string;
  name: string;
  company: string;
  price: string;
  apiSupport: "지원" | "제한적" | "미지원";
};

export type AdminServicePayload = {
  slug: string;
  name: string;
  provider: string;
  categorySlug: string;
  priceText: string;
  pricePolicy: "FREE" | "PAID" | "FREEMIUM";
  description: string;
  tagline?: string;
  url: string;
  apiDocUrl?: string;
  apiSupport: "YES" | "LIMITED" | "NO";
  features: string[];
  tags: string[];
};

export type AdminModelRequestStats = {
  pending: number;
  approved: number;
  rejected: number;
};
