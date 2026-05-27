export type CommunityCategory = "all" | "question" | "free";

export type CommunityPost = {
  id: number | string;
  category: Exclude<CommunityCategory, "all">;
  title: string;
  body?: string;
  preview?: string;
  author: string;
  authorId?: number;
  createdAt: string;
  views: number;
  comments: number;
  likes: number;
};
