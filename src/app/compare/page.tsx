import { ComparePageSection } from "@/components/sections/compare-page-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader activeHref="/compare" />
      <main>
        <ComparePageSection />
      </main>
      <SiteFooter />
    </div>
  );
}
