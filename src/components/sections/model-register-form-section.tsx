"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MODEL_REGISTER_CONTENT, PRICE_POLICIES } from "@/constants/model-register";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { getCategories, submitModelRequest } from "@/shared/api";
import { cn } from "@/lib/utils";
import type { CategoryItem } from "@/types/home";

type CompletedSubmission = {
  serviceName: string;
};

export function ModelRegisterFormSection() {
  const { isAuthenticated, isReady } = useAuth();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedPricePolicy, setSelectedPricePolicy] = useState(PRICE_POLICIES[0].value);
  const [submitted, setSubmitted] = useState<CompletedSubmission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getCategories()
      .then((items) => {
        if (cancelled) return;
        setCategories(items);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  if (isReady && !isAuthenticated) {
    return (
      <Card className="rounded-3xl p-10 text-center lg:flex-1">
        <h2 className="text-2xl font-extrabold text-[#0d121a]">로그인이 필요합니다</h2>
        <p className="mt-3 text-sm text-[#616e80]">모델 등록 신청을 하려면 로그인이 필요합니다.</p>
        <Link
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-blue-600 px-6 text-sm font-extrabold text-white"
          href="/login?next=/models/register"
        >
          로그인하러 가기
        </Link>
      </Card>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      return;
    }
    const formData = new FormData(form);
    const featuresText = String(formData.get("features") ?? "").trim();
    const features = featuresText
      ? featuresText
          .split(/\n|,/)
          .map((value) => value.trim())
          .filter((value) => value.length > 0)
          .slice(0, 6)
      : [];

    if (features.length === 0) {
      setError("주요 기능을 1개 이상 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const serviceName = String(formData.get("serviceName") ?? "").trim();
      const categorySlug = String(formData.get("categorySlug") ?? "").trim();
      const url = String(formData.get("serviceUrl") ?? "").trim();
      const description = String(formData.get("description") ?? "").trim();
      const apiDocUrl = String(formData.get("apiDocUrl") ?? "").trim();

      await submitModelRequest({
        serviceName,
        categorySlug,
        url,
        pricePolicy: selectedPricePolicy,
        description,
        features,
        apiDocUrl: apiDocUrl || undefined,
      });
      setSubmitted({ serviceName });
      form.reset();
      setSelectedPricePolicy(PRICE_POLICIES[0].value);
    } catch (err) {
      setError(err instanceof Error ? err.message : "등록 신청에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="rounded-3xl p-6 sm:p-10 lg:min-h-[790px] lg:flex-1">
      <h2 className="text-[22px] font-extrabold leading-7 text-[#0d121a]">
        {MODEL_REGISTER_CONTENT.formTitle}
      </h2>

      <form className="mt-7 space-y-[18px]" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-bold leading-5 text-[#384252]" htmlFor="service-name">
            서비스명
          </label>
          <input
            className="mt-1.5 h-[52px] w-full rounded-[14px] border border-[#e0e5f0] bg-white px-6 text-[15px] font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="service-name"
            name="serviceName"
            placeholder="ChatGPT, Midjourney, Cursor..."
            required
            type="text"
          />
        </div>

        <div>
          <label
            className="text-sm font-bold leading-5 text-[#384252]"
            htmlFor="service-category"
          >
            카테고리
          </label>
          <select
            className="mt-1.5 h-[52px] w-full rounded-[14px] border border-[#e0e5f0] bg-[#f8f9fb] px-6 text-[15px] font-medium text-[#384252] focus:outline-none focus:ring-2 focus:ring-blue-600"
            defaultValue=""
            id="service-category"
            name="categorySlug"
            required
          >
            <option disabled value="">
              카테고리 선택
            </option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-bold leading-5 text-[#384252]" htmlFor="service-url">
            서비스 URL
          </label>
          <input
            className="mt-1.5 h-[52px] w-full rounded-[14px] border border-[#e0e5f0] bg-white px-6 text-[15px] font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="service-url"
            name="serviceUrl"
            placeholder="https://example.com"
            required
            type="url"
          />
        </div>

        <fieldset>
          <legend className="text-sm font-bold leading-5 text-[#384252]">가격 정책</legend>
          <div className="mt-2 flex flex-wrap gap-3">
            {PRICE_POLICIES.map((policy) => (
              <label
                className={cn(
                  "inline-flex h-9 cursor-pointer items-center rounded-[18px] border px-6 text-[13px] font-bold transition-colors",
                  selectedPricePolicy === policy.value
                    ? "border-blue-600 bg-[#ecf1ff] text-blue-600"
                    : "border-[#e0e5f0] bg-white text-[#384252] hover:border-blue-200",
                )}
                key={policy.value}
              >
                <input
                  checked={selectedPricePolicy === policy.value}
                  className="sr-only"
                  name="pricePolicy"
                  onChange={() => setSelectedPricePolicy(policy.value)}
                  type="radio"
                  value={policy.value}
                />
                {policy.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            className="text-sm font-bold leading-5 text-[#384252]"
            htmlFor="service-description"
          >
            서비스 소개
          </label>
          <textarea
            className="mt-1.5 min-h-[120px] w-full resize-none rounded-[14px] border border-[#e0e5f0] bg-white px-6 py-5 text-sm font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="service-description"
            minLength={50}
            name="description"
            placeholder="서비스의 주요 기능, 활용 사례를 간략히 소개해주세요. (50자 이상)"
            required
          />
        </div>

        <div>
          <label className="text-sm font-bold leading-5 text-[#384252]" htmlFor="service-features">
            주요 기능 (줄바꿈 또는 쉼표로 구분, 최대 6개)
          </label>
          <textarea
            className="mt-1.5 min-h-[100px] w-full resize-none rounded-[14px] border border-[#e0e5f0] bg-white px-6 py-4 text-sm font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="service-features"
            name="features"
            placeholder={"코드 자동완성\nAPI 지원\n무료 사용 가능"}
            required
          />
        </div>

        <div>
          <label className="text-sm font-bold leading-5 text-[#384252]" htmlFor="api-doc-url">
            API 문서 URL (선택)
          </label>
          <input
            className="mt-1.5 h-[52px] w-full rounded-[14px] border border-[#e0e5f0] bg-white px-6 text-[15px] font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="api-doc-url"
            name="apiDocUrl"
            placeholder="https://docs.example.com/api"
            type="url"
          />
        </div>

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">{error}</p>
        ) : null}

        <button
          className="h-14 w-full rounded-[14px] bg-blue-600 text-[15px] font-extrabold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          disabled={submitting}
          type="submit"
        >
          {submitting ? "신청 중..." : "등록 신청하기"}
        </button>
      </form>

      {submitted ? (
        <p className="mt-4 rounded-xl bg-[#ecf1ff] px-4 py-3 text-sm font-semibold text-blue-600" role="status">
          {submitted.serviceName} 등록 신청이 접수되었습니다. 관리자 검토 후 결과를 알려드릴게요.
        </p>
      ) : null}
    </Card>
  );
}
