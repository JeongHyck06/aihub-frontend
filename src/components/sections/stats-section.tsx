"use client";

import { useEffect, useState } from "react";
import { StatList } from "@/components/common/stat-list";
import { getHomeSummary } from "@/shared/api";
import type { StatItem } from "@/types/home";

export function StatsSection() {
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    getHomeSummary()
      .then((data) => {
        if (!cancelled) setStats(data.stats ?? []);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section aria-label="AIHUB 서비스 통계" className="bg-[#f8f9fb]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-0">
        <StatList stats={stats} />
      </div>
    </section>
  );
}
