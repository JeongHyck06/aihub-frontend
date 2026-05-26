"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  COMPARE_PAGE_CONTENT,
  COMPARE_ROWS,
  COMPARE_SERVICES,
} from "@/constants/compare";
import { cn } from "@/lib/utils";
import type { CompareService } from "@/types/compare";

export function ComparePageSection() {
  const [leftServiceId, setLeftServiceId] = useState(COMPARE_SERVICES[0].id);
  const [rightServiceId, setRightServiceId] = useState(COMPARE_SERVICES[2].id);

  const leftService = useMemo(
    () =>
      COMPARE_SERVICES.find((service) => service.id === leftServiceId) ??
      COMPARE_SERVICES[0],
    [leftServiceId],
  );
  const rightService = useMemo(
    () =>
      COMPARE_SERVICES.find((service) => service.id === rightServiceId) ??
      COMPARE_SERVICES[1],
    [rightServiceId],
  );

  return (
    <section className="bg-[#f8f9fb] py-10">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <div aria-hidden="true" className="h-1.5 w-[72px] rounded-[3px] bg-blue-600" />
        <h1 className="mt-2.5 text-4xl font-extrabold leading-tight text-[#0d121a]">
          {COMPARE_PAGE_CONTENT.title}
        </h1>
        <p className="mt-2 max-w-3xl text-[17px] font-medium leading-7 text-[#616e80]">
          {COMPARE_PAGE_CONTENT.description}
        </p>

        <Card className="mt-8 rounded-3xl p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <CompareSelector
              label="첫 번째 서비스"
              onChange={setLeftServiceId}
              selectedId={leftServiceId}
            />
            <CompareSelector
              label="두 번째 서비스"
              onChange={setRightServiceId}
              selectedId={rightServiceId}
            />
          </div>
        </Card>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <CompareServiceSummary service={leftService} />
          <CompareServiceSummary service={rightService} />
        </div>

        <Card className="mt-6 overflow-hidden rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <caption className="sr-only">AI 서비스 비교 표</caption>
              <thead className="bg-[#f8f9fb] text-sm font-extrabold text-[#8c99ab]">
                <tr>
                  <th className="w-[180px] px-6 py-5" scope="col">
                    항목
                  </th>
                  <th className="px-6 py-5" scope="col">
                    {leftService.name}
                  </th>
                  <th className="px-6 py-5" scope="col">
                    {rightService.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr className="border-t border-[#e8edf5]" key={row.label}>
                    <th
                      className="px-6 py-5 text-sm font-extrabold text-[#384252]"
                      scope="row"
                    >
                      {row.label}
                    </th>
                    <td className="px-6 py-5 text-sm font-medium leading-6 text-[#0d121a]">
                      {row.getValue(leftService)}
                    </td>
                    <td className="px-6 py-5 text-sm font-medium leading-6 text-[#0d121a]">
                      {row.getValue(rightService)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
}

type CompareSelectorProps = {
  label: string;
  selectedId: string;
  onChange: (serviceId: string) => void;
};

function CompareSelector({ label, selectedId, onChange }: CompareSelectorProps) {
  const selectedService =
    COMPARE_SERVICES.find((service) => service.id === selectedId) ?? COMPARE_SERVICES[0];
  const [query, setQuery] = useState(selectedService.name);
  const [isOpen, setIsOpen] = useState(false);
  const inputId = `compare-${label === "첫 번째 서비스" ? "left" : "right"}`;
  const listboxId = `${inputId}-listbox`;

  const filteredServices = COMPARE_SERVICES.filter((service) => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return true;
    }

    return [service.name, service.provider, service.category]
      .join(" ")
      .toLowerCase()
      .includes(keyword);
  });

  const selectService = (service: CompareService) => {
    onChange(service.id);
    setQuery(service.name);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label
        className="block text-sm font-bold text-[#384252]"
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        className="mt-2 h-12 w-full rounded-xl border border-[#e0e5f0] bg-white px-4 text-sm font-semibold text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
        id={inputId}
        onBlur={() => {
          window.setTimeout(() => {
            setIsOpen(false);
            setQuery(selectedService.name);
          }, 120);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="서비스명, 개발사, 카테고리 검색"
        role="combobox"
        type="search"
        value={query}
      />

      {isOpen ? (
        <div
          className="absolute left-0 right-0 top-[76px] z-20 overflow-hidden rounded-2xl border border-[#e0e5f0] bg-white shadow-[0_18px_40px_rgba(15,82,245,0.12)]"
          id={listboxId}
          role="listbox"
        >
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <button
                aria-selected={service.id === selectedId}
                className={cn(
                  "flex w-full flex-col px-4 py-3 text-left transition-colors hover:bg-[#f8f9fb]",
                  service.id === selectedId && "bg-[#ecf1ff]",
                )}
                key={service.id}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectService(service)}
                role="option"
                type="button"
              >
                <span className="text-sm font-extrabold text-[#0d121a]">
                  {service.name}
                </span>
                <span className="mt-1 text-xs font-medium text-[#8c99ab]">
                  {service.provider} · {service.category}
                </span>
              </button>
            ))
          ) : (
            <p className="px-4 py-4 text-sm font-medium text-[#8c99ab]">
              검색 결과가 없습니다.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

type CompareServiceSummaryProps = {
  service: CompareService;
};

function CompareServiceSummary({ service }: CompareServiceSummaryProps) {
  return (
    <Card className="rounded-3xl p-7">
      <p className="text-sm font-bold text-blue-600">{service.category}</p>
      <h2 className="mt-2 text-[28px] font-extrabold leading-9 text-[#0d121a]">
        {service.name}
      </h2>
      <p className="mt-1 text-sm font-semibold text-[#8c99ab]">
        {service.provider} · {service.price}
      </p>
      <p className="mt-4 text-[13px] font-bold leading-5 text-[#f2991a]">
        ★ {service.rating.toFixed(1)}
      </p>

      <ul className="mt-5 space-y-2">
        {service.strengths.map((strength) => (
          <li className="text-sm font-medium leading-6 text-[#384252]" key={strength}>
            ✓ {strength}
          </li>
        ))}
      </ul>

      <Link
        className="mt-6 inline-flex h-10 items-center rounded-[10px] bg-[#ecf1ff] px-5 text-[13px] font-extrabold text-blue-600 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        href={service.href}
      >
        상세 보기 →
      </Link>
    </Card>
  );
}
