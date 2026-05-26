import { RecommendPageSection } from "@/components/sections/recommend-page-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function RecommendPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader activeHref="/recommend" />
      <main>
        <RecommendPageSection />
      </main>
      <SiteFooter />
    </div>
  );
}
