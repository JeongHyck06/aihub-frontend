"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CommunityPost } from "@/types/community";

export function CommunityWritePageSection() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();

    if (!title) {
      return;
    }

    // TODO: 게시글 작성 API가 준비되면 실제 저장 후 상세/목록으로 이동합니다.
    const category = String(formData.get("category")) as CommunityPost["category"];
    setMessage(
      `${category === "question" ? "질문" : "자유게시판"} 게시글이 등록되었습니다. 목록으로 이동합니다.`,
    );
    window.setTimeout(() => router.push("/community"), 600);
  };

  return (
    <section className="bg-[#f8f9fb] py-10">
      <div className="mx-auto w-full max-w-[900px] px-5 lg:px-0">
        <Link className="text-sm font-bold text-blue-600" href="/community">
          ← 커뮤니티로 돌아가기
        </Link>

        <div aria-hidden="true" className="mt-8 h-1.5 w-[72px] rounded-[3px] bg-blue-600" />
        <h1 className="mt-2.5 text-4xl font-extrabold leading-tight text-[#0d121a]">
          게시글 작성
        </h1>
        <p className="mt-2 text-[17px] font-medium leading-7 text-[#616e80]">
          AI 도구에 대한 질문이나 사용 경험을 커뮤니티에 공유해보세요.
        </p>

        <Card className="mt-8 rounded-3xl p-6 sm:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block text-sm font-bold text-[#384252]">
              게시판
              <select
                className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e5f0] bg-white px-4 text-sm font-semibold text-[#0d121a] focus:outline-none focus:ring-2 focus:ring-blue-600"
                defaultValue="question"
                name="category"
              >
                <option value="question">질문</option>
                <option value="free">자유게시판</option>
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

            {message ? (
              <p className="rounded-xl bg-[#ecf1ff] px-4 py-3 text-sm font-semibold text-blue-600" role="status">
                {message}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 flex-1 rounded-xl" type="submit">
                등록하기
              </Button>
              <Button
                className="h-12 flex-1 rounded-xl"
                href="/community"
                variant="ghost"
              >
                취소
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
