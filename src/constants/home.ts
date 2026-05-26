import type {
  CategoryItem,
  NavigationItem,
  PopularService,
  StatItem,
} from "@/types/home";

export const SITE_NAVIGATION: NavigationItem[] = [
  { label: "검색", href: "/search" },
  { label: "비교", href: "/#compare" },
  { label: "추천", href: "/#recommend" },
  { label: "커뮤니티", href: "/#community" },
];

export const HOT_SEARCH_KEYWORDS = [
  "코딩",
  "글쓰기",
  "이미지",
  "무료 API",
  "GPT-4o",
];

export const HERO_CONTENT = {
  eyebrow: "AI 서비스 탐색 플랫폼",
  title: ["더 나은 AI를", "찾는 가장 빠른 방법"],
  description:
    "120+ AI 서비스를 가격, 기능, 리뷰로 한번에 비교하고 나에게 꼭 맞는 도구를 발견하세요.",
  searchPlaceholder: "코딩, 문서작성, 이미지 생성 등으로 검색하세요",
};

export const PLATFORM_STATS: StatItem[] = [
  { value: "120+", label: "등록된 AI 서비스" },
  { value: "8K+", label: "월간 비교 이용" },
  { value: "4.9", label: "평균 만족도" },
  { value: "2.4K", label: "누적 리뷰" },
];

export const CATEGORY_SECTION = {
  title: "카테고리별 탐색",
  description: "목적에 맞는 AI 카테고리를 골라 더 빠르게 탐색해보세요.",
};

export const AI_CATEGORIES: CategoryItem[] = [
  {
    title: "코딩 자동화",
    description: "Cursor, Copilot, Claude Code",
    serviceCount: 23,
    href: "#coding",
  },
  {
    title: "글쓰기 · 문서",
    description: "ChatGPT, Claude, Notion AI",
    serviceCount: 31,
    href: "#writing",
  },
  {
    title: "이미지 생성",
    description: "Midjourney, DALL-E, Stable Diffusion",
    serviceCount: 18,
    href: "#image",
  },
  {
    title: "음악 생성",
    description: "Suno, Udio, ElevenLabs",
    serviceCount: 12,
    href: "#music",
  },
  {
    title: "영상 생성",
    description: "Sora, Runway, Pika",
    serviceCount: 9,
    href: "#video",
  },
  {
    title: "검색 · Q&A",
    description: "Perplexity, You.com, Phind",
    serviceCount: 11,
    href: "#search-category",
  },
];

export const POPULAR_SECTION = {
  title: "이번 주 인기 서비스",
  description: "일주일간 조회수와 리뷰수를 기준으로 선별한 특별한 AI 서비스입니다.",
};

export const POPULAR_SERVICES: PopularService[] = [
  {
    rank: 1,
    name: "ChatGPT",
    provider: "OpenAI",
    price: "무료/Plus $20",
    rating: 4.8,
    reviewCount: 1243,
    href: "/models/chatgpt",
  },
  {
    rank: 2,
    name: "Claude",
    provider: "Anthropic",
    price: "무료/Pro $20",
    rating: 4.7,
    reviewCount: 892,
    href: "#claude",
  },
  {
    rank: 3,
    name: "Cursor",
    provider: "Anysphere",
    price: "Pro $20",
    rating: 4.9,
    reviewCount: 734,
    href: "#cursor",
  },
  {
    rank: 4,
    name: "Midjourney",
    provider: "Midjourney",
    price: "월 $10부터",
    rating: 4.6,
    reviewCount: 612,
    href: "#midjourney",
  },
];

export const FOOTER_LINKS = ["이용약관", "개인정보", "지원"];
