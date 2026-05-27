export type AuthUser = {
  id: number;
  nickname: string;
  email?: string;
  role?: "USER" | "ADMIN";
  displayName?: string;
  profileImageUrl?: string | null;
};

export type AuthLoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type KakaoLoginRequest = {
  code: string;
  redirectUri: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
  agreeMarketing?: boolean;
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

export type EmailVerifyResult = AuthLoginResponse;

export type UserProfile = {
  id: number;
  email: string;
  name: string;
  displayName: string;
  bio?: string;
  profileImageUrl?: string | null;
  role: "USER" | "ADMIN";
  stats?: {
    following: number;
    followers: number;
    reviews: number;
  };
};

export type UpdateProfileRequest = {
  displayName?: string;
  bio?: string;
};

/** Spring AuthUserResponse → 클라이언트 AuthUser */
export type AuthUserApiResponse = {
  id: number;
  email?: string;
  role?: "USER" | "ADMIN";
  displayName?: string;
  nickname?: string;
  profileImageUrl?: string | null;
};

export function normalizeAuthUser(user: AuthUserApiResponse): AuthUser {
  const nickname = user.nickname ?? user.displayName ?? user.email ?? "사용자";

  return {
    id: user.id,
    nickname,
    email: user.email,
    role: user.role,
    displayName: user.displayName,
    profileImageUrl: user.profileImageUrl ?? null,
  };
}

export type AuthLoginApiResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserApiResponse;
};

export function normalizeAuthLoginResponse(response: AuthLoginApiResponse): AuthLoginResponse {
  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    user: normalizeAuthUser(response.user),
  };
}
