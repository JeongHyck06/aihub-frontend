import { AdminModelApprovalSection } from "@/components/sections/admin-model-approval-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function AdminModelApprovalPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader
        rightContent={
          <span className="inline-flex h-9 items-center rounded-[18px] bg-[#fdf2d2] px-4 text-xs font-extrabold text-[#8a680a]">
            ADMIN 패널
          </span>
        }
      />
      <main>
        <AdminModelApprovalSection />
      </main>
      <SiteFooter />
    </div>
  );
}
