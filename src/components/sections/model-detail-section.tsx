import { ModelDetailCard } from "@/components/common/model-detail-card";
import { ModelInfoCard } from "@/components/common/model-info-card";
import type { ModelDetail } from "@/types/model";

export type ModelDetailSectionProps = {
  model: ModelDetail;
};

export function ModelDetailSection({ model }: ModelDetailSectionProps) {
  return (
    <section className="bg-[#f8f9fb] py-5">
      <div className="mx-auto grid w-full max-w-[1200px] gap-6 px-5 lg:grid-cols-[minmax(0,820px)_340px] lg:px-0">
        <ModelDetailCard model={model} />
        <ModelInfoCard model={model} />
      </div>
    </section>
  );
}
