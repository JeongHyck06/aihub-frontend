import type { CommunityCategory, CommunityPost } from "@/types/community";

export const COMMUNITY_PAGE_CONTENT = {
  title: "커뮤니티",
  description: "AI 도구에 대한 질문을 나누고 자유롭게 소통하는 공간입니다.",
};

export const COMMUNITY_TABS: Array<{
  label: string;
  value: CommunityCategory;
}> = [
  { label: "전체", value: "all" },
  { label: "질문", value: "question" },
  { label: "자유게시판", value: "free" },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "cursor-vs-copilot",
    category: "question",
    title: "Cursor vs Copilot 코딩 보조 AI 어떤 게 더 낫나요?",
    body: "프리랜서로 React 프로젝트 진행 중인데, 코딩 AI를 마음에 드는 AI로 교체하려고 합니다. 두 서비스 사용해보신 분 의견 고마워요!",
    author: "프리랜서덕후",
    createdAt: "2026.05.26",
    views: 342,
    comments: 28,
    likes: 47,
  },
  {
    id: "ai-tools-2026",
    category: "free",
    title: "2026 상반기 AI 도구 사용 후기 공유",
    body: "스타트업에서 마케터로 일하고 있습니다. Notion AI + ChatGPT 조합이 제일 잘 맞는 것 같아서 정리해보려고 합니다.",
    author: "AI마케터던",
    createdAt: "2026.05.25",
    views: 1204,
    comments: 83,
    likes: 231,
  },
  {
    id: "free-image-ai",
    category: "question",
    title: "Midjourney 없이 무료로 상업가능한 이미지 생성 AI 추천해주세요",
    author: "디자이너양시",
    createdAt: "2026.05.24",
    views: 892,
    comments: 54,
    likes: 128,
  },
];
