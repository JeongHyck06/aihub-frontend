import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Recommendation } from "@/types/recommend";

export type RecommendationCardProps = {
  recommendation: Recommendation;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <Card className="rounded-3xl bg-[#f8f9fb] p-8 transition-transform hover:-translate-y-1">
      <h3 className="text-2xl font-extrabold leading-8 text-[#0d121a]">
        {recommendation.title}
      </h3>
      <p className="mt-2 text-base font-medium leading-6 text-[#5c697a]">
        {recommendation.description}
      </p>
      <Link
        aria-label={`${recommendation.title} 자세히 보기`}
        className="mt-5 inline-flex text-sm font-extrabold text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        href={recommendation.href}
      >
        자세히 보기 →
      </Link>
    </Card>
  );
}
