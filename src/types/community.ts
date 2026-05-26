export type CommunityCategory = "all" | "question" | "free";

export type CommunityPost = {
  id: string;
  category: Exclude<CommunityCategory, "all">;
  title: string;
  body?: string;
  author: string;
  createdAt: string;
  views: number;
  comments: number;
  likes: number;
};
