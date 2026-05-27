import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiErrorBody, ApiErrorResponse, ApiResponse } from "@/shared/types/api.types";

export class ApiError extends Error {
  code: string;
  fields?: Record<string, string>;

  constructor(error: ApiErrorBody) {
    super(error.message);
    this.name = "ApiError";
    this.code = error.code;
    this.fields = error.fields;
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8080/api/v1";

type AccessTokenGetter = () => string | null;

let accessTokenGetter: AccessTokenGetter | null = null;

export function setAccessTokenGetter(getter: AccessTokenGetter) {
  accessTokenGetter = getter;
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = accessTokenGetter?.();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      const body = response.data as ApiResponse<unknown> | undefined;
      if (body && "data" in body) {
        response.data = body.data;
      }
      return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
      const errorBody = error.response?.data?.error;
      if (errorBody) {
        return Promise.reject(new ApiError(errorBody));
      }

      return Promise.reject(
        new ApiError({
          code: "INTERNAL_ERROR",
          message: "요청 처리 중 오류가 발생했습니다.",
        }),
      );
    },
  );

  return client;
}

export const apiClient = createApiClient();

export function addRequestInterceptor(
  onFulfilled: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
) {
  return apiClient.interceptors.request.use(onFulfilled);
}

export function addResponseInterceptor(
  onRejected: (error: unknown) => unknown,
) {
  return apiClient.interceptors.response.use((response) => response, onRejected);
}

export async function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  const response = await apiClient.get<T>(url, config);
  return response.data;
}

export async function apiPost<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

export async function apiPut<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
}

export async function apiPatch<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  const response = await apiClient.patch<T>(url, data, config);
  return response.data;
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig) {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
}
