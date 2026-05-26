import type { ModelDetail } from "@/types/model";

export const CHATGPT_DETAIL: ModelDetail = {
  id: "chatgpt",
  name: "ChatGPT",
  provider: "OpenAI",
  category: "범용 AI 어시스턴트",
  rating: 4.8,
  reviewCount: 2341,
  heroBadges: ["코딩", "글쓰기"],
  description: [
    "ChatGPT는 OpenAI가 개발한 대형 언어 모델 GPT-4 기반의 AI 어시스턴트입니다.",
    "코딩 자동완성, 디버깅, 문서 작성, 수학 풀이 등 다양한 작업에 활용할 수 있습니다.",
    "무료 버전으로도 충분한 기능을 제공하며, Plus 플랜 구독 시 새로운 GPT-4o와 DALL-E를 이용할 수 있습니다.",
  ],
  features: [
    "코드 자동완성 및 디버깅 지원",
    "다양한 플러그인 및 API 연동 지원",
    "이미지 생성 (DALL-E, Plus 전용)",
    "멀티모달 (GPT-4o: 텍스트+이미지+음성)",
  ],
  tags: ["코딩", "문서작성", "GPT-4o"],
  info: [
    { label: "가격", value: "무료 / Plus $20/월" },
    { label: "API 지원", value: "✔ 지원함 (REST API)", tone: "success" },
    { label: "최신 업데이트", value: "2026.04.15" },
  ],
  reviews: [
    {
      author: "잠이 많은 사람",
      rating: 5,
      date: "2026.05.20",
      body: "코딩 사이드에서 정말 유용하게 쓰고 있습니다. GPT-4o의 코드 생성 능력이 특히 뛰어나고, 차이가 난다는 말이 강하게 느껴집니다.",
    },
    {
      author: "밥 먹는게 겁나 느린 사람",
      rating: 4,
      body: "플러그인과 API 연동이 정말 편리합니다. 다만 Copilot 대비 IDE 통합 면에서는 약간 아쉽습니다.",
    },
  ],
};
