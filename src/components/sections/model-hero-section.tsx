import type { ModelDetail } from "@/types/model";

export type ModelHeroSectionProps = {
  model: ModelDetail;
};

export function ModelHeroSection({ model }: ModelHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-blue-600">
      <div
        aria-hidden="true"
        className="absolute left-[20%] top-[-60px] h-[280px] w-[280px] rounded-full bg-white/10"
      />
      <div className="relative mx-auto min-h-[220px] w-full max-w-[1200px] px-5 py-8 lg:px-0">
        <p className="text-[13px] font-medium leading-5 text-white/70">
          AIHUB &gt; 검색 &gt; {model.name}
        </p>
        <h1 className="mt-4 text-[42px] font-extrabold leading-tight text-white sm:text-[52px]">
          {model.name}
        </h1>
        <p className="mt-3 text-base font-medium leading-6 text-white/85">
          {model.provider} · {model.category} · 스타 {model.rating.toFixed(1)} · 리뷰{" "}
          {model.reviewCount.toLocaleString("ko-KR")}개
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {model.heroBadges.map((badge) => (
            <span
              className="inline-flex h-[30px] items-center rounded-[15px] bg-white/15 px-5 text-xs font-bold leading-4 text-white"
              key={badge}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
