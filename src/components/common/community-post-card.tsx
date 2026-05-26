import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CommunityPost } from "@/types/community";

export type CommunityPostCardProps = {
  post: CommunityPost;
};

const categoryLabel = {
  question: "질문",
  free: "자유게시판",
} satisfies Record<CommunityPost["category"], string>;

const categoryClassName = {
  question: "bg-[#ecf1ff] text-blue-600",
  free: "bg-[#f0f7f0] text-[#05754a]",
} satisfies Record<CommunityPost["category"], string>;

export function CommunityPostCard({ post }: CommunityPostCardProps) {
  return (
    <Card className="rounded-2xl p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "inline-flex h-[26px] items-center rounded-lg px-3 text-[11px] font-bold leading-4",
            categoryClassName[post.category],
          )}
        >
          {categoryLabel[post.category]}
        </span>
        <h2 className="text-base font-bold leading-6 text-[#0d121a]">
          {post.title}
        </h2>
      </div>

      {post.body ? (
        <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-[#616e80]">
          {post.body}
        </p>
      ) : null}

      <p className="mt-4 text-xs font-medium leading-5 text-[#8c99ab]">
        {post.author} · {post.createdAt} · 조회 {post.views.toLocaleString("ko-KR")} · 댓글{" "}
        {post.comments.toLocaleString("ko-KR")} · 추천{" "}
        {post.likes.toLocaleString("ko-KR")}
      </p>
    </Card>
  );
}
