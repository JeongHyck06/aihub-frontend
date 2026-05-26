import { ModelRegisterPageSection } from "@/components/sections/model-register-page-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function ModelRegisterPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader activeHref="/models/register" />
      <main>
        <ModelRegisterPageSection />
      </main>
      <SiteFooter />
    </div>
  );
}
