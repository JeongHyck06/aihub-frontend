"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { AuthField } from "@/components/common/auth-field";
import { Button } from "@/components/ui/button";

export function AuthSignupSection() {
  const router = useRouter();

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

    if (password !== passwordConfirm) {
      event.currentTarget
        .querySelector<HTMLInputElement>("#signup-password-confirm")
        ?.setCustomValidity("비밀번호가 일치하지 않습니다.");
      event.currentTarget.reportValidity();
      return;
    }

    event.currentTarget
      .querySelector<HTMLInputElement>("#signup-password-confirm")
      ?.setCustomValidity("");
    router.push(`/email-verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <section className="flex min-h-screen flex-1 justify-center bg-white px-5 py-10 lg:justify-start lg:px-0 lg:py-0">
      <div className="w-full max-w-[408px] lg:ml-60 lg:pt-[60px]">
        <p className="text-right text-sm font-medium leading-5 text-[#616e80]">
          이미 계정이 있으세요?{" "}
          <Link className="font-bold text-blue-600" href="/login">
            로그인
          </Link>
        </p>

        <div className="mt-6 h-1.5 w-14 rounded-[3px] bg-blue-600" />
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#0d121a]">
          회원가입
        </h1>
        <p className="mt-2.5 text-[15px] font-medium leading-6 text-[#616e80]">
          모든 필드를 입력하면 이메일로 인증 코드를 보내드립니다.
        </p>

        <form className="mt-9 space-y-4" onSubmit={handleSignup}>
          <AuthField
            autoComplete="name"
            id="signup-name"
            label="이름"
            name="name"
            placeholder="홍길동"
            required
          />
          <AuthField
            autoComplete="email"
            id="signup-email"
            label="이메일"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
          />
          <AuthField
            autoComplete="new-password"
            id="signup-password"
            label="비밀번호"
            minLength={8}
            name="password"
            placeholder="8자 이상, 영문/숫자/특수문자 포함"
            required
            type="password"
          />
          <AuthField
            autoComplete="new-password"
            id="signup-password-confirm"
            label="비밀번호 확인"
            minLength={8}
            name="passwordConfirm"
            placeholder="비밀번호를 다시 입력하세요"
            required
            type="password"
          />

          <div className="space-y-3 pt-1">
            <label className="flex items-center gap-2 text-[13px] font-medium leading-5 text-[#616e80]">
              <input
                className="h-[18px] w-[18px] rounded border-[#e0e5f0] text-blue-600 focus:ring-blue-600"
                name="terms"
                required
                type="checkbox"
              />
              (필수) 이용약관 및 개인정보 처리방침에 동의합니다.
            </label>
            <label className="flex items-center gap-2 text-[13px] font-medium leading-5 text-[#8c99ab]">
              <input
                className="h-[18px] w-[18px] rounded border-[#e0e5f0] text-blue-600 focus:ring-blue-600"
                name="marketing"
                type="checkbox"
              />
              (선택) 마케팅 정보 수신 동의
            </label>
          </div>

          {/* TODO: 회원가입 API가 준비되면 실제 가입 mutation 후 인증 페이지로 이동합니다. */}
          <Button className="h-14 w-full rounded-[14px]" type="submit">
            이메일로 가입하기
          </Button>
        </form>

        <p className="mt-5 text-xs font-medium leading-5 text-[#8c99ab]">
          이미 이메일을 사용하고 계시는가요? 이미 가입된 계정으로 자동으로 로그인됩니다.
        </p>
      </div>
    </section>
  );
}
