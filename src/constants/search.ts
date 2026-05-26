import type { FilterGroup, SearchResultService } from "@/types/search";

export const SEARCH_PAGE_CONTENT = {
  title: "AI 서비스 검색",
  description: "키워드와 필터를 조합해 원하는 AI 서비스를 몇 초 안에 찾아보세요.",
  defaultQuery: "코딩",
  resultMeta: "총 23개 서비스 · 코딩 카테고리 · API 지원",
};

export const SEARCH_FILTER_GROUPS: FilterGroup[] = [
  {
    title: "카테고리",
    type: "checkbox",
    name: "category",
    options: [
      { label: "코딩", value: "coding", count: 23, defaultChecked: true },
      { label: "글쓰기 · 문서", value: "writing", count: 31 },
      { label: "이미지 생성", value: "image", count: 18 },
      { label: "음악 생성", value: "music", count: 12 },
      { label: "영상 생성", value: "video", count: 9 },
      { label: "검색 · Q&A", value: "qa", count: 11 },
    ],
  },
  {
    title: "가격",
    type: "checkbox",
    name: "price",
    options: [
      { label: "무료", value: "free" },
      { label: "프리미엄", value: "premium" },
      { label: "월 $20 이하", value: "under-20" },
      { label: "월 $20 초과", value: "over-20" },
    ],
  },
  {
    title: "지원",
    type: "checkbox",
    name: "support",
    options: [
      { label: "API 지원", value: "api", defaultChecked: true },
      { label: "IDE 통합", value: "ide" },
      { label: "한국어 지원", value: "korean" },
      { label: "상업적 사용", value: "commercial" },
    ],
  },
  {
    title: "평점",
    type: "radio",
    name: "rating",
    options: [
      { label: "★ 4.0 이상", value: "4", defaultChecked: true },
      { label: "★ 3.0 이상", value: "3" },
      { label: "전체", value: "all" },
    ],
  },
];

export const SEARCH_RESULTS: SearchResultService[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    provider: "OpenAI",
    price: "무료/Plus $20",
    rating: 4.8,
    reviewCount: 1243,
    description: "범용 대화부터 코딩 보조까지 폭넓게 활용 가능",
    href: "/models/chatgpt",
    badges: ["BEST MATCH"],
    bestMatch: true,
  },
];
