import { SearchPageSection } from "@/components/sections/search-page-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

type SearchPageProps = {
  searchParams?: Promise<{
    query?: string | string[];
    category?: string | string[];
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const queryParam = params?.query;
  const categoryParam = params?.category;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader activeHref="/search" />
      <main>
        <SearchPageSection category={category} query={query} />
      </main>
      <SiteFooter />
    </div>
  );
}
