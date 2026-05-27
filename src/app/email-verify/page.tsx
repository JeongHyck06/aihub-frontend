import { EmailVerifySection } from "@/components/sections/email-verify-section";
import { EMAIL_VERIFY_CONTENT } from "@/constants/email-verify";

type EmailVerifyPageProps = {
  searchParams?: Promise<{
    email?: string | string[];
    devCode?: string | string[];
    expiresIn?: string | string[];
  }>;
};

export default async function EmailVerifyPage({ searchParams }: EmailVerifyPageProps) {
  const params = await searchParams;
  const emailParam = params?.email;
  const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;
  const devCodeParam = params?.devCode;
  const devCode = Array.isArray(devCodeParam) ? devCodeParam[0] : devCodeParam;
  const expiresInParam = params?.expiresIn;
  const expiresInRaw = Array.isArray(expiresInParam) ? expiresInParam[0] : expiresInParam;
  const expiresInNumber = expiresInRaw ? Number(expiresInRaw) : undefined;
  const initialExpiry = Number.isFinite(expiresInNumber) ? expiresInNumber : undefined;

  return (
    <main>
      <EmailVerifySection
        email={email || EMAIL_VERIFY_CONTENT.defaultEmail}
        initialDevCode={devCode}
        initialExpirySeconds={initialExpiry}
      />
    </main>
  );
}
