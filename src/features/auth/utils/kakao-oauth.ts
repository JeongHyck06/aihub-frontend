const KAKAO_AUTHORIZE_URL = "https://kauth.kakao.com/oauth/authorize";

/**
 * 카카오 동의항목 ID (공백 구분).
 * - `profile` 은 유효하지 않음 → KOE205(invalid_scope) 발생
 * - OIDC 사용 시 콘솔에서 OpenID Connect 활성화 + `openid` 필요
 * @see https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-authorize-scope
 */
const DEFAULT_KAKAO_SCOPE = "openid profile_nickname account_email";

function getKakaoScope() {
  return process.env.NEXT_PUBLIC_KAKAO_SCOPE?.trim() || DEFAULT_KAKAO_SCOPE;
}

export const KAKAO_CALLBACK_PATH = "/auth/callback/kakao";

export function getKakaoClientId() {
  return process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? "";
}

export function getKakaoRedirectUri() {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.origin}${KAKAO_CALLBACK_PATH}`;
}

export function buildKakaoAuthorizeUrl() {
  const clientId = getKakaoClientId();

  if (!clientId) {
    throw new Error("Kakao OAuth client id가 설정되지 않았습니다.");
  }

  const redirectUri = getKakaoRedirectUri();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: getKakaoScope(),
  });

  return `${KAKAO_AUTHORIZE_URL}?${params.toString()}`;
}
