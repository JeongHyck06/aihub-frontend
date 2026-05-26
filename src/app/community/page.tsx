import { CommunityPageSection } from "@/components/sections/community-page-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader activeHref="/community" />
      <main>
        <CommunityPageSection />
      </main>
      <SiteFooter />
    </div>
  );
}
