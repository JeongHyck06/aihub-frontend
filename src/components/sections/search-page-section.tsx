import { FilterSidebar } from "@/components/common/filter-sidebar";
import { SearchResultCard } from "@/components/common/search-result-card";
import { SearchInput } from "@/components/ui/search-input";
import {
  SEARCH_FILTER_GROUPS,
  SEARCH_PAGE_CONTENT,
  SEARCH_RESULTS,
} from "@/constants/search";

export function SearchPageSection() {
  return (
    <section className="bg-[#f8f9fb]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:py-14 lg:px-0">
        <div aria-hidden="true" className="mb-2 h-1.5 w-14 rounded-[3px] bg-blue-600" />
        <h1 className="text-[28px] font-extrabold leading-tight text-[#0d121a] sm:text-[32px]">
          {SEARCH_PAGE_CONTENT.title}
        </h1>
        <p className="mt-3 text-base font-medium leading-relaxed text-[#616e80]">
          {SEARCH_PAGE_CONTENT.description}
        </p>

        <SearchInput
          action="/search"
          buttonClassName="rounded-xl px-10 sm:w-[124px]"
          className="mt-6 min-h-16 rounded-2xl border border-[#e0e5f0] p-2 shadow-none sm:py-2 sm:pl-6 sm:pr-3"
          defaultValue={SEARCH_PAGE_CONTENT.query}
          id="search-page-query"
          inputClassName="font-semibold text-[#0d121a]"
          label="검색어"
          placeholder="검색어를 입력하세요"
        />

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-start">
          <FilterSidebar groups={SEARCH_FILTER_GROUPS} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold leading-8 text-[#0d121a]">
                  {SEARCH_PAGE_CONTENT.resultTitle}
                </h2>
                <p className="mt-1 text-sm font-medium leading-5 text-[#8c99ab]">
                  {SEARCH_PAGE_CONTENT.resultMeta}
                </p>
              </div>

              <label className="sr-only" htmlFor="sort-results">
                검색 결과 정렬
              </label>
              <select
                className="h-9 w-[140px] rounded-[10px] border border-[#e0e5f0] bg-white px-3 text-[13px] font-bold text-[#384252] focus:outline-none focus:ring-2 focus:ring-blue-600"
                defaultValue="popular"
                id="sort-results"
              >
                <option value="popular">인기순</option>
                <option value="rating">평점순</option>
                <option value="review">리뷰순</option>
              </select>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-2">
              {SEARCH_RESULTS.map((service) => (
                <SearchResultCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
