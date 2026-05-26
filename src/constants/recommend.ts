import type {
  RecommendCriteria,
  Recommendation,
  RecommendOption,
} from "@/types/recommend";

export const RECOMMEND_PAGE_CONTENT = {
  title: "맞춤형 추천",
  description: "직업, 사용 목적, 예산만 선택하면 룰 기반으로 추천합니다.",
  formTitle: "조건 선택",
  naturalLanguageTitle: "자연어로 추천받기",
  naturalLanguageDescription:
    "사용 환경을 자유롭게 설명하면 AI가 가장 적합한 서비스를 추천합니다.",
  naturalLanguagePlaceholder:
    "React 개발자인데 코딩 자동화하고 싶어요. 월 $20 이하로 제일 잘 맞는 AI가 뭘까요?",
  naturalLanguageExample:
    '예: "이미지 생성을 하는데 무료로 상업적 사용가능한 커스텀 스타일 아바타 기능이 필요해"',
};

export const DEFAULT_RECOMMEND_CRITERIA: RecommendCriteria = {
  job: "developer",
  purpose: "coding",
  budget: "under-20",
};

export const JOB_OPTIONS: RecommendOption[] = [
  { label: "개발자", value: "developer" },
  { label: "마케터", value: "marketer" },
  { label: "디자이너", value: "designer" },
  { label: "기획자", value: "planner" },
  { label: "학생", value: "student" },
];

export const PURPOSE_OPTIONS: RecommendOption[] = [
  { label: "코딩", value: "coding" },
  { label: "글쓰기", value: "writing" },
  { label: "이미지 생성", value: "image" },
  { label: "검색 / 리서치", value: "research" },
  { label: "업무 자동화", value: "automation" },
];

export const BUDGET_OPTIONS: RecommendOption[] = [
  { label: "무료", value: "free" },
  { label: "월 $20 이하", value: "under-20" },
  { label: "월 $20 초과", value: "over-20" },
];

export const RECOMMENDATION_RULES: Record<string, Recommendation[]> = {
  coding: [
    {
      id: "cursor-claude",
      title: "Cursor + Claude",
      description: "코드베이스 이해와 실제 구현 작업에 적합합니다.",
      href: "/models/cursor",
    },
    {
      id: "chatgpt-plus",
      title: "ChatGPT Plus",
      description: "코딩 외 문서작성과 업무 보조까지 함께 쓰기 좋습니다.",
      href: "/models/chatgpt",
    },
  ],
  writing: [
    {
      id: "chatgpt-writing",
      title: "ChatGPT",
      description: "초안 작성, 요약, 문장 다듬기를 안정적으로 처리합니다.",
      href: "/models/chatgpt",
    },
    {
      id: "claude-writing",
      title: "Claude",
      description: "긴 문서 분석과 자연스러운 글쓰기 흐름에 강합니다.",
      href: "/search?query=Claude",
    },
  ],
  image: [
    {
      id: "midjourney",
      title: "Midjourney",
      description: "완성도 높은 비주얼 콘셉트와 스타일 탐색에 적합합니다.",
      href: "/search?query=Midjourney",
    },
    {
      id: "dalle",
      title: "DALL-E",
      description: "업무용 이미지와 빠른 시안 제작에 쓰기 좋습니다.",
      href: "/models/chatgpt",
    },
  ],
  research: [
    {
      id: "perplexity",
      title: "Perplexity",
      description: "출처 기반 검색과 빠른 리서치 정리에 적합합니다.",
      href: "/search?query=Perplexity",
    },
    {
      id: "chatgpt-research",
      title: "ChatGPT",
      description: "검색 결과를 바탕으로 비교표와 요약을 만들기 좋습니다.",
      href: "/models/chatgpt",
    },
  ],
  automation: [
    {
      id: "zapier-ai",
      title: "Zapier AI",
      description: "반복 업무 자동화와 앱 간 연결에 잘 맞습니다.",
      href: "/search?query=Zapier AI",
    },
    {
      id: "chatgpt-automation",
      title: "ChatGPT",
      description: "업무 절차 정리와 자동화 스크립트 초안 작성에 유용합니다.",
      href: "/models/chatgpt",
    },
  ],
};
