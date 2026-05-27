import type { AuthLoginResponse, AuthUser } from "@/features/auth/types/auth.types";

const ACCESS_TOKEN_KEY = "aihub.accessToken";
const REFRESH_TOKEN_KEY = "aihub.refreshToken";
const USER_KEY = "aihub.user";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function saveAuthSession(session: AuthLoginResponse) {
  if (!canUseStorage()) {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getAccessToken() {
  if (!canUseStorage()) {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  if (!canUseStorage()) {
    return null;
  }

  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getAuthUser(): AuthUser | null {
  if (!canUseStorage()) {
    return null;
  }

  const raw = localStorage.getItem(USER_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export function setAuthSession({ user }: { user: AuthUser }) {
  if (!canUseStorage()) {
    return;
  }
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
