import { Card } from "@/components/ui/card";
import type { ModelReview } from "@/types/model";

export type ReviewCardProps = {
  review: ModelReview;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="rounded-2xl p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-[15px] font-bold leading-5 text-[#0d121a]">
          {review.author} <span aria-label={`${review.rating}점`}>{renderStars(review.rating)}</span>{" "}
          {review.rating.toFixed(1)}
        </p>
        {review.date ? (
          <time className="text-[13px] font-medium leading-5 text-[#8c99ab]">
            {review.date}
          </time>
        ) : null}
      </div>
      <p className="mt-3 text-sm font-medium leading-6 text-[#384252]">{review.body}</p>
    </Card>
  );
}

function renderStars(rating: number) {
  const roundedRating = Math.round(rating);
  return `${"★".repeat(roundedRating)}${"☆".repeat(5 - roundedRating)}`;
}
