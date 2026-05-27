"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { createCommunityPost } from "@/shared/api";

export function CommunityWritePageSection() {
  const router = useRouter();
  const { isAuthenticated, isReady } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (isReady && !isAuthenticated) {
    return (
      <section className="bg-[#f8f9fb] py-16">
        <div className="mx-auto w-full max-w-[600px] rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#0d121a]">로그인이 필요합니다</h1>
          <p className="mt-3 text-sm text-[#616e80]">
            커뮤니티에 글을 쓰려면 먼저 로그인해 주세요.
          </p>
          <Link
            className="mt-6 inline-flex h-11 items-center rounded-xl bg-blue-600 px-6 text-sm font-extrabold text-white"
            href="/login?next=/community/write"
          >
            로그인하러 가기
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const body = String(formData.get("body") ?? "").trim();
    const category = String(formData.get("category") ?? "QUESTION").toUpperCase();

    if (!title || !body) {
      setError("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      await createCommunityPost({
        category: category === "FREE" ? "FREE" : "QUESTION",
        title,
        body,
      });
      setMessage("게시글이 등록되었습니다. 목록으로 이동합니다.");
      window.setTimeout(() => router.push("/community"), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "게시글 등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f8f9fb] py-10">
      <div className="mx-auto w-full max-w-[900px] px-5 lg:px-0">
        <Link className="text-sm font-bold text-blue-600" href="/community">
          ← 커뮤니티로 돌아가기
        </Link>

        <div aria-hidden="true" className="mt-8 h-1.5 w-[72px] rounded-[3px] bg-blue-600" />
        <h1 className="mt-2.5 text-4xl font-extrabold leading-tight text-[#0d121a]">게시글 작성</h1>
        <p className="mt-2 text-[17px] font-medium leading-7 text-[#616e80]">
          AI 도구에 대한 질문이나 사용 경험을 커뮤니티에 공유해보세요.
        </p>

        <Card className="mt-8 rounded-3xl p-6 sm:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block text-sm font-bold text-[#384252]">
              게시판
              <select
                className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e5f0] bg-white px-4 text-sm font-semibold text-[#0d121a] focus:outline-none focus:ring-2 focus:ring-blue-600"
                defaultValue="QUESTION"
                name="category"
              >
                <option value="QUESTION">질문</option>
                <option value="FREE">자유게시판</option>
              </select>
            </label>

            <label className="block text-sm font-bold text-[#384252]">
              제목
              <input
                className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e5f0] bg-white px-4 text-sm font-semibold text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
                maxLength={80}
                name="title"
                placeholder="제목을 입력하세요"
                required
                type="text"
              />
            </label>

            <label className="block text-sm font-bold text-[#384252]">
              내용
              <textarea
                className="mt-1.5 min-h-[260px] w-full resize-none rounded-xl border border-[#e0e5f0] bg-white px-4 py-3 text-sm font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
                name="body"
                placeholder="내용을 입력하세요"
                required
              />
            </label>

            {error ? (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500" role="alert">
                {error}
              </p>
            ) : null}
            {message ? (
              <p className="rounded-xl bg-[#ecf1ff] px-4 py-3 text-sm font-semibold text-blue-600" role="status">
                {message}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 flex-1 rounded-xl" disabled={submitting} type="submit">
                {submitting ? "등록 중..." : "등록하기"}
              </Button>
              <Button className="h-12 flex-1 rounded-xl" href="/community" variant="ghost">
                취소
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
