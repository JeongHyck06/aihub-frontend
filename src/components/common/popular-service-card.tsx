import { Card } from "@/components/ui/card";
import type { PopularService } from "@/types/home";
import { cn } from "@/lib/utils";

export type PopularServiceCardProps = {
  service: PopularService;
};

const rankColorByRank: Record<number, string> = {
  1: "bg-blue-600",
  2: "bg-[#2e2e2e]",
};

export function PopularServiceCard({ service }: PopularServiceCardProps) {
  return (
    <Card className="p-6">
      <div
        className={cn(
          "inline-flex h-6 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-extrabold text-white",
          rankColorByRank[service.rank] ?? "bg-[#8c99ab]",
        )}
      >
        #{service.rank}
      </div>

      <h3 className="mt-4 text-[22px] font-extrabold leading-7 text-[#0d121a]">
        {service.name}
      </h3>
      <p className="mt-1 text-[13px] font-semibold leading-5 text-[#8c99ab]">
        {service.provider} · {service.price}
      </p>
      <p className="mt-3 text-[13px] font-bold leading-5 text-[#f2991a]">
        ★ {service.rating.toFixed(1)} ({service.reviewCount.toLocaleString("ko-KR")})
      </p>
      <a
        aria-label={`${service.name} 상세 보기`}
        className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-[10px] bg-[#ecf1ff] text-[13px] font-extrabold text-blue-600 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        href={service.href}
      >
        상세 보기 →
      </a>
    </Card>
  );
}
