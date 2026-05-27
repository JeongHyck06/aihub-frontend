import type { AuthBrandContent, SocialProvider } from "@/types/auth";

export const LOGIN_BRAND_CONTENT: AuthBrandContent = {
  headline: ["더 나은 AI를", "찾는 가장 빠른 방법"],
  description: ["AI 서비스를 비교하고 추천 받아", "나에게 꼭 맞는 도구를 발견하세요."],
  footer: "© 2026 AIHUB. 안전한 로그인, 언제든 해제 가능",
  stats: [
    { value: "120+", label: "등록된 AI" },
    { value: "8K+", label: "월간 비교" },
    { value: "4.9", label: "평균 만족도" },
  ],
};

export const SIGNUP_BRAND_CONTENT: AuthBrandContent = {
  headline: ["AIHUB와 함께", "AI 탐색을 시작하세요"],
  description: [
    "무료로 시작하고, 120개 이상의 AI 서비스를",
    "비교하고 내게 맞는 도구를 발견하세요.",
  ],
  footer: "© 2026 AIHUB. 안전한 가입, 언제든 해제 가능",
};

export const SOCIAL_PROVIDERS: SocialProvider[] = [
  { id: "google", label: "Google로 계속하기", iconLabel: "Google", variant: "light" },
  { id: "github", label: "GitHub로 계속하기", iconLabel: "GH", variant: "dark" },
  { id: "kakao", label: "카카오로 계속하기", iconLabel: "K", variant: "kakao" },
];
