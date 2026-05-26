import type { AdminModelRequest, AdminService } from "@/types/admin";

export const ADMIN_DASHBOARD_CONTENT = {
  title: "서비스 데이터 관리",
  description: "초기 MVP에서는 관리자가 수동으로 AI 서비스 정보를 등록하고 수정합니다.",
};

export const ADMIN_SERVICES: AdminService[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    price: "무료 / $20",
    apiSupport: "지원",
  },
  {
    id: "claude",
    name: "Claude",
    company: "Anthropic",
    price: "무료 / $20",
    apiSupport: "지원",
  },
  {
    id: "cursor",
    name: "Cursor",
    company: "Anysphere",
    price: "무료 / $20",
    apiSupport: "제한적",
  },
  {
    id: "gemini",
    name: "Gemini",
    company: "Google",
    price: "무료 / 유료",
    apiSupport: "지원",
  },
];

export const ADMIN_APPROVAL_CONTENT = {
  title: "모델 등록 승인 관리",
  description: "사용자가 신청한 AI 서비스 등록을 검토하고 승인 또는 반려 처리하세요.",
  listTitle: "대기 중 신청목록",
  baseApprovedCount: 142,
  baseRejectedCount: 12,
};

export const ADMIN_MODEL_REQUESTS: AdminModelRequest[] = [
  {
    id: "sora",
    serviceName: "Sora (OpenAI)",
    url: "sora.com",
    category: "영상 생성",
    submitter: "kim_dev@gmail.com",
    submittedAt: "2026.05.25",
    description: "텍스트 프롬프트 기반 고품질 영상 생성 서비스입니다.",
    status: "pending",
  },
  {
    id: "udio",
    serviceName: "Udio (AI 음악)",
    url: "udio.com",
    category: "음악 생성",
    submitter: "ai_lover@kakao.com",
    submittedAt: "2026.05.25",
    description: "가사와 장르를 입력하면 완성도 높은 음악을 생성합니다.",
    status: "pending",
  },
  {
    id: "perplexity-pro",
    serviceName: "Perplexity Pro",
    url: "perplexity.ai",
    category: "검색 / Q&A",
    submitter: "sarah@naver.com",
    submittedAt: "2026.05.24",
    description: "출처 기반 답변과 리서치 흐름에 특화된 AI 검색 서비스입니다.",
    status: "pending",
  },
];
