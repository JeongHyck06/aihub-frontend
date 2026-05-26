import { ReviewCard } from "@/components/common/review-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ModelDetail } from "@/types/model";

export type ModelReviewsSectionProps = {
  model: ModelDetail;
};

export function ModelReviewsSection({ model }: ModelReviewsSectionProps) {
  return (
    <section className="bg-[#f8f9fb] pb-10 pt-3">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <h2 className="text-2xl font-extrabold leading-8 text-[#0d121a]">
          리뷰 및 댓글 ({model.reviewCount.toLocaleString("ko-KR")})
        </h2>

        <Card className="mt-4 rounded-[20px] p-7">
          <h3 className="text-base font-extrabold leading-5 text-[#0d121a]">
            리뷰 작성
          </h3>
          <p className="mt-1 text-lg font-semibold leading-7 text-[#f2991a]">
            ★ ★ ★ ★ ☆ <span className="text-sm text-[#8c99ab]">점수 선택</span>
          </p>
          <form className="mt-2 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="review-body">
              리뷰 내용
            </label>
            <input
              className="h-12 flex-1 rounded-xl border border-[#e0e5f0] bg-[#f8f9fb] px-5 text-sm font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
              id="review-body"
              placeholder="이 AI 서비스를 사용해 보셨나요? 경험을 공유해주세요."
              type="text"
            />
            {/* TODO: 리뷰 작성 API가 준비되면 submit action을 연결합니다. */}
            <Button className="h-12 rounded-xl px-8" type="submit">
              등록
            </Button>
          </form>
        </Card>

        <div className="mt-5 space-y-4">
          {model.reviews.map((review) => (
            <ReviewCard key={`${review.author}-${review.rating}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
