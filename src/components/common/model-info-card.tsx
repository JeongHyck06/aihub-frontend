"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { addToMyCompare } from "@/shared/api";
import { cn } from "@/lib/utils";
import type { ModelDetail } from "@/types/model";

export type ModelInfoCardProps = {
  model: ModelDetail;
};

export function ModelInfoCard({ model }: ModelInfoCardProps) {
  const { isAuthenticated } = useAuth();
  const [adding, setAdding] = useState(false);
  const [compareMessage, setCompareMessage] = useState<string | null>(null);

  const handleAddCompare = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login?next=/compare";
      return;
    }
    setAdding(true);
    setCompareMessage(null);
    try {
      await addToMyCompare(model.id);
      setCompareMessage("비교 목록에 추가되었습니다.");
    } catch (err) {
      setCompareMessage(err instanceof Error ? err.message : "추가에 실패했습니다.");
    } finally {
      setAdding(false);
    }
  };

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
          href={model.externalUrl ?? "#"}
        >
          서비스 바로가기 ↗
        </Button>
        <Button
          aria-label={`${model.name} 비교에 추가하기`}
          className="h-11 w-full rounded-[14px] border border-blue-600 bg-white"
          onClick={handleAddCompare}
          variant="secondary"
        >
          {adding ? "추가 중..." : "비교에 추가하기"}
        </Button>
        {compareMessage ? (
          <p className="text-xs font-semibold text-[#616e80]">{compareMessage}</p>
        ) : null}
      </div>
    </Card>
  );
}
