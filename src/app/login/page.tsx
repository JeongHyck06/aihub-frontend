import { AuthBrandPanel } from "@/components/common/auth-brand-panel";
import { AuthLoginSection } from "@/components/sections/auth-login-section";
import { LOGIN_BRAND_CONTENT } from "@/constants/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen bg-[#f8f9fb]">
      <AuthBrandPanel content={LOGIN_BRAND_CONTENT} />
      <AuthLoginSection />
    </main>
  );
}
