export type ApiResponse<T> = {
  data: T;
};

export type ApiErrorBody = {
  code: string;
  message: string;
  fields?: Record<string, string>;
};

export type ApiErrorResponse = {
  error: ApiErrorBody;
};
