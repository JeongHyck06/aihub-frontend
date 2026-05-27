import type { CommunityCategory } from "@/types/community";

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
