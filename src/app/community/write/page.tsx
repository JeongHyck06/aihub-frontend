import { CommunityWritePageSection } from "@/components/sections/community-write-page-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function CommunityWritePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader activeHref="/community" />
      <main>
        <CommunityWritePageSection />
      </main>
      <SiteFooter />
    </div>
  );
}
