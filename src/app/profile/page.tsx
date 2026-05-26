import { ProfilePageSection } from "@/components/sections/profile-page-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader />
      <main>
        <ProfilePageSection />
      </main>
      <SiteFooter />
    </div>
  );
}
