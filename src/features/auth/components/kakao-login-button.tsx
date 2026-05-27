"use client";

import type { ButtonHTMLAttributes } from "react";
import { AuthImageSlot } from "@/components/common/auth-image-slot";
import { useKakaoLogin } from "@/features/auth/hooks/use-kakao-login";
import { cn } from "@/lib/utils";

export type KakaoLoginButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type"
> & {
  label?: string;
};

export function KakaoLoginButton({
  className,
  disabled,
  label = "카카오로 계속하기",
  ...props
}: KakaoLoginButtonProps) {
  const { startKakaoLogin, errorMessage } = useKakaoLogin();

  return (
    <div className="space-y-2">
      <button
        className={cn(
          "flex h-14 w-full items-center justify-center gap-3 rounded-[14px] text-[15px] font-bold transition-opacity disabled:opacity-60",
          "bg-[#fee500] text-[#0d121a]",
          className,
        )}
        disabled={disabled}
        onClick={startKakaoLogin}
        type="button"
        {...props}
      >
        <AuthImageSlot
          alt="카카오 아이콘"
          className="bg-[#39240a]"
          label="K"
        />
        {label}
      </button>
      {errorMessage ? (
        <p className="text-sm font-semibold text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
