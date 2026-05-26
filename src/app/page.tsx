import { CategorySection } from "@/components/sections/category-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PopularServicesSection } from "@/components/sections/popular-services-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { StatsSection } from "@/components/sections/stats-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <CategorySection />
        <PopularServicesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
