"use client";

import { useCallback, useState } from "react";
import { buildKakaoAuthorizeUrl } from "@/features/auth/utils/kakao-oauth";

export function useKakaoLogin() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startKakaoLogin = useCallback(() => {
    setErrorMessage(null);

    try {
      window.location.href = buildKakaoAuthorizeUrl();
    } catch {
      setErrorMessage(
        "카카오 로그인 설정이 없습니다. .env.local에 NEXT_PUBLIC_KAKAO_CLIENT_ID를 설정해 주세요.",
      );
    }
  }, []);

  return {
    startKakaoLogin,
    errorMessage,
    clearError: () => setErrorMessage(null),
  };
}
