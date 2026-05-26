import { ModelDetailSection } from "@/components/sections/model-detail-section";
import { ModelHeroSection } from "@/components/sections/model-hero-section";
import { ModelReviewsSection } from "@/components/sections/model-reviews-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { CHATGPT_DETAIL } from "@/constants/model";

export default function ChatGptDetailPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader />
      <main>
        <ModelHeroSection model={CHATGPT_DETAIL} />
        <ModelDetailSection model={CHATGPT_DETAIL} />
        <ModelReviewsSection model={CHATGPT_DETAIL} />
      </main>
      <SiteFooter />
    </div>
  );
}
