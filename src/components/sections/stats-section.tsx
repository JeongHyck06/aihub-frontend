import { StatList } from "@/components/common/stat-list";

export function StatsSection() {
  return (
    <section aria-label="AIHUB 서비스 통계" className="bg-[#f8f9fb]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-0">
        <StatList />
      </div>
    </section>
  );
}
