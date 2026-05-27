import { apiGet, apiPost } from "@/shared/api/client";
import type {
  AdminModelRequest,
  AdminModelRequestStats,
} from "@/types/admin";
import type { ModelRegisterRequest } from "@/types/model-register";

type CreateModelRequestResponse = {
  id: number;
  status: string;
  submittedAt: string;
  guide: Array<{ title: string; description: string }>;
};

type ModelRequestApiResponse = {
  id: number;
  serviceName: string;
  url: string;
  categorySlug: string;
  category: string;
  submitter: string;
  submittedAt: string;
  description: string;
  features: string[];
  pricePolicy: string;
  apiDocUrl?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason?: string | null;
};

type AdminModelRequestPageResponse = {
  data: {
    stats: AdminModelRequestStats;
    items: ModelRequestApiResponse[];
  };
  meta: { page: number; size: number; totalElements: number; totalPages: number };
};

function toAdminModelRequest(item: ModelRequestApiResponse): AdminModelRequest {
  return {
    id: item.id,
    serviceName: item.serviceName,
    url: item.url,
    category: item.category,
    categorySlug: item.categorySlug,
    submitter: item.submitter,
    submittedAt: item.submittedAt.slice(0, 10).replace(/-/g, "."),
    description: item.description,
    features: item.features ?? [],
    status: item.status.toLowerCase() as AdminModelRequest["status"],
  };
}

export async function submitModelRequest(payload: ModelRegisterRequest) {
  return apiPost<CreateModelRequestResponse>("/model-requests", payload);
}

export async function getMyModelRequests() {
  return apiGet<{
    data: ModelRequestApiResponse[];
    meta: AdminModelRequestPageResponse["meta"];
  }>("/me/model-requests");
}

export async function getAdminModelRequests(status: string = "PENDING") {
  const response = await apiGet<AdminModelRequestPageResponse>(
    "/admin/model-requests",
    { params: { status } },
  );

  return {
    stats: response.data.stats,
    items: response.data.items.map(toAdminModelRequest),
    meta: response.meta,
  };
}

export async function approveModelRequest(id: number) {
  return apiPost<ModelRequestApiResponse>(
    `/admin/model-requests/${id}/approve`,
    {},
  ).then(toAdminModelRequest);
}

export async function rejectModelRequest(id: number, reason: string) {
  return apiPost<ModelRequestApiResponse>(`/admin/model-requests/${id}/reject`, {
    reason,
  }).then(toAdminModelRequest);
}
