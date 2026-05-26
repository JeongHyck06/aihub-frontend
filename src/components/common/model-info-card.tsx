import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ModelDetail } from "@/types/model";

export type ModelInfoCardProps = {
  model: ModelDetail;
};

export function ModelInfoCard({ model }: ModelInfoCardProps) {
  return (
    <Card className="rounded-3xl p-7 lg:min-h-[380px]">
      <h2 className="text-lg font-extrabold leading-6 text-[#0d121a]">빠른 정보</h2>

      <dl className="mt-5 space-y-4">
        {model.info.map((item) => (
          <div key={item.label}>
            <dt className="text-xs font-semibold leading-4 text-[#8c99ab]">
              {item.label}
            </dt>
            <dd
              className={cn(
                "mt-1 text-[15px] font-bold leading-5 text-[#0d121a]",
                item.tone === "success" && "text-[#05754a]",
              )}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-9 space-y-3">
        <Button
          aria-label={`${model.name} 서비스 바로가기`}
          className="h-[52px] w-full rounded-[14px]"
          href="#visit"
        >
          서비스 바로가기 ↗
        </Button>
        <Button
          aria-label={`${model.name} 비교에 추가하기`}
          className="h-11 w-full rounded-[14px] border border-blue-600 bg-white"
          href="#compare"
          variant="secondary"
        >
          비교에 추가하기
        </Button>
      </div>
    </Card>
  );
}
