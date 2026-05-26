import type { ButtonHTMLAttributes } from "react";
import { AuthImageSlot } from "@/components/common/auth-image-slot";
import { cn } from "@/lib/utils";
import type { SocialProvider } from "@/types/auth";

export type SocialLoginButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: SocialProvider;
};

const providerClassName: Record<SocialProvider["variant"], string> = {
  light: "border border-[#e0e5f0] bg-white text-[#0d121a]",
  dark: "bg-[#0d121a] text-white",
  kakao: "bg-[#fee500] text-[#0d121a]",
};

const iconClassName: Record<SocialProvider["variant"], string> = {
  light: "bg-[#f8f9fb]",
  dark: "bg-white/15 invert",
  kakao: "bg-[#39240a]",
};

export function SocialLoginButton({
  provider,
  className,
  ...props
}: SocialLoginButtonProps) {
  return (
    <button
      className={cn(
        "flex h-14 w-full items-center justify-center gap-3 rounded-[14px] text-[15px] font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
        providerClassName[provider.variant],
        className,
      )}
      type="button"
      {...props}
    >
      <AuthImageSlot
        alt={`${provider.iconLabel} 아이콘 기본 이미지`}
        className={iconClassName[provider.variant]}
      />
      {provider.label}
    </button>
  );
}
