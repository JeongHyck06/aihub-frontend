"use client";

import { useEffect, useState } from "react";
import { Chip } from "@/components/ui/chip";
import { SearchInput } from "@/components/ui/search-input";
import { getHomeSummary } from "@/shared/api";
import type { HomeSummary } from "@/types/home";

export function HeroSection() {
  const [summary, setSummary] = useState<HomeSummary | null>(null);

  useEffect(() => {
    let cancelled = false;
    getHomeSummary()
      .then((data) => {
        if (!cancelled) {
          setSummary(data);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const hero = summary?.hero;
  const keywords = summary?.hotKeywords ?? [];

  return (
    <section className="relative overflow-hidden bg-blue-600" id="search">
      <div
        aria-hidden="true"
        className="absolute -right-5 -top-[100px] h-[360px] w-[360px] rounded-full bg-white/10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-[120px] h-[280px] w-[280px] rounded-full bg-white/10"
      />

      <div className="relative mx-auto flex min-h-[480px] w-full max-w-[1200px] flex-col justify-center px-5 py-16 lg:px-0">
        <div className="inline-flex h-8 w-fit items-center rounded-2xl bg-white/15 px-4">
          <span className="text-xs font-extrabold leading-none text-white">
            {hero?.eyebrow ?? "AI 서비스 탐색 플랫폼"}
          </span>
        </div>

        <h1 className="mt-5 text-[42px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-[56px] lg:text-[64px]">
          {(hero?.titleLines ?? ["더 나은 AI를", "찾는 가장 빠른 방법"]).map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-white/85 sm:text-lg">
          {hero?.description ?? ""}
        </p>

        <SearchInput
          action="/search"
          className="mt-8"
          id="hero-search"
          label="AI 서비스 검색어"
          placeholder={hero?.searchPlaceholder ?? "AI 서비스를 검색하세요"}
        />

        {keywords.length > 0 ? (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="mr-3 text-[13px] font-bold leading-5 text-white/70">
              인기 검색어
            </p>
            {keywords.map((keyword, index) => (
              <Chip
                active={index === 0}
                aria-label={`${keyword} 검색어로 검색`}
                key={keyword}
              >
                # {keyword}
              </Chip>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
