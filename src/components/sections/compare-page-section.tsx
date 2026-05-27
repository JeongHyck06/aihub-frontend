"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { COMPARE_PAGE_CONTENT } from "@/constants/compare";
import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  addToMyCompare,
  getCompare,
  getCompareInsight,
  getMyCompareList,
  removeFromMyCompare,
  searchServices,
} from "@/shared/api";
import { cn } from "@/lib/utils";
import type { CompareInsight, CompareRowDescriptor, CompareService } from "@/types/compare";
import type { SearchResultService } from "@/types/search";

export function ComparePageSection() {
  const { isAuthenticated } = useAuth();
  const [services, setServices] = useState<CompareService[]>([]);
  const [rows, setRows] = useState<CompareRowDescriptor[]>([]);
  const [insight, setInsight] = useState<CompareInsight | null>(null);
  const [insightError, setInsightError] = useState<string | null>(null);

  const refreshList = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }
    try {
      const items = await getMyCompareList();
      setServices(items);
    } catch {
      setServices([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshList();
      return;
    }
    setServices([]);
  }, [isAuthenticated, refreshList]);

  useEffect(() => {
    const ids = services.map((service) => service.id);
    if (ids.length === 0) {
      setRows([]);
      setInsight(null);
      return;
    }
    let cancelled = false;
    getCompare(ids)
      .then((response) => {
        if (cancelled) return;
        setRows(response.rows);
      })
      .catch(() => undefined);
    if (ids.length >= 2) {
      getCompareInsight(ids)
        .then((response) => {
          if (cancelled) return;
          setInsight(response);
          setInsightError(null);
        })
        .catch((err: unknown) => {
          if (cancelled) return;
          setInsightError(err instanceof Error ? err.message : "비교 분석을 불러오지 못했습니다.");
        });
    } else {
      setInsight(null);
    }
    return () => {
      cancelled = true;
    };
  }, [services]);

  const handleAdd = async (slug: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login?next=/compare";
      return;
    }
    const items = await addToMyCompare(slug);
    setServices(items);
  };

  const handleRemove = async (slug: string) => {
    if (!isAuthenticated) return;
    const items = await removeFromMyCompare(slug);
    setServices(items);
  };

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

        {!isAuthenticated ? (
          <Card className="mt-8 rounded-3xl p-7 text-sm font-semibold text-[#384252]">
            로그인하면 비교 목록을 저장하고 더 많은 서비스를 비교할 수 있습니다.{" "}
            <Link className="font-extrabold text-blue-600" href="/login?next=/compare">
              로그인하기 →
            </Link>
          </Card>
        ) : null}

        <Card className="mt-8 rounded-3xl p-6 sm:p-8">
          <CompareAddSelector onAdd={handleAdd} />
        </Card>

        {services.length === 0 ? (
          <Card className="mt-6 rounded-3xl p-7 text-sm font-medium text-[#616e80]">
            비교할 서비스를 추가해 주세요.
          </Card>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <CompareServiceSummary
                key={service.id}
                onRemove={() => handleRemove(service.id)}
                service={service}
              />
            ))}
          </div>
        )}

        {services.length >= 2 ? (
          <Card className="mt-6 overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <caption className="sr-only">AI 서비스 비교 표</caption>
                <thead className="bg-[#f8f9fb] text-sm font-extrabold text-[#8c99ab]">
                  <tr>
                    <th className="w-[180px] px-6 py-5" scope="col">
                      항목
                    </th>
                    {services.map((service) => (
                      <th className="px-6 py-5" key={service.id} scope="col">
                        {service.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr className="border-t border-[#e8edf5]" key={row.label}>
                      <th
                        className="px-6 py-5 text-sm font-extrabold text-[#384252]"
                        scope="row"
                      >
                        {row.label}
                      </th>
                      {services.map((service) => (
                        <td
                          className="px-6 py-5 text-sm font-medium leading-6 text-[#0d121a]"
                          key={service.id}
                        >
                          {formatCompareValue(service, row)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : null}

        {insight ? (
          <Card className="mt-6 rounded-3xl p-7">
            <h2 className="text-xl font-extrabold text-[#0d121a]">AI 비교 분석</h2>
            <p className="mt-3 text-sm font-medium leading-6 text-[#384252]">{insight.verdict}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {insight.byScenario.map((scenario) => (
                <div className="rounded-2xl bg-[#f8f9fb] p-4" key={scenario.scenario}>
                  <p className="text-xs font-bold text-[#8c99ab]">{scenario.scenario}</p>
                  <p className="mt-1 text-sm font-extrabold text-[#0d121a]">{scenario.winner}</p>
                  <p className="mt-2 text-xs font-medium text-[#384252]">{scenario.reason}</p>
                </div>
              ))}
            </div>
          </Card>
        ) : insightError ? (
          <p className="mt-4 text-sm text-red-500">{insightError}</p>
        ) : null}
      </div>
    </section>
  );
}

type CompareAddSelectorProps = {
  onAdd: (slug: string) => Promise<void> | void;
};

function CompareAddSelector({ onAdd }: CompareAddSelectorProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultService[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    searchServices({ query: query.trim(), size: 5, page: 0 })
      .then((response) => {
        if (cancelled) return;
        setResults(response.data);
      })
      .catch(() => {
        if (cancelled) return;
        setResults([]);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="relative">
      <label className="block text-sm font-bold text-[#384252]" htmlFor="compare-add">
        비교에 추가할 서비스
      </label>
      <input
        className="mt-2 h-12 w-full rounded-xl border border-[#e0e5f0] bg-white px-4 text-sm font-semibold text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
        id="compare-add"
        onBlur={() => window.setTimeout(() => setIsOpen(false), 120)}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="서비스명을 검색하세요"
        type="search"
        value={query}
      />
      {isOpen && results.length > 0 ? (
        <div className="absolute left-0 right-0 top-[76px] z-20 overflow-hidden rounded-2xl border border-[#e0e5f0] bg-white shadow-[0_18px_40px_rgba(15,82,245,0.12)]">
          {results.map((service) => (
            <button
              className={cn(
                "flex w-full flex-col px-4 py-3 text-left transition-colors hover:bg-[#f8f9fb]",
              )}
              key={service.id}
              onClick={async () => {
                await onAdd(service.id);
                setQuery("");
                setIsOpen(false);
              }}
              onMouseDown={(event) => event.preventDefault()}
              type="button"
            >
              <span className="text-sm font-extrabold text-[#0d121a]">{service.name}</span>
              <span className="mt-1 text-xs font-medium text-[#8c99ab]">
                {service.provider}
                {service.category ? ` · ${service.category}` : ""}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type CompareServiceSummaryProps = {
  service: CompareService;
  onRemove: () => void;
};

function CompareServiceSummary({ service, onRemove }: CompareServiceSummaryProps) {
  return (
    <Card className="rounded-3xl p-7">
      <p className="text-sm font-bold text-blue-600">{service.category}</p>
      <h2 className="mt-2 text-[26px] font-extrabold leading-9 text-[#0d121a]">{service.name}</h2>
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

      <div className="mt-6 flex items-center gap-3">
        <Link
          className="inline-flex h-10 items-center rounded-[10px] bg-[#ecf1ff] px-5 text-[13px] font-extrabold text-blue-600 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          href={service.href}
        >
          상세 보기 →
        </Link>
        <button
          className="text-[13px] font-extrabold text-[#8c99ab] transition-colors hover:text-red-500"
          onClick={onRemove}
          type="button"
        >
          제거
        </button>
      </div>
    </Card>
  );
}

function formatCompareValue(service: CompareService, row: CompareRowDescriptor): string {
  const field = row.field as keyof CompareService;
  const value = service[field];
  if (row.formatter === "rating" && typeof value === "number") {
    return `★ ${value.toFixed(1)}`;
  }
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return value?.toString() ?? "-";
}
