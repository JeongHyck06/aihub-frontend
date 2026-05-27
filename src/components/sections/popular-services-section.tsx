"use client";

import { useEffect, useState } from "react";
import { PopularServiceCard } from "@/components/common/popular-service-card";
import { SectionHeading } from "@/components/common/section-heading";
import { POPULAR_SECTION } from "@/constants/home";
import { getPopularServices } from "@/shared/api";
import type { PopularService } from "@/types/home";

export function PopularServicesSection() {
  const [services, setServices] = useState<PopularService[]>([]);

  useEffect(() => {
    let cancelled = false;
    getPopularServices(4)
      .then((items) => {
        if (!cancelled) setServices(items);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-[#f8f9fb] py-8 pb-10 sm:py-10 sm:pb-10" id="compare">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <SectionHeading
          description={POPULAR_SECTION.description}
          title={POPULAR_SECTION.title}
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <PopularServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
