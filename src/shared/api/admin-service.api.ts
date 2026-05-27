import { apiDelete, apiGet, apiPatch, apiPost } from "@/shared/api/client";
import type { AdminService, AdminServicePayload } from "@/types/admin";

type AdminServiceApiResponse = {
  id: string;
  name: string;
  company: string;
  price: string;
  apiSupport: "지원" | "제한적" | "미지원";
};

type PagedResponse<T> = {
  data: T[];
  meta: { page: number; size: number; totalElements: number; totalPages: number };
};

export async function listAdminServices(query?: string): Promise<AdminService[]> {
  const params: Record<string, string | number> = { page: 0, size: 50 };
  if (query) params.query = query;
  const response = await apiGet<PagedResponse<AdminServiceApiResponse>>(
    "/admin/services",
    { params },
  );
  return response.data;
}

export async function createAdminService(payload: AdminServicePayload): Promise<AdminService> {
  return apiPost<AdminServiceApiResponse>("/admin/services", payload);
}

export async function updateAdminService(
  idOrSlug: string,
  payload: AdminServicePayload,
): Promise<AdminService> {
  return apiPatch<AdminServiceApiResponse>(`/admin/services/${idOrSlug}`, payload);
}

export async function deleteAdminService(idOrSlug: string): Promise<void> {
  await apiDelete<void>(`/admin/services/${idOrSlug}`);
}
