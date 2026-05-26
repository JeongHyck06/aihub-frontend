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
