export type AdminModelRequestStatus = "pending" | "approved" | "rejected";

export type AdminModelRequest = {
  id: string;
  serviceName: string;
  url: string;
  category: string;
  submitter: string;
  submittedAt: string;
  description: string;
  status: AdminModelRequestStatus;
};

export type AdminService = {
  id: string;
  name: string;
  company: string;
  price: string;
  apiSupport: "지원" | "제한적" | "미지원";
};
