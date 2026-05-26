import { ModelDetailSection } from "@/components/sections/model-detail-section";
import { ModelHeroSection } from "@/components/sections/model-hero-section";
import { ModelReviewsSection } from "@/components/sections/model-reviews-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { CURSOR_DETAIL } from "@/constants/model";

export default function CursorDetailPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader />
      <main>
        <ModelHeroSection model={CURSOR_DETAIL} />
        <ModelDetailSection model={CURSOR_DETAIL} />
        <ModelReviewsSection model={CURSOR_DETAIL} />
      </main>
      <SiteFooter />
    </div>
  );
}
