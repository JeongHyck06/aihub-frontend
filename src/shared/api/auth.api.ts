import { apiPost } from "@/shared/api/client";
import type {
  AuthLoginApiResponse,
  EmailVerifyResult,
  KakaoLoginRequest,
  LoginRequest,
  RefreshTokenRequest,
  SendCodeResult,
  SignupRequest,
  SignupResult,
} from "@/features/auth/types/auth.types";

export function kakaoLogin(payload: KakaoLoginRequest) {
  return apiPost<AuthLoginApiResponse>("/auth/oauth/kakao/callback", payload);
}

export function oauthCallback(
  provider: string,
  code: string,
  redirectUri: string,
) {
  return apiPost<AuthLoginApiResponse>(`/auth/oauth/${provider}/callback`, {
    code,
    redirectUri,
  });
}

export function login(payload: LoginRequest) {
  return apiPost<AuthLoginApiResponse>("/auth/login", payload);
}

export function logout() {
  return apiPost<void>("/auth/logout");
}

export function refreshToken(payload: RefreshTokenRequest) {
  return apiPost<AuthLoginApiResponse>("/auth/refresh", payload);
}

export function signup(payload: SignupRequest) {
  return apiPost<SignupResult>("/auth/signup", payload);
}

export function sendEmailCode(email: string) {
  return apiPost<SendCodeResult>("/auth/email/send-code", { email });
}

export function verifyEmail(email: string, code: string) {
  return apiPost<EmailVerifyResult>("/auth/email/verify", { email, code });
}
