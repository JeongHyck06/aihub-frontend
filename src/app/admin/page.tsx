import { AdminDashboardSection } from "@/components/sections/admin-dashboard-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { RequireAuth } from "@/features/auth/components/require-auth";

export default function AdminPage() {
  return (
    <RequireAuth requireAdmin>
      <div className="min-h-screen bg-[#f8f9fb]">
        <SiteHeader
          rightContent={
            <span className="inline-flex h-11 items-center rounded-[22px] bg-[#fdf2d2] px-5 text-sm font-extrabold text-[#8a680a]">
              ADMIN 패널
            </span>
          }
        />
        <main>
          <AdminDashboardSection />
        </main>
        <SiteFooter />
      </div>
    </RequireAuth>
  );
}
