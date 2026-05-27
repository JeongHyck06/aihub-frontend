export type AuthUser = {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  displayName: string;
};

export type AuthTokenResult = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type SignupResult = {
  userId: number;
  email: string;
  emailVerificationRequired: boolean;
  devCode?: string | null;
};

export type SendCodeResult = {
  expiresInSeconds: number;
  devCode?: string | null;
};

export type ApiErrorBody = {
  code: string;
  message: string;
  fields?: Record<string, string>;
};

export type OAuthProviderId = "google" | "kakao" | "github";
