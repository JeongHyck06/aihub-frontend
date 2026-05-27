import { Card } from "@/components/ui/card";
import {
  FALLBACK_REGISTER_GUIDE_STEPS,
  MODEL_REGISTER_CONTENT,
} from "@/constants/model-register";
import type { RegisterGuideStep } from "@/types/model-register";

export type ModelRegisterGuideCardProps = {
  steps?: RegisterGuideStep[];
};

export function ModelRegisterGuideCard({ steps }: ModelRegisterGuideCardProps) {
  const items = steps && steps.length > 0 ? steps : FALLBACK_REGISTER_GUIDE_STEPS;
  return (
    <Card className="rounded-3xl p-9 lg:w-[420px] lg:shrink-0">
      <h2 className="text-xl font-extrabold leading-7 text-[#0d121a]">등록 안내</h2>

      <ol className="mt-6 space-y-5">
        {items.map((step) => (
          <li key={step.title}>
            <h3 className="text-sm font-semibold leading-5 text-[#384252]">{step.title}</h3>
            <p className="mt-1 text-[13px] font-medium leading-5 text-[#616e80]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-9 rounded-xl bg-[#ecf1ff] p-4 text-xs font-medium leading-5 text-blue-600">
        {MODEL_REGISTER_CONTENT.notice.split("\n").map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </Card>
  );
}
