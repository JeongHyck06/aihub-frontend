import type { PricePolicy, RegisterGuideStep } from "@/types/model-register";

export const MODEL_REGISTER_CONTENT = {
  title: "AI 모델 / 서비스 등록 신청",
  description: "새로운 AI 서비스를 AIHUB에 등록하고, 더 많은 사용자에게 소개해보세요.",
  formTitle: "등록 정보 입력",
  notice:
    "자세한 정보 입력 시 승인 속도가 빨라집니다.\n부정확한 정보는 반려 또는 수정 요청될 수 있습니다.",
};

export const MODEL_CATEGORIES = [
  "코딩",
  "글쓰기",
  "이미지",
  "음악",
  "영상",
  "검색 · Q&A",
  "기타",
];

export const PRICE_POLICIES: PricePolicy[] = [
  { label: "무료", value: "free" },
  { label: "유료", value: "paid" },
  { label: "부분 유료", value: "freemium" },
];

export const REGISTER_GUIDE_STEPS: RegisterGuideStep[] = [
  {
    title: "1단계 — 정보 입력 및 제출",
    description: "서비스명, 카테고리, URL, 소개글을 입력해주세요.",
  },
  {
    title: "2단계 — 관리자 검토 (1~3일)",
    description: "제출 후 AIHUB 관리자 팀이 내용을 확인합니다.",
  },
  {
    title: "3단계 — 승인 후 등록 완료",
    description: "승인되면 AIHUB 검색결과에 노출됩니다.",
  },
];
