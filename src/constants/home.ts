import type { NavigationItem } from "@/types/home";

export const SITE_NAVIGATION: NavigationItem[] = [
  { label: "검색", href: "/search" },
  { label: "비교", href: "/compare" },
  { label: "추천", href: "/recommend" },
  { label: "커뮤니티", href: "/community" },
];

export const CATEGORY_SECTION = {
  title: "카테고리별 탐색",
  description: "목적에 맞는 AI 카테고리를 골라 더 빠르게 탐색해보세요.",
};

export const POPULAR_SECTION = {
  title: "이번 주 인기 서비스",
  description: "일주일간 조회수와 리뷰수를 기준으로 선별한 특별한 AI 서비스입니다.",
};

export const FOOTER_LINKS = ["이용약관", "개인정보", "지원"];
