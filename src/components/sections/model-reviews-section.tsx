"use client";

import { useState } from "react";
import Link from "next/link";
import { ReviewCard } from "@/components/common/review-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { createServiceReview } from "@/shared/api";
import type { ModelDetail, ModelReview } from "@/types/model";

export type ModelReviewsSectionProps = {
  model: ModelDetail;
  slug?: string;
  onReviewCreated?: (review: ModelReview) => void;
};

const RATING_OPTIONS = [5, 4, 3, 2, 1];

export function ModelReviewsSection({ model, slug, onReviewCreated }: ModelReviewsSectionProps) {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!slug) return;
    if (!body.trim()) {
      setError("리뷰 내용을 입력해 주세요.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const review = await createServiceReview(slug, { rating, body: body.trim() });
      onReviewCreated?.(review);
      setBody("");
      setRating(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "리뷰를 등록하지 못했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f8f9fb] pb-10 pt-3">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <h2 className="text-2xl font-extrabold leading-8 text-[#0d121a]">
          리뷰 및 댓글 ({model.reviewCount.toLocaleString("ko-KR")})
        </h2>

        <Card className="mt-4 rounded-[20px] p-7">
          <h3 className="text-base font-extrabold leading-5 text-[#0d121a]">리뷰 작성</h3>
          {isAuthenticated ? (
            <form className="mt-3 flex flex-col gap-3" onSubmit={handleSubmit}>
              <label className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#0d121a]">점수</span>
                <select
                  className="h-9 rounded-lg border border-[#e0e5f0] bg-white px-3 text-sm font-bold text-[#0d121a]"
                  onChange={(event) => setRating(Number(event.target.value))}
                  value={rating}
                >
                  {RATING_OPTIONS.map((value) => (
                    <option key={value} value={value}>
                      {"★".repeat(value)}
                      {"☆".repeat(5 - value)} ({value}점)
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="review-body">
                  리뷰 내용
                </label>
                <input
                  className="h-12 flex-1 rounded-xl border border-[#e0e5f0] bg-[#f8f9fb] px-5 text-sm font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  id="review-body"
                  onChange={(event) => setBody(event.target.value)}
                  placeholder="이 AI 서비스를 사용해 보셨나요? 경험을 공유해주세요."
                  type="text"
                  value={body}
                />
                <Button className="h-12 rounded-xl px-8" disabled={submitting} type="submit">
                  {submitting ? "등록 중..." : "등록"}
                </Button>
              </div>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
            </form>
          ) : (
            <p className="mt-2 text-sm font-medium text-[#616e80]">
              로그인 후 리뷰를 작성할 수 있습니다.{" "}
              <Link className="font-bold text-blue-600" href="/login">
                로그인하기 →
              </Link>
            </p>
          )}
        </Card>

        <div className="mt-5 space-y-4">
          {model.reviews.length === 0 ? (
            <p className="text-sm text-[#8c99ab]">아직 등록된 리뷰가 없습니다.</p>
          ) : (
            model.reviews.map((review) => (
              <ReviewCard
                key={review.id ?? `${review.author}-${review.rating}-${review.body.slice(0, 20)}`}
                review={review}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
