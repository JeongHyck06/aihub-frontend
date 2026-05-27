"use client";

import { useEffect, useState } from "react";
import { ModelDetailSection } from "@/components/sections/model-detail-section";
import { ModelHeroSection } from "@/components/sections/model-hero-section";
import { ModelReviewsSection } from "@/components/sections/model-reviews-section";
import { getServiceDetail, getServiceReviews } from "@/shared/api";
import type { ModelDetail, ModelReview } from "@/types/model";

export type ModelPageContentProps = {
  slug: string;
};

export function ModelPageContent({ slug }: ModelPageContentProps) {
  const [model, setModel] = useState<ModelDetail | null>(null);
  const [reviews, setReviews] = useState<ModelReview[]>([]);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      getServiceDetail(slug),
      getServiceReviews(slug, { size: 10 }),
    ])
      .then(([detail, reviewsPage]) => {
        if (cancelled) return;
        setModel(detail);
        setReviews(reviewsPage.items);
        setReviewTotal(reviewsPage.meta.totalElements);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "AI 서비스를 불러오지 못했습니다.");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleReviewCreated = (review: ModelReview) => {
    setReviews((prev) => [review, ...prev]);
    setReviewTotal((prev) => prev + 1);
  };

  if (error) {
    return (
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-0">
        <h1 className="text-2xl font-extrabold text-[#0d121a]">{error}</h1>
      </section>
    );
  }

  if (!model) {
    return (
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-0">
        <p className="text-sm text-[#8c99ab]">불러오는 중...</p>
      </section>
    );
  }

  return (
    <>
      <ModelHeroSection model={{ ...model, reviewCount: reviewTotal || model.reviewCount }} />
      <ModelDetailSection model={model} />
      <ModelReviewsSection
        model={{ ...model, reviewCount: reviewTotal || model.reviewCount, reviews }}
        onReviewCreated={handleReviewCreated}
        slug={slug}
      />
    </>
  );
}
