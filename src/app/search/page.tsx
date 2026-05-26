import { SearchPageSection } from "@/components/sections/search-page-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader activeHref="/search" />
      <main>
        <SearchPageSection />
      </main>
      <SiteFooter />
    </div>
  );
}
