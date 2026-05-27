"use client";

import { useEffect, useState, type FormEvent } from "react";
import { RecommendationCard } from "@/components/common/recommendation-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RECOMMEND_PAGE_CONTENT } from "@/constants/recommend";
import {
  getRecommendOptions,
  recommendNaturalLanguage,
  recommendRuleBased,
} from "@/shared/api";
import type {
  NlRecommendation,
  RecommendCriteria,
  RecommendOption,
  RecommendOptions,
  RecommendationGroup,
} from "@/types/recommend";

const FALLBACK_OPTIONS: RecommendOptions = {
  jobs: [],
  purposes: [],
  budgets: [],
  defaults: { job: "developer", purpose: "coding", budget: "under-20" },
};

export function RecommendPageSection() {
  const [options, setOptions] = useState<RecommendOptions>(FALLBACK_OPTIONS);
  const [criteria, setCriteria] = useState<RecommendCriteria>(FALLBACK_OPTIONS.defaults);
  const [result, setResult] = useState<RecommendationGroup | null>(null);
  const [naturalLanguage, setNaturalLanguage] = useState("");
  const [nlResult, setNlResult] = useState<NlRecommendation | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getRecommendOptions()
      .then((data) => {
        if (cancelled) return;
        setOptions(data);
        setCriteria(data.defaults);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCriteriaSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await recommendRuleBased(criteria);
      setResult(response);
      setNlResult(null);
      setMessage("선택한 조건으로 추천 결과를 갱신했습니다.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "추천을 가져오지 못했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNaturalLanguageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (naturalLanguage.trim().length < 5) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await recommendNaturalLanguage(naturalLanguage.trim());
      setNlResult(response);
      setCriteria({
        job: response.interpreted.job,
        purpose: response.interpreted.purpose,
        budget: response.interpreted.budget,
      });
      setResult(null);
      setMessage("자연어 설명을 바탕으로 추천 조건을 반영했습니다.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "추천을 가져오지 못했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const displayed = nlResult ?? result;

  return (
    <section className="bg-[#f8f9fb] py-12">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <h1 className="text-[36px] font-extrabold leading-tight text-[#0d121a] sm:text-[42px]">
          {RECOMMEND_PAGE_CONTENT.title}
        </h1>
        <p className="mt-2 text-[19px] font-medium leading-7 text-[#6b7a8f]">
          {RECOMMEND_PAGE_CONTENT.description}
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[480px_1fr]">
          <Card className="rounded-[30px] p-8 sm:p-10">
            <h2 className="text-[26px] font-extrabold leading-8 text-[#0d121a]">
              {RECOMMEND_PAGE_CONTENT.formTitle}
            </h2>

            <form className="mt-9 space-y-6" onSubmit={handleCriteriaSubmit}>
              <RecommendSelect
                label="직업"
                onChange={(value) => setCriteria((current) => ({ ...current, job: value }))}
                options={options.jobs}
                value={criteria.job}
              />
              <RecommendSelect
                label="사용 목적"
                onChange={(value) =>
                  setCriteria((current) => ({ ...current, purpose: value }))
                }
                options={options.purposes}
                value={criteria.purpose}
              />
              <RecommendSelect
                label="예산"
                onChange={(value) =>
                  setCriteria((current) => ({ ...current, budget: value }))
                }
                options={options.budgets}
                value={criteria.budget}
              />

              <Button
                className="h-16 w-full rounded-[22px] text-[17px]"
                disabled={submitting}
                type="submit"
              >
                {submitting ? "추천 받는 중..." : "추천 받기"}
              </Button>
            </form>
          </Card>

          <Card className="rounded-[30px] p-8 sm:p-11">
            <h2 className="text-[26px] font-extrabold leading-8 text-[#0d121a]">
              {displayed?.title ?? "추천 조건을 선택하세요"}
            </h2>
            <p className="mt-2 text-[17px] font-medium leading-6 text-[#6b7a8f]">
              {displayed?.subtitle ??
                "직업, 사용 목적, 예산을 선택하면 룰 기반 추천이 표시됩니다."}
            </p>

            {message ? (
              <p className="mt-4 text-sm font-semibold text-blue-600" role="status">
                {message}
              </p>
            ) : null}
            {error ? (
              <p className="mt-4 text-sm font-semibold text-red-500" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-12 space-y-8">
              {displayed?.items.length ? (
                displayed.items.map((recommendation) => (
                  <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                ))
              ) : (
                <p className="text-sm text-[#8c99ab]">아직 추천 결과가 없습니다.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="my-16 flex items-center justify-center gap-4 text-sm font-medium text-[#616e80]">
          <span className="hidden h-px w-40 bg-[#e0e5f0] sm:block" />
          또는 자연어로 입력
          <span className="hidden h-px w-40 bg-[#e0e5f0] sm:block" />
        </div>

        <div className="text-center">
          <h2 className="text-[28px] font-extrabold leading-9 text-[#0d121a]">
            {RECOMMEND_PAGE_CONTENT.naturalLanguageTitle}
          </h2>
          <p className="mt-2 text-base font-medium leading-6 text-[#616e80]">
            {RECOMMEND_PAGE_CONTENT.naturalLanguageDescription}
          </p>
        </div>

        <form
          className="mt-3 flex flex-col gap-3 lg:flex-row"
          onSubmit={handleNaturalLanguageSubmit}
        >
          <label className="sr-only" htmlFor="recommend-natural-language">
            자연어 추천 요청
          </label>
          <textarea
            className="min-h-[100px] flex-1 resize-none rounded-[20px] border border-blue-600 bg-white px-7 py-5 text-base font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="recommend-natural-language"
            onChange={(event) => setNaturalLanguage(event.target.value)}
            placeholder={RECOMMEND_PAGE_CONTENT.naturalLanguagePlaceholder}
            value={naturalLanguage}
          />
          <Button
            className="min-h-[64px] rounded-[20px] px-10 lg:min-h-[100px]"
            disabled={naturalLanguage.trim().length < 5 || submitting}
            type="submit"
          >
            {submitting ? "추천 받는 중..." : "추천받기"}
          </Button>
        </form>
        <p className="mt-2 text-[13px] font-medium leading-5 text-[#8c99ab]">
          {RECOMMEND_PAGE_CONTENT.naturalLanguageExample}
        </p>
      </div>
    </section>
  );
}

type RecommendSelectProps = {
  label: string;
  options: RecommendOption[];
  value: string;
  onChange: (value: string) => void;
};

function RecommendSelect({ label, options, value, onChange }: RecommendSelectProps) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        className="h-16 w-full rounded-[20px] border border-[#e0e5f0] bg-[#f8f9fb] px-6 text-[17px] font-bold text-[#384252] focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {label}: {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
