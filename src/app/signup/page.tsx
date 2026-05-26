import { AuthBrandPanel } from "@/components/common/auth-brand-panel";
import { AuthSignupSection } from "@/components/sections/auth-signup-section";
import { SIGNUP_BRAND_CONTENT } from "@/constants/auth";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen bg-[#f8f9fb]">
      <AuthBrandPanel content={SIGNUP_BRAND_CONTENT} />
      <AuthSignupSection />
    </main>
  );
}
