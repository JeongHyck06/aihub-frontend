import { Chip } from "@/components/ui/chip";
import { SearchInput } from "@/components/ui/search-input";
import { HERO_CONTENT, HOT_SEARCH_KEYWORDS } from "@/constants/home";

export function HeroSection() {
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
            {HERO_CONTENT.eyebrow}
          </span>
        </div>

        <h1 className="mt-5 text-[42px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-[56px] lg:text-[64px]">
          {HERO_CONTENT.title.map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-white/85 sm:text-lg">
          {HERO_CONTENT.description}
        </p>

        <SearchInput
          className="mt-8"
          id="hero-search"
          label="AI 서비스 검색어"
          placeholder={HERO_CONTENT.searchPlaceholder}
        />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <p className="mr-3 text-[13px] font-bold leading-5 text-white/70">
            인기 검색어
          </p>
          {HOT_SEARCH_KEYWORDS.map((keyword, index) => (
            <Chip
              active={index === 0}
              aria-label={`${keyword} 검색어로 검색`}
              key={keyword}
            >
              # {keyword}
            </Chip>
          ))}
        </div>
      </div>
    </section>
  );
}
