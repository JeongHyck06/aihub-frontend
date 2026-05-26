import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import type { ModelDetail } from "@/types/model";

export type ModelDetailCardProps = {
  model: ModelDetail;
};

export function ModelDetailCard({ model }: ModelDetailCardProps) {
  return (
    <Card className="rounded-3xl p-6 sm:p-10 lg:min-h-[560px]">
      <h2 className="text-[22px] font-extrabold leading-7 text-[#0d121a]">
        서비스 소개
      </h2>
      <div className="mt-4 space-y-1 text-[15px] font-medium leading-6 text-[#616e80]">
        {model.description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <h3 className="mt-14 text-lg font-extrabold leading-6 text-[#0d121a]">
        주요 기능
      </h3>
      <ul className="mt-4 space-y-2 text-sm font-semibold leading-5 text-[#384252]">
        {model.features.map((feature) => (
          <li key={feature}>✓ {feature}</li>
        ))}
      </ul>

      <h3 className="mt-10 text-lg font-extrabold leading-6 text-[#0d121a]">태그</h3>
      <div className="mt-3 flex flex-wrap gap-3">
        {model.tags.map((tag) => (
          <Chip
            aria-label={`${tag} 태그`}
            className="bg-[#f8f9fb] font-semibold text-[#616e80]"
            key={tag}
          >
            # {tag}
          </Chip>
        ))}
      </div>
    </Card>
  );
}
