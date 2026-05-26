import type { CompareRow, CompareService } from "@/types/compare";

export const COMPARE_PAGE_CONTENT = {
  title: "AI 서비스 비교",
  description:
    "관심 있는 AI 서비스를 나란히 비교하고 가격, 기능, 활용 목적을 한눈에 확인하세요.",
};

export const COMPARE_SERVICES: CompareService[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    provider: "OpenAI",
    category: "범용 AI 어시스턴트",
    price: "무료 / Plus $20",
    rating: 4.8,
    apiSupport: "지원함 (REST API)",
    bestFor: "문서 작성, 코딩 보조, 범용 업무",
    strengths: ["범용성이 높음", "멀티모달 지원", "플러그인/API 생태계"],
    href: "/models/chatgpt",
  },
  {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    category: "문서 · 분석",
    price: "무료 / Pro $20",
    rating: 4.7,
    apiSupport: "지원함",
    bestFor: "긴 문서 분석, 자연스러운 글쓰기",
    strengths: ["긴 컨텍스트 처리", "자연스러운 문장", "분석 작업에 강함"],
    href: "/search?query=Claude",
  },
  {
    id: "cursor",
    name: "Cursor",
    provider: "Anysphere",
    category: "코딩 자동화",
    price: "무료 / Pro $20",
    rating: 4.9,
    apiSupport: "제한적",
    bestFor: "코드베이스 기반 개발 자동화",
    strengths: ["프로젝트 맥락 이해", "에디터 통합", "대규모 코드 수정"],
    href: "/models/cursor",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    provider: "Midjourney",
    category: "이미지 생성",
    price: "월 $10부터",
    rating: 4.6,
    apiSupport: "미지원",
    bestFor: "고품질 비주얼 콘셉트 제작",
    strengths: ["이미지 품질", "스타일 다양성", "콘셉트 시안 제작"],
    href: "/search?query=Midjourney",
  },
];

export const COMPARE_ROWS: CompareRow[] = [
  { label: "개발사", getValue: (service) => service.provider },
  { label: "카테고리", getValue: (service) => service.category },
  { label: "가격", getValue: (service) => service.price },
  { label: "평점", getValue: (service) => `★ ${service.rating.toFixed(1)}` },
  { label: "API", getValue: (service) => service.apiSupport },
  { label: "추천 용도", getValue: (service) => service.bestFor },
];
