"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { normalizeAuthLoginResponse } from "@/features/auth/types/auth.types";
import { getKakaoRedirectUri } from "@/features/auth/utils/kakao-oauth";
import { ApiError, kakaoLogin } from "@/shared/api";
import { saveAuthSession } from "@/shared/utils/auth-session";

export function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const oauthError = searchParams.get("error");

    if (oauthError) {
      setErrorMessage("카카오 로그인이 취소되었습니다.");
      return;
    }

    if (!code) {
      setErrorMessage("인증 코드가 없습니다. 다시 로그인해 주세요.");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const response = await kakaoLogin({
          code,
          redirectUri: getKakaoRedirectUri(),
        });

        if (cancelled) {
          return;
        }

        saveAuthSession(normalizeAuthLoginResponse(response));
        router.replace("/");
      } catch (error) {
        if (cancelled) {
          return;
        }

        if (error instanceof ApiError) {
          setErrorMessage(error.message);
          return;
        }

        setErrorMessage("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#e0e5f0] bg-white p-10 text-center">
      {errorMessage ? (
        <>
          <h1 className="text-2xl font-extrabold text-[#0d121a]">로그인 실패</h1>
          <p className="mt-4 text-sm font-medium text-[#616e80]">{errorMessage}</p>
          <Link
            className="mt-8 inline-block text-sm font-bold text-blue-600"
            href="/login"
          >
            로그인 페이지로 돌아가기
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-extrabold text-[#0d121a]">로그인 처리 중</h1>
          <p className="mt-4 text-sm font-medium text-[#616e80]">
            카카오 계정 정보를 확인하고 있습니다…
          </p>
        </>
      )}
    </div>
  );
}
