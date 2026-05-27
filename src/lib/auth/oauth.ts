import type { OAuthProviderId } from "@/types/auth-api";

type OAuthProviderConfig = {
  id: OAuthProviderId;
  clientId: string;
  authorizeUrl: string;
  scope: string;
  extraParams?: Record<string, string>;
};

const OAUTH_PROVIDERS: Record<OAuthProviderId, OAuthProviderConfig> = {
  google: {
    id: "google",
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "openid email profile",
    extraParams: {
      access_type: "offline",
      prompt: "consent",
    },
  },
  kakao: {
    id: "kakao",
    clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? "",
    authorizeUrl: "https://kauth.kakao.com/oauth/authorize",
    scope: "openid profile_nickname account_email",
  },
  github: {
    id: "github",
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
    authorizeUrl: "https://github.com/login/oauth/authorize",
    scope: "user:email",
  },
};

export function getOAuthRedirectUri(provider: OAuthProviderId) {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.origin}/auth/callback/${provider}`;
}

export function buildOAuthAuthorizeUrl(provider: OAuthProviderId) {
  const config = OAUTH_PROVIDERS[provider];

  if (!config.clientId) {
    throw new Error(`${provider} OAuth client id가 설정되지 않았습니다.`);
  }

  const redirectUri = getOAuthRedirectUri(provider);
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: config.scope,
    ...config.extraParams,
  });

  return `${config.authorizeUrl}?${params.toString()}`;
}

export function isOAuthProvider(value: string): value is OAuthProviderId {
  return value === "google" || value === "kakao" || value === "github";
}
