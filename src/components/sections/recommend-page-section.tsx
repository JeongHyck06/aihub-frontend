"use client";

import { useMemo, useState, type FormEvent } from "react";
import { RecommendationCard } from "@/components/common/recommendation-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BUDGET_OPTIONS,
  DEFAULT_RECOMMEND_CRITERIA,
  JOB_OPTIONS,
  PURPOSE_OPTIONS,
  RECOMMENDATION_RULES,
  RECOMMEND_PAGE_CONTENT,
} from "@/constants/recommend";
import type { RecommendCriteria, RecommendOption } from "@/types/recommend";

export function RecommendPageSection() {
  const [criteria, setCriteria] = useState<RecommendCriteria>(
    DEFAULT_RECOMMEND_CRITERIA,
  );
  const [naturalLanguage, setNaturalLanguage] = useState("");
  const [appliedCriteria, setAppliedCriteria] = useState<RecommendCriteria>(
    DEFAULT_RECOMMEND_CRITERIA,
  );
  const [message, setMessage] = useState("");

  const selectedJobLabel = getOptionLabel(JOB_OPTIONS, appliedCriteria.job);
  const selectedPurposeLabel = getOptionLabel(PURPOSE_OPTIONS, appliedCriteria.purpose);
  const selectedBudgetLabel = getOptionLabel(BUDGET_OPTIONS, appliedCriteria.budget);

  const recommendations = useMemo(
    () => RECOMMENDATION_RULES[appliedCriteria.purpose] ?? RECOMMENDATION_RULES.coding,
    [appliedCriteria.purpose],
  );

  const handleCriteriaSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAppliedCriteria(criteria);
    setMessage("선택한 조건으로 추천 결과를 갱신했습니다.");
  };

  const handleNaturalLanguageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextPurpose = inferPurpose(naturalLanguage);
    const nextBudget = naturalLanguage.includes("무료") ? "free" : criteria.budget;
    const nextCriteria = { ...criteria, purpose: nextPurpose, budget: nextBudget };

    setCriteria(nextCriteria);
    setAppliedCriteria(nextCriteria);
    setMessage("자연어 설명을 바탕으로 추천 조건을 반영했습니다.");
  };

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
                options={JOB_OPTIONS}
                value={criteria.job}
              />
              <RecommendSelect
                label="사용 목적"
                onChange={(value) =>
                  setCriteria((current) => ({ ...current, purpose: value }))
                }
                options={PURPOSE_OPTIONS}
                value={criteria.purpose}
              />
              <RecommendSelect
                label="예산"
                onChange={(value) =>
                  setCriteria((current) => ({ ...current, budget: value }))
                }
                options={BUDGET_OPTIONS}
                value={criteria.budget}
              />

              <Button className="h-16 w-full rounded-[22px] text-[17px]" type="submit">
                추천 받기
              </Button>
            </form>
          </Card>

          <Card className="rounded-[30px] p-8 sm:p-11">
            <h2 className="text-[26px] font-extrabold leading-8 text-[#0d121a]">
              {selectedJobLabel}에게 추천해요
            </h2>
            <p className="mt-2 text-[17px] font-medium leading-6 text-[#6b7a8f]">
              {selectedPurposeLabel} 목적과 {selectedBudgetLabel} 조건을 기준으로
              선정했어요.
            </p>

            {message ? (
              <p className="mt-4 text-sm font-semibold text-blue-600" role="status">
                {message}
              </p>
            ) : null}

            <div className="mt-12 space-y-8">
              {recommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                />
              ))}
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
            disabled={naturalLanguage.trim().length < 5}
            type="submit"
          >
            추천받기
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

function getOptionLabel(options: RecommendOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function inferPurpose(text: string) {
  if (/이미지|아바타|디자인|그림/.test(text)) {
    return "image";
  }

  if (/글|문서|요약|작성/.test(text)) {
    return "writing";
  }

  if (/검색|리서치|자료|출처/.test(text)) {
    return "research";
  }

  if (/자동화|업무|반복/.test(text)) {
    return "automation";
  }

  return "coding";
}
