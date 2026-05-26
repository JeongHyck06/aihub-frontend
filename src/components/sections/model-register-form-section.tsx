"use client";

import { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  MODEL_CATEGORIES,
  MODEL_REGISTER_CONTENT,
  PRICE_POLICIES,
} from "@/constants/model-register";

export function ModelRegisterFormSection() {
  const [selectedPricePolicy, setSelectedPricePolicy] = useState(
    PRICE_POLICIES[0].value,
  );
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const serviceName = String(formData.get("serviceName") ?? "서비스");
    setSubmitMessage(
      `${serviceName} 등록 신청이 접수되었습니다. 관리자 검토 후 결과를 알려드릴게요.`,
    );
    form.reset();
    setSelectedPricePolicy(PRICE_POLICIES[0].value);
  };

  return (
    <Card className="rounded-3xl p-6 sm:p-10 lg:min-h-[790px] lg:flex-1">
      <h2 className="text-[22px] font-extrabold leading-7 text-[#0d121a]">
        {MODEL_REGISTER_CONTENT.formTitle}
      </h2>

      <form className="mt-7 space-y-[18px]" onSubmit={handleSubmit}>
        <div>
          <label
            className="text-sm font-bold leading-5 text-[#384252]"
            htmlFor="service-name"
          >
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
            name="category"
            required
          >
            <option disabled value="">
              코딩 / 글쓰기 / 이미지 / 음악 / 영상 / 기타
            </option>
            {MODEL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="text-sm font-bold leading-5 text-[#384252]"
            htmlFor="service-url"
          >
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
          <legend className="text-sm font-bold leading-5 text-[#384252]">
            가격 정책
          </legend>
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
            minLength={100}
            name="description"
            placeholder="서비스의 주요 기능, 활용 사례를 간략히 소개해주세요. (100자 이상)"
            required
          />
        </div>

        <div>
          <label
            className="text-sm font-bold leading-5 text-[#384252]"
            htmlFor="api-doc-url"
          >
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

        {/* TODO: 모델 등록 API가 준비되면 실제 신청 mutation으로 교체합니다. */}
        <button
          className="h-14 w-full rounded-[14px] bg-blue-600 text-[15px] font-extrabold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          type="submit"
        >
          등록 신청하기
        </button>
      </form>

      {submitMessage ? (
        <p className="mt-4 rounded-xl bg-[#ecf1ff] px-4 py-3 text-sm font-semibold text-blue-600" role="status">
          {submitMessage}
        </p>
      ) : null}
    </Card>
  );
}
