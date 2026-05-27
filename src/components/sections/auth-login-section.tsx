"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthField } from "@/components/common/auth-field";
import { SocialLoginButton } from "@/components/common/social-login-button";
import { Button } from "@/components/ui/button";
import { SOCIAL_PROVIDERS } from "@/constants/auth";
import { KakaoLoginButton } from "@/features/auth/components/kakao-login-button";
import { normalizeAuthLoginResponse } from "@/features/auth/types/auth.types";
import { buildOAuthAuthorizeUrl } from "@/lib/auth/oauth";
import { ApiError, login } from "@/shared/api";
import { saveAuthSession } from "@/shared/utils/auth-session";
import type { OAuthProviderId } from "@/types/auth-api";

const NON_KAKAO_PROVIDERS = SOCIAL_PROVIDERS.filter(
  (provider) => provider.id !== "kakao",
);

export function AuthLoginSection() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSocialLogin = (providerId: OAuthProviderId) => {
    setErrorMessage("");

    try {
      window.location.href = buildOAuthAuthorizeUrl(providerId);
    } catch {
      setErrorMessage(
        "소셜 로그인 설정이 없습니다. .env.local에 OAuth 클라이언트 ID를 설정해 주세요.",
      );
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const response = await login({ email, password });
      saveAuthSession(normalizeAuthLoginResponse(response));
      router.push("/profile");
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-1 justify-center bg-white px-5 py-10 lg:justify-start lg:px-0 lg:py-0">
      <div className="w-full max-w-[400px] lg:ml-60 lg:pt-[60px]">
        <p className="text-right text-sm font-medium leading-5 text-[#616e80]">
          계정이 없으세요?{" "}
          <Link className="font-bold text-blue-600" href="/signup">
            회원가입
          </Link>
        </p>

        <div className="mt-12 h-1.5 w-[72px] rounded-[3px] bg-blue-600" />
        <h1 className="mt-10 text-4xl font-extrabold leading-tight text-[#0d121a]">
          환영합니다
        </h1>
        <p className="mt-3 text-base font-medium leading-6 text-[#616e80]">
          AIHUB에 로그인하고 더 나은 AI를 만나보세요.
        </p>

        <div className="mt-12 space-y-4">
          <KakaoLoginButton disabled={isSubmitting} />
          {NON_KAKAO_PROVIDERS.map((provider) => (
            <SocialLoginButton
              aria-label={`${provider.label}`}
              disabled={isSubmitting}
              key={provider.id}
              onClick={() => handleSocialLogin(provider.id)}
              provider={provider}
            />
          ))}
        </div>

        <div className="my-11 flex items-center gap-5">
          <div className="h-px flex-1 bg-[#e0e5f0]" />
          <span className="text-[13px] font-semibold text-[#8c99ab]">또는</span>
          <div className="h-px flex-1 bg-[#e0e5f0]" />
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <AuthField
            autoComplete="email"
            disabled={isSubmitting}
            id="login-email"
            label="이메일"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
          />
          <div>
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-bold leading-5 text-[#384252]"
                htmlFor="login-password"
              >
                비밀번호
              </label>
              <Link className="text-[13px] font-bold text-blue-600" href="#forgot-password">
                비밀번호 찾기
              </Link>
            </div>
            <input
              className="mt-1.5 h-14 w-full rounded-[14px] border border-[#e0e5f0] bg-white px-6 text-[15px] font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
              disabled={isSubmitting}
              id="login-password"
              minLength={8}
              name="password"
              placeholder="비밀번호를 입력하세요"
              required
              autoComplete="current-password"
              type="password"
            />
          </div>

          {errorMessage ? (
            <p className="text-sm font-semibold text-red-600" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <Button
            className="h-14 w-full rounded-[14px]"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "로그인 중…" : "이메일로 로그인"}
          </Button>
          <Button
            className="h-[52px] w-full rounded-[14px] border border-[#e0e5f0] bg-[#f8f9fb]"
            href="/signup"
            variant="secondary"
          >
            이메일로 가입하기
          </Button>
        </form>

        <p className="mt-5 text-center text-xs font-medium leading-5 text-[#8c99ab]">
          계속하면 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
        </p>
      </div>
    </section>
  );
}
